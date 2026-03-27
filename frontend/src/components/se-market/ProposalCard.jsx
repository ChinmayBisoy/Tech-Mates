import { formatINR } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { CheckCircle2, Clock, MessageSquare, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';

const proposalStatusColor = {
  pending: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900',
  accepted: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900',
  rejected: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-900',
  withdrawn: 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-900',
  shortlisted: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-900',
  contract_created: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-900',
};

const proposalStatusLabel = {
  pending: 'Pending Review',
  accepted: 'Accepted',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
  shortlisted: 'Shortlisted',
  contract_created: 'Contract Created',
};

export function ProposalCard({ proposal, isDeveloper = false, onAction = null }) {
  const isBoosted = proposal.boosted;

  return (
    <div className={cn(
      'rounded-lg border bg-white p-4 transition-all dark:bg-gray-900',
      isBoosted ? 'border-accent shadow-md shadow-accent/20 dark:shadow-accent/10' : 'border-gray-200 dark:border-gray-700'
    )}>
      {/* Header with status and boost badge */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img
              src={isDeveloper ? proposal.requirement.client.avatar : proposal.developer.avatar}
              alt={isDeveloper ? proposal.requirement.client.name : proposal.developer.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">
                {isDeveloper ? proposal.requirement.client.name : proposal.developer.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(new Date(proposal.createdAt))}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isBoosted && (
            <div className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1">
              <TrendingUp className="h-3 w-3 text-accent" />
              <span className="text-xs font-semibold text-accent">Boosted</span>
            </div>
          )}
          <div className={cn('border rounded-full px-3 py-1 text-xs font-semibold', proposalStatusColor[proposal.status])}>
            {proposalStatusLabel[proposal.status]}
          </div>
        </div>
      </div>

      {/* Proposal details for requirement owner */}
      {!isDeveloper && (
        <div className="mb-3">
          <p className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
            {proposal.requirement.title}
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {proposal.coverLetter}
          </p>
        </div>
      )}

      {/* Proposal details for developer */}
      {isDeveloper && (
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {proposal.requirement.title}
          </p>
        </div>
      )}

      {/* Stats row */}
      <div className="mb-3 grid grid-cols-3 gap-3 border-t border-gray-200 pt-3 dark:border-gray-700">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
          <p className="font-bold text-primary">{formatINR(proposal.price / 100)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Delivery</p>
          <p className="font-semibold text-gray-900 dark:text-white">{proposal.deliveryDays}d</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Milestones</p>
          <p className="font-semibold text-gray-900 dark:text-white">{proposal.milestones?.length || 0}</p>
        </div>
      </div>

      {/* Actions row */}
      {onAction && (
        <div className="flex gap-2">
          {proposal.status === 'pending' && (
            <>
              <button
                onClick={() => onAction('accept', proposal.id)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                <CheckCircle2 className="h-4 w-4" />
                Accept
              </button>
              <button
                onClick={() => onAction('reject', proposal.id)}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Reject
              </button>
            </>
          )}
          {isDeveloper && proposal.status === 'pending' && (
            <>
              <button
                onClick={() => onAction('withdraw', proposal.id)}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Withdraw
              </button>
            </>
          )}
          {!isDeveloper && proposal.status === 'pending' && (
            <>
              <button
                onClick={() => onAction('shortlist', proposal.id)}
                className="flex-1 rounded-lg border border-primary py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 dark:border-accent dark:text-accent dark:hover:bg-accent/10"
              >
                Shortlist
              </button>
            </>
          )}
          <button
            onClick={() => onAction('message', proposal.id)}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
