import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary dark:text-accent hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Notifications</h1>
      
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">
          You have no notifications yet. We'll notify you when something important happens!
        </p>
      </div>
    </div>
  );
}
