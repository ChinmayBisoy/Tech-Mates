import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as requirementAPI from '@/api/requirement.api';
import * as proposalAPI from '@/api/proposal.api';
import { ProposalCard } from '@/components/se-market/ProposalCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { useAuth } from '@/hooks/useAuth';
import { Inbox, MessageSquare } from 'lucide-react';

export default function ProposalsReceived() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isUser } = useAuth();

  if (!isUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900/20">
            <h2 className="text-lg font-bold text-red-900 dark:text-red-200">Access Denied</h2>
            <p className="mt-2 text-red-800 dark:text-red-300">Only clients can view received proposals.</p>
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

  const requirementsQuery = useQuery({
    queryKey: ['requirements', 'my-requirements'],
    queryFn: () => requirementAPI.getMyRequirements(1, 100),
  });

  const proposalsQuery = useQuery({
    queryKey: ['proposals', 'received', requirementsQuery.data],
    enabled: requirementsQuery.isSuccess,
    queryFn: async () => {
      const requirements = Array.isArray(requirementsQuery.data) ? requirementsQuery.data : [];

      if (requirements.length === 0) {
        return [];
      }

      const grouped = await Promise.all(
        requirements.map(async (requirement) => {
          const requirementId = requirement?._id || requirement?.id;

          if (!requirementId) {
            return [];
          }

          const response = await proposalAPI.getRequirementProposals(requirementId, 1, 100);
          const proposals = Array.isArray(response)
            ? response
            : Array.isArray(response?.proposals)
              ? response.proposals
              : [];

          return proposals.map((proposal) => {
            const developer = proposal?.developer || proposal?.developerId || {};

            return {
              ...proposal,
              id: proposal?.id || proposal?._id,
              proposedPrice: proposal?.proposedPrice ?? proposal?.price ?? 0,
              developer: {
                id: developer?.id || developer?._id,
                name: developer?.name || 'Developer',
                avatar: developer?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(developer?.name || 'Developer')}`,
              },
              requirement: {
                _id: requirementId,
                title: requirement?.title || 'Requirement',
                clientName: requirement?.client?.name,
                client: requirement?.client,
              },
            };
          });
        })
      );

      return grouped.flat().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  });

  const proposals = Array.isArray(proposalsQuery.data) ? proposalsQuery.data : [];

  const actionMutation = useMutation({
    mutationFn: async ({ action, proposalId }) => {
      if (action === 'accept') {
        return proposalAPI.acceptProposal(proposalId);
      }
      if (action === 'reject') {
        return proposalAPI.rejectProposal(proposalId);
      }
      if (action === 'shortlist') {
        return proposalAPI.shortlistProposal(proposalId);
      }
      return null;
    },
    onSuccess: (_, variables) => {
      if (variables.action === 'accept') {
        toast.success('Proposal accepted successfully');
      } else if (variables.action === 'reject') {
        toast.success('Proposal rejected');
      } else if (variables.action === 'shortlist') {
        toast.success('Proposal shortlisted');
      }
      proposalsQuery.refetch();
      requirementsQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update proposal status');
    },
  });

  if (requirementsQuery.isLoading || proposalsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4 h-7 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="h-28 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (requirementsQuery.error || proposalsQuery.error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Unable to load proposals"
            message="There was a problem loading proposals received for your requirements."
            onRetry={() => {
              requirementsQuery.refetch();
              proposalsQuery.refetch();
            }}
          />
        </div>
      </div>
    );
  }

  if ((Array.isArray(requirementsQuery.data) ? requirementsQuery.data.length : 0) === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon={Inbox}
            title="No requirements yet"
            description="Post your first requirement to start receiving developer proposals."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary dark:text-accent" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Proposals Received</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Review proposals submitted by developers for your requirements.</p>
          </div>
          <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-accent/10 dark:text-accent">
            {proposals.length} total
          </div>
        </div>

        {proposals.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 dark:border-gray-700 dark:bg-gray-900">
            <EmptyState
              icon={Inbox}
              title="No proposals received yet"
              description="Developers will appear here after they submit proposals to your requirements."
            />
          </div>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                isDeveloper={false}
                onAction={(action, proposalId) => {
                  if (action === 'message') {
                    toast('Messaging will be available soon.');
                    return;
                  }
                  actionMutation.mutate({ action, proposalId });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
