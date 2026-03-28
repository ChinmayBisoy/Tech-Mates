const { z } = require('zod');

const updateProfileSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters').max(60, 'name must be at most 60 characters').optional(),
  bio: z.string().max(500, 'bio must be at most 500 characters').optional(),
  skills: z.array(z.string().min(1, 'skill cannot be empty')).optional(),
  location: z.string().optional(),
  website: z.string().url('website must be a valid URL').optional(),
  githubUsername: z.string().min(1, 'githubUsername cannot be empty').optional(),
  portfolioLinks: z.array(z.string().url('portfolio link must be a valid URL')).optional(),
});

const searchDeveloperSchema = z.object({
  skills: z.string().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  tier: z.enum(['beginner', 'professional', 'elite']).optional(),
  isPro: z.coerce.boolean().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['rating', 'contracts', 'newest']).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

module.exports = {
  updateProfileSchema,
  searchDeveloperSchema,
};
