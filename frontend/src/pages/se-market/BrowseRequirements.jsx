import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import * as requirementAPI from '@/api/requirement.api';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { formatINR } from '@/utils/formatCurrency';
import { formatDeadline } from '@/utils/formatDate';
import { Briefcase, Clock3 } from 'lucide-react';

const truncateText = (value, maxLength = 140) => {
  if (typeof value !== 'string') return '';
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
};

export default function BrowseRequirements() {
  const { data: openRequirementsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['requirements', 'open', 'opportunities-page'],
    queryFn: () => requirementAPI.fetchOpenRequirements(50),
  });

  const requirements = Array.isArray(openRequirementsResponse?.data)
    ? openRequirementsResponse.data
    : Array.isArray(openRequirementsResponse)
      ? openRequirementsResponse
      : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 text-center lg:text-left">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:text-primary-300 lg:justify-start">
            <Clock3 className="h-4 w-4" />
            Live Opportunities
          </p>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Open Opportunities</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Fresh requirements from teams looking for developers right now.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-base">
                <div className="mb-4 h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mb-4 h-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title="Failed to load requirements"
            description="An error occurred while loading requirements. Please try again."
            onRetry={() => refetch()}
          />
        ) : requirements.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No open requirements at the moment"
            description="Check back soon for new opportunities."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {requirements.map((requirement) => {
              const requirementId = requirement?._id || requirement?.id;
              const minBudget = requirement?.budget?.min ?? requirement?.budgetMin ?? 0;
              const maxBudget = requirement?.budget?.max ?? requirement?.budgetMax ?? 0;
              const skills = requirement?.skills || requirement?.skillsRequired || [];

              return (
                <Link
                  key={requirementId}
                  to={`/se-market/requirement/${requirementId}`}
                  className="group rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50 to-indigo-100/70 p-6 shadow-sm shadow-indigo-100/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-100/80 dark:border-gray-800 dark:bg-none dark:bg-base dark:hover:shadow-primary-900/30"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-accent">
                        {requirement.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 break-all overflow-hidden">
                        {truncateText(requirement.description, 130)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-900/30">
                      <Briefcase className="h-4 w-4 text-primary-700 dark:text-primary-200" />
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700 dark:bg-primary-800/40 dark:text-primary-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <p className="font-bold text-primary-700 dark:text-accent">
                      {formatINR(minBudget)} - {formatINR(maxBudget)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{formatDeadline(requirement.deadline)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
