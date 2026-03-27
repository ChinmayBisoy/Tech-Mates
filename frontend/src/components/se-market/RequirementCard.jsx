import { Link } from 'react-router-dom';
import { formatINR } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { SkillTags } from '@/components/profile/SkillTags';
import { Briefcase, Clock, MapPin } from 'lucide-react';

export function RequirementCard({ requirement, onViewProposals }) {
  const skillsList = requirement.skills?.slice(0, 3) || [];
  const skillsCount = requirement.skills?.length || 0;
  const daysAgo = Math.floor(
    (Date.now() - new Date(requirement.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  const deadline = new Date(requirement.deadline);
  const daysLeft = Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Link
      to={`/se-market/requirement/${requirement.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Header with client avatar and metadata */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={requirement.client.avatar || `https://ui-avatars.com/api/?name=${requirement.client.name}`}
            alt={requirement.client.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {requirement.client.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Posted {daysAgo === 0 ? 'today' : `${daysAgo}d ago`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 dark:bg-blue-900/20">
          <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            {requirement.proposalCount || 0} proposals
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 line-clamp-2 text-base font-bold text-gray-900 dark:text-white">
        {requirement.title}
      </h3>

      {/* Description snippet */}
      <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
        {requirement.description}
      </p>

      {/* Skills */}
      {skillsList.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          <SkillTags skills={skillsList} />
          {skillsCount > 3 && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              +{skillsCount - 3}
            </span>
          )}
        </div>
      )}

      {/* Budget and deadline */}
      <div className="space-y-2 border-t border-gray-200 pt-3 dark:border-gray-700">
        {/* Budget */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Budget</span>
          <span className="font-bold text-primary">
            {formatINR(requirement.budget.min / 100)} - {formatINR(requirement.budget.max / 100)}
          </span>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className={daysLeft < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}>
            {daysLeft < 0
              ? `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''}`
              : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
          </span>
        </div>

        {/* Location if applicable */}
        {requirement.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{requirement.location}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
