import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import * as requirementAPI from '@/api/requirement.api';
import { RequirementCard } from '@/components/se-market/RequirementCard';
import { RequirementFilters } from '@/components/se-market/RequirementFilters';
import { SkeletonCard } from '@/components/shared/SkeletonCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Search, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';

const RESULTS_PER_PAGE = 12;

export default function BrowseRequirements() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  // Parse filters from URL
  const [filters, setFilters] = useState({
    categories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
    skills: searchParams.get('skills')?.split(',').filter(Boolean) || [],
    budgetRange: searchParams.get('budgetRange') || null,
    deadlineInDays: searchParams.get('deadlineInDays') ? parseInt(searchParams.get('deadlineInDays')) : null,
    search: localSearch,
  });

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (localSearch) params.set('search', localSearch);
    if (filters.categories.length) params.set('categories', filters.categories.join(','));
    if (filters.skills.length) params.set('skills', filters.skills.join(','));
    if (filters.budgetRange) params.set('budgetRange', filters.budgetRange);
    if (filters.deadlineInDays) params.set('deadlineInDays', filters.deadlineInDays);
    if (page > 1) params.set('page', page);

    setSearchParams(params, { replace: true });
  }, [filters, localSearch, page, setSearchParams]);

  // Fetch requirements
  const queryKey = [
    'requirements',
    'browse',
    {
      search: filters.search,
      categories: filters.categories,
      skills: filters.skills,
      budgetRange: filters.budgetRange,
      deadlineInDays: filters.deadlineInDays,
      page,
      limit: RESULTS_PER_PAGE,
    },
  ];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      requirementAPI.fetchRequirements({
        search: filters.search,
        categories: filters.categories,
        skills: filters.skills,
        budgetRange: filters.budgetRange,
        deadlineInDays: filters.deadlineInDays,
        page,
        limit: RESULTS_PER_PAGE,
      }),
    keepPreviousData: true,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset to first page on filter change
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      search: localSearch,
    }));
    setPage(1);
  };

  const requirements = data?.requirements || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-8 w-8 text-primary dark:text-accent" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Exchange Market</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Browse projects and opportunities to work on
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search by project title, skills, or client name..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-accent dark:focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90 dark:bg-accent dark:hover:bg-accent/90"
            >
              Search
            </button>
          </div>
        </form>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <RequirementFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              // Skeleton Loading
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
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
                title="No requirements found"
                description={
                  filters.search || filters.categories.length || filters.skills.length
                    ? 'Try adjusting your filters to find more projects'
                    : 'No opportunities available at the moment. Check back later!'
                }
              />
            ) : (
              <>
                {/* Results Grid */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  {requirements.map((requirement) => (
                    <RequirementCard key={requirement.id} requirement={requirement} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(Math.max(1, page - 1))}
                      className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                        const pageNum = Math.max(1, page - 2) + i;
                        if (pageNum > totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`h-10 w-10 rounded-lg font-semibold transition-colors ${
                              pageNum === page
                                ? 'bg-primary text-white dark:bg-accent'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
