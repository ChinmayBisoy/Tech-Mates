import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as contractAPI from '@/api/contract.api';
import { ContractCard } from '@/components/contracts/ContractCard';
import { SkeletonCard } from '@/components/shared/SkeletonCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Briefcase, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContractList() {
  const [statusFilter, setStatusFilter] = useState(null);
  const [expandedStatus, setExpandedStatus] = useState(false);

  // Fetch contracts
  const contractsQuery = useQuery({
    queryKey: ['contracts', statusFilter],
    queryFn: () => contractAPI.fetchContracts(1, 50, statusFilter),
  });

  const contracts = contractsQuery.data?.contracts || [];
  const statusCounts = {
    active: contracts.filter((c) => c.status === 'active').length,
    completed: contracts.filter((c) => c.status === 'completed').length,
    disputed: contracts.filter((c) => c.status === 'disputed').length,
    cancelled: contracts.filter((c) => c.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-8 w-8 text-primary dark:text-accent" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Contracts</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your active contracts and track milestones
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { label: 'Total', count: contracts.length, status: null },
            { label: 'Active', count: statusCounts.active, status: 'active' },
            { label: 'Completed', count: statusCounts.completed, status: 'completed' },
            { label: 'Disputed', count: statusCounts.disputed, status: 'disputed' },
            { label: 'Cancelled', count: statusCounts.cancelled, status: 'cancelled' },
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

        {/* Contracts List */}
        {contractsQuery.isLoading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : contractsQuery.error ? (
          <ErrorState
            title="Failed to load contracts"
            description="An error occurred while loading your contracts."
            onRetry={() => contractsQuery.refetch()}
          />
        ) : contracts.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No contracts yet"
            description={
              statusFilter
                ? 'You have no contracts with this status'
                : 'Start by accepting proposals to create contracts!'
            }
          />
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {contracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
