import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as requirementAPI from '@/api/requirement.api';
import { RequirementCard } from '@/components/se-market/RequirementCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { useAuth } from '@/hooks/useAuth';
import { Briefcase, Plus, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function MyRequirements() {
  const navigate = useNavigate();
  const { user, isUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState(null);
  const [expandedStatus, setExpandedStatus] = useState(false);

  // Check user role
  if (!isUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900/20">
            <h2 className="text-lg font-bold text-red-900 dark:text-red-200">Access Denied</h2>
            <p className="mt-2 text-red-800 dark:text-red-300">Only users can post and manage requirements.</p>
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

  // Fetch requirements
  const requirementsQuery = useQuery({
    queryKey: ['requirements', 'my-requirements', statusFilter],
    queryFn: () => requirementAPI.getMyRequirements(1, 50, statusFilter),
  });

  // Delete requirement mutation
  const deleteMutation = useMutation({
    mutationFn: requirementAPI.deleteRequirement,
    onSuccess: () => {
      toast.success('Requirement deleted successfully');
      requirementsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete requirement');
    },
  });

  // Close requirement mutation
  const closeMutation = useMutation({
    mutationFn: requirementAPI.closeRequirement,
    onSuccess: () => {
      toast.success('Requirement closed successfully');
      requirementsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to close requirement');
    },
  });

  const requirements = Array.isArray(requirementsQuery.data) ? requirementsQuery.data : [];
  const statusCounts = {
    open: requirements.filter((r) => r.status === 'open').length,
    closed: requirements.filter((r) => r.status === 'closed').length,
  };

  const getRequirementId = (requirement) => requirement?._id || requirement?.id;

  const handleAction = (action, requirementId) => {
    if (!requirementId) {
      toast.error('Invalid requirement ID');
      return;
    }

    if (action === 'close') {
      if (window.confirm('Are you sure you want to close this requirement? New proposals won\'t be accepted.')) {
        closeMutation.mutate(requirementId);
      }
    } else if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this requirement? This action cannot be undone.')) {
        deleteMutation.mutate(requirementId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-8 w-8 text-primary dark:text-accent" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Requirements</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Manage projects and view proposals from developers
            </p>
          </div>
          <button
            onClick={() => navigate('/se-market/post-requirement')}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90 dark:bg-accent dark:hover:bg-accent/90"
          >
            <Plus className="h-5 w-5" />
            Post Requirement
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: 'Total', count: requirements.length, status: null },
            { label: 'Open', count: statusCounts.open, status: 'open' },
            { label: 'Closed', count: statusCounts.closed, status: 'closed' },
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

        {/* Requirements List */}
        {requirementsQuery.isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        ) : requirementsQuery.error ? (
          <ErrorState
            title="Failed to load requirements"
            description="An error occurred while loading your requirements."
            onRetry={() => requirementsQuery.refetch()}
          />
        ) : requirements.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No requirements yet"
            description={
              statusFilter
                ? 'You have no requirements with this status'
                : 'Post a requirement to get started!'
            }
          />
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {requirements.map((requirement) => (
              <div key={getRequirementId(requirement)} className="relative">
                <RequirementCard requirement={requirement} />
                
                {/* Actions Overlay */}
                <div className="mt-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/se-market/requirement/${getRequirementId(requirement)}`)}
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 dark:bg-accent dark:hover:bg-accent/90"
                  >
                    View Details
                  </button>
                  {requirement.status === 'open' && (
                    <button
                      onClick={() => handleAction('close', getRequirementId(requirement))}
                      disabled={closeMutation.isPending}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Close
                    </button>
                  )}
                  <button
                    onClick={() => handleAction('delete', getRequirementId(requirement))}
                    disabled={deleteMutation.isPending}
                    className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    Delete
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
