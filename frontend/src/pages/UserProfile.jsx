import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Mail, MessageCircle, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  // Placeholder user data (in real app, fetch from API)
  const [profile] = useState({
    id: userId,
    name: 'John Developer',
    role: 'developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Developer',
    bio: 'Experienced full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    rating: 4.8,
    reviews: 152,
    completedProjects: 89,
    joinDate: '2022-03-15',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    hourlyRate: '₹1500',
    isVerified: true,
  });

  const isOwnProfile = currentUser?.id === userId;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary dark:text-accent hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Profile Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-900 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h1>
              {profile.isVerified && (
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full font-semibold">
                  Verified
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 capitalize mb-4">
              {profile.role}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {profile.bio}
            </p>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {profile.rating}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    ({profile.reviews} reviews)
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {profile.completedProjects}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {profile.hourlyRate}/hr
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-bold text-white hover:bg-primary/90 dark:bg-accent dark:hover:bg-accent/90">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2 font-bold hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                  <Mail className="w-4 h-4" />
                  Hire
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, idx) => (
            <span
              key={idx}
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Member Since */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Member since {new Date(profile.joinDate).toLocaleDateString('en-IN')}
        </p>
      </div>
    </div>
  );
}
