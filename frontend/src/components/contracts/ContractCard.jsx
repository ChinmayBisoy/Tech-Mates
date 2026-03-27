import { Link } from 'react-router-dom';
import { formatINR } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { 
  Briefcase, 
  User, 
  DollarSign, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/utils/cn';

const contractStatusConfig = {
  active: {
    label: 'Active',
    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900',
    icon: Clock,
  },
  completed: {
    label: 'Completed',
    badge: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900',
    icon: CheckCircle2,
  },
  disputed: {
    label: 'Disputed',
    badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900',
    icon: AlertCircle,
  },
  cancelled: {
    label: 'Cancelled',
    badge: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-900',
    icon: AlertCircle,
  },
};

export function ContractCard({ contract }) {
  const config = contractStatusConfig[contract.status] || contractStatusConfig.active;
  const Icon = config.icon;

  // Calculate progress
  const completedMilestones = contract.milestones?.filter(
    (m) => ['approved', 'released'].includes(m.status)
  ).length || 0;
  const totalMilestones = contract.milestones?.length || 0;
  const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  // Calculate total value
  const totalValue = contract.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;
  const completedValue = contract.milestones
    ?.filter((m) => ['approved', 'released'].includes(m.status))
    .reduce((sum, m) => sum + m.amount, 0) || 0;

  return (
    <Link
      to={`/contracts/${contract.id}`}
      className="group rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-accent"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="rounded-lg bg-primary/10 p-2 dark:bg-accent/10">
            <Briefcase className="h-5 w-5 text-primary dark:text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 group-hover:text-primary dark:text-white dark:group-hover:text-accent transition-colors line-clamp-1">
              {contract.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Contract #{contract.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>
        <div className={cn('border rounded-full px-3 py-1 text-xs font-semibold', config.badge)}>
          {config.label}
        </div>
      </div>

      {/* Participants */}
      <div className="mb-3 flex items-center gap-3 text-sm">
        <div className="flex items-center gap-2 flex-1">
          <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <span className="text-gray-600 dark:text-gray-400">
            {contract.isClientView ? contract.developer.name : contract.client.name}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4 space-y-2 border-t border-gray-200 pt-3 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {completedMilestones}/{totalMilestones}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent dark:from-accent dark:to-primary/80 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
          <p className="font-bold text-gray-900 dark:text-white">
            ₹{formatINR(totalValue / 100)}
          </p>
        </div>
        <div className="rounded bg-green-50 p-2 dark:bg-green-900/10">
          <p className="text-xs text-green-700 dark:text-green-400">Funded</p>
          <p className="font-bold text-green-900 dark:text-green-300">
            ₹{formatINR(completedValue / 100)}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>Started {formatDate(new Date(contract.createdAt))}</span>
        </div>
      </div>
    </Link>
  );
}
