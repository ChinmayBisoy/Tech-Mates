const Proposal = require('../models/proposal.model');
const Requirement = require('../models/requirement.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { createContractFromProposal } = require('./contract.service');
const notificationService = require('./notification.service');

const normalizePagination = (pagination = {}) => {
  const parsedPage = Number.parseInt(pagination.page, 10);
  const parsedLimit = Number.parseInt(pagination.limit, 10);

  const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const limit = Number.isNaN(parsedLimit) || parsedLimit < 1 ? 10 : Math.min(parsedLimit, 50);

  return { page, limit, skip: (page - 1) * limit };
};

const sendProposal = async (developerId, data) => {
  const requirement = await Requirement.findOne({
    _id: data.requirementId,
    isDeleted: false,
    status: 'open',
  });

  if (!requirement) {
    throw new ApiError(404, 'Requirement not found or not open for proposals');
  }

  const existingProposal = await Proposal.findOne({
    requirementId: data.requirementId,
    developerId,
    isDeleted: false,
  });

  if (existingProposal) {
    throw new ApiError(409, 'You have already submitted a proposal for this requirement');
  }

  const developer = await User.findById(developerId);
  if (!developer) {
    throw new ApiError(404, 'Developer not found');
  }

  const isPro = Boolean(developer.isPro);
  const activeProposalCount = Number(developer.activeProposalCount || 0);

  if (!isPro && activeProposalCount >= 5) {
    throw new ApiError(403, 'Free plan limit reached. Upgrade to Pro to submit more proposals');
  }

  const proposal = await Proposal.create({
    requirementId: data.requirementId,
    developerId,
    coverLetter: data.coverLetter,
    proposedPrice: data.proposedPrice,
    deliveryDays: data.deliveryDays,
    milestones: data.milestones || [],
    portfolioLinks: data.portfolioLinks || [],
  });

  requirement.proposals.push(proposal._id);
  await requirement.save();

  if (!isPro) {
    developer.activeProposalCount = activeProposalCount + 1;
    await developer.save();
  }

  return proposal;
};

const getProposalsForRequirement = async (requirementId, clientId) => {
  const requirement = await Requirement.findOne({ _id: requirementId, isDeleted: false });

  if (!requirement) {
    throw new ApiError(404, 'Requirement not found');
  }

  if (String(requirement.postedBy) !== String(clientId)) {
    throw new ApiError(403, 'You are not allowed to view these proposals');
  }

  const proposals = await Proposal.find({ requirementId, isDeleted: false }).populate(
    'developerId',
    'name avatar tier isPro avgRating portfolioLinks'
  );

  await Proposal.updateMany(
    {
      requirementId,
      clientViewed: false,
      isDeleted: false,
    },
    {
      $set: { clientViewed: true },
    }
  );

  return proposals;
};

const getMyProposals = async (developerId, pagination = {}) => {
  const { page, limit, skip } = normalizePagination(pagination);

  const query = { developerId, isDeleted: false };

  const [items, total] = await Promise.all([
    Proposal.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('requirementId'),
    Proposal.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
};

const withdrawProposal = async (proposalId, developerId) => {
  const proposal = await Proposal.findOne({ _id: proposalId, isDeleted: false });

  if (!proposal) {
    throw new ApiError(404, 'Proposal not found');
  }

  if (String(proposal.developerId) !== String(developerId)) {
    throw new ApiError(403, 'You are not allowed to withdraw this proposal');
  }

  if (!['pending', 'shortlisted'].includes(proposal.status)) {
    throw new ApiError(400, 'Only pending or shortlisted proposals can be withdrawn');
  }

  proposal.status = 'withdrawn';
  await proposal.save();

  const developer = await User.findById(developerId);
  if (developer && !developer.isPro) {
    const count = Number(developer.activeProposalCount || 0);
    developer.activeProposalCount = Math.max(0, count - 1);
    await developer.save();
  }

  return proposal;
};

const shortlistProposal = async (proposalId, clientId) => {
  const proposal = await Proposal.findOne({ _id: proposalId, isDeleted: false });

  if (!proposal) {
    throw new ApiError(404, 'Proposal not found');
  }

  const requirement = await Requirement.findById(proposal.requirementId);

  if (!requirement || requirement.isDeleted) {
    throw new ApiError(404, 'Requirement not found');
  }

  if (String(requirement.postedBy) !== String(clientId)) {
    throw new ApiError(403, 'You are not allowed to shortlist this proposal');
  }

  proposal.status = 'shortlisted';
  await proposal.save();

  return proposal;
};

const rejectProposal = async (proposalId, clientId) => {
  const proposal = await Proposal.findOne({ _id: proposalId, isDeleted: false });

  if (!proposal) {
    throw new ApiError(404, 'Proposal not found');
  }

  const requirement = await Requirement.findById(proposal.requirementId);

  if (!requirement || requirement.isDeleted) {
    throw new ApiError(404, 'Requirement not found');
  }

  if (String(requirement.postedBy) !== String(clientId)) {
    throw new ApiError(403, 'You are not allowed to reject this proposal');
  }

  proposal.status = 'rejected';
  await proposal.save();

  const developer = await User.findById(proposal.developerId);
  if (developer && !developer.isPro) {
    const count = Number(developer.activeProposalCount || 0);
    developer.activeProposalCount = Math.max(0, count - 1);
    await developer.save();
  }

  return proposal;
};

const acceptProposal = async (proposalId, clientId) => {
  const proposal = await Proposal.findOne({ _id: proposalId, isDeleted: false });

  if (!proposal) {
    throw new ApiError(404, 'Proposal not found');
  }

  const requirement = await Requirement.findById(proposal.requirementId);

  if (!requirement || requirement.isDeleted) {
    throw new ApiError(404, 'Requirement not found');
  }

  if (String(requirement.postedBy) !== String(clientId)) {
    throw new ApiError(403, 'You are not allowed to accept this proposal');
  }

  proposal.status = 'accepted';
  await proposal.save();

  const otherProposals = await Proposal.find({
    requirementId: proposal.requirementId,
    _id: { $ne: proposal._id },
    status: { $nin: ['rejected', 'withdrawn'] },
    isDeleted: false,
  });

  for (const otherProposal of otherProposals) {
    otherProposal.status = 'rejected';
    await otherProposal.save();

    const developer = await User.findById(otherProposal.developerId);
    if (developer && !developer.isPro) {
      const count = Number(developer.activeProposalCount || 0);
      developer.activeProposalCount = Math.max(0, count - 1);
      await developer.save();
    }
  }

  requirement.status = 'in_progress';
  requirement.selectedProposal = proposal._id;
  await requirement.save();

  const contract = await createContractFromProposal(proposal);

  await notificationService.notifyProposalAccepted(proposal.developerId, proposal);

  return { proposal, contract };
};

module.exports = {
  sendProposal,
  getProposalsForRequirement,
  getMyProposals,
  withdrawProposal,
  shortlistProposal,
  rejectProposal,
  acceptProposal,
};
