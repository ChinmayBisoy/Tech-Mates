import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as proposalAPI from '@/api/proposal.api';
import { ProposalCard } from '@/components/se-market/ProposalCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { useAuth } from '@/hooks/useAuth';
import { Briefcase, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function MyProposals() {
  const navigate = useNavigate();
  const { isDeveloper } = useAuth();
  const [statusFilter, setStatusFilter] = useState(null);
  const [expandedStatus, setExpandedStatus] = useState(false);

  // Check user role
  if (!isDeveloper) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900/20">
            <h2 className="text-lg font-bold text-red-900 dark:text-red-200">Access Denied</h2>
            <p className="mt-2 text-red-800 dark:text-red-300">Only developers can view their proposals.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fetch proposals
  const proposalsQuery = useQuery({
    queryKey: ['proposals', 'my-proposals', statusFilter],
    queryFn: () => proposalAPI.getMyProposals(1, 50, statusFilter),
  });

  // Withdraw proposal mutation
  const withdrawMutation = useMutation({
    mutationFn: proposalAPI.withdrawProposal,
    onSuccess: () => {
      toast.success('Proposal withdrawn successfully');
      proposalsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to withdraw proposal');
    },
  });

  // Edit proposal mutation
  const editMutation = useMutation({
    mutationFn: ({ proposalId, data }) => proposalAPI.updateProposal(proposalId, data),
    onSuccess: () => {
      toast.success('Proposal updated successfully');
      proposalsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update proposal');
    },
  });

  const rawProposals = Array.isArray(proposalsQuery.data)
    ? proposalsQuery.data
    : Array.isArray(proposalsQuery.data?.proposals)
      ? proposalsQuery.data.proposals
      : [];

  const proposals = rawProposals.map((proposal) => {
    const requirementObj = proposal?.requirement || proposal?.requirementId || {};
    const requirementId = requirementObj?._id || requirementObj?.id || proposal?.requirementId;

    return {
      ...proposal,
      id: proposal?.id || proposal?._id,
      price: proposal?.price ?? proposal?.proposedPrice ?? 0,
      requirementId,
      requirement: {
        ...(proposal?.requirement || {}),
        ...(typeof requirementObj === 'object' ? requirementObj : {}),
        title: requirementObj?.title || proposal?.requirement?.title || 'Requirement',
      },
    };
  });
  const statusCounts = {
    pending: proposals.filter((p) => p.status === 'pending').length,
    accepted: proposals.filter((p) => p.status === 'accepted').length,
    rejected: proposals.filter((p) => p.status === 'rejected').length,
    withdrawn: proposals.filter((p) => p.status === 'withdrawn').length,
    contract_created: proposals.filter((p) => p.status === 'contract_created').length,
  };

  const handleProposalAction = (action, proposalId) => {
    if (action === 'withdraw') {
      if (window.confirm('Are you sure you want to withdraw this proposal?')) {
        withdrawMutation.mutate(proposalId);
      }
    } else if (action === 'edit') {
      const targetProposal = proposals.find((proposal) => proposal.id === proposalId || proposal._id === proposalId);
      if (!targetProposal) {
        toast.error('Proposal not found');
        return;
      }

      const currentPrice = Math.ceil((targetProposal.price || targetProposal.proposedPrice || 0) / 100);
      const updatedPrice = window.prompt('Enter updated price (INR):', String(currentPrice));
      if (updatedPrice === null) return;

      const parsedPrice = Number(updatedPrice);
      if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
        toast.error('Please enter a valid price');
        return;
      }

      const currentDelivery = Number(targetProposal.deliveryDays || 7);
      const updatedDelivery = window.prompt('Enter updated delivery days:', String(currentDelivery));
      if (updatedDelivery === null) return;

      const parsedDelivery = Number(updatedDelivery);
      if (!Number.isInteger(parsedDelivery) || parsedDelivery < 1) {
        toast.error('Please enter valid delivery days');
        return;
      }

      const updatedCoverLetter = window.prompt(
        'Update your cover letter (minimum 50 characters):',
        targetProposal.coverLetter || ''
      );
      if (updatedCoverLetter === null) return;

      const trimmedCoverLetter = updatedCoverLetter.trim();
      if (trimmedCoverLetter.length < 50) {
        toast.error('Cover letter must be at least 50 characters');
        return;
      }

      const proposedPrice = Math.round(parsedPrice * 100);
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + parsedDelivery);

      editMutation.mutate({
        proposalId,
        data: {
          coverLetter: trimmedCoverLetter,
          proposedPrice,
          deliveryDays: parsedDelivery,
          milestones: [
            {
              title: 'Project Delivery',
              description: 'Updated project delivery timeline and scope.',
              amount: proposedPrice,
              dueDate: dueDate.toISOString(),
            },
          ],
        },
      });
    } else if (action === 'message') {
      navigate(`/chat/${proposalId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-8 w-8 text-primary dark:text-accent" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Proposals</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Track the status of all proposals you've submitted
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { label: 'Total', count: proposals.length, status: null },
            { label: 'Pending', count: statusCounts.pending, status: 'pending' },
            { label: 'Accepted', count: statusCounts.accepted, status: 'accepted' },
            { label: 'Rejected', count: statusCounts.rejected, status: 'rejected' },
            { label: 'Contract', count: statusCounts.contract_created, status: 'contract_created' },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => setStatusFilter(stat.status)}
              className={`rounded-lg p-4 transition-all ${
                statusFilter === stat.status
                  ? 'border-2 border-primary bg-primary/5 dark:border-accent dark:bg-accent/5'
                  : 'border border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
              }`}
            >
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Filter Section */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setExpandedStatus(!expandedStatus)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Filter className="h-4 w-4" />
            Status
            {expandedStatus ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {statusFilter && (
            <button
              onClick={() => setStatusFilter(null)}
              className="text-sm text-primary hover:underline dark:text-accent"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Proposals List */}
        {proposalsQuery.isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        ) : proposalsQuery.error ? (
          <ErrorState
            title="Failed to load proposals"
            description="An error occurred while loading your proposals."
            onRetry={() => proposalsQuery.refetch()}
          />
        ) : proposals.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No proposals yet"
            description={
              statusFilter
                ? 'You have no proposals with this status'
                : 'Start submitting proposals to get noticed by clients!'
            }
          />
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <ProposalCard
                  proposal={proposal}
                  isDeveloper={true}
                  onAction={handleProposalAction}
                />
                
                {/* Additional Actions */}
                <div className="mt-4 flex gap-2 flex-wrap border-t border-gray-200 pt-4 dark:border-gray-700">
                  {['pending', 'shortlisted'].includes(proposal.status) && (
                    <button
                      onClick={() => handleProposalAction('edit', proposal.id)}
                      disabled={editMutation.isPending}
                      className="flex-1 rounded-lg border border-primary-300 bg-white px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 disabled:opacity-50 dark:border-accent dark:text-accent"
                    >
                      Edit Proposal
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/se-market/requirement/${proposal.requirementId}`)}
                    className="flex flex-1 items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    View Requirement
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
