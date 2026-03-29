import { useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Camera, Loader, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { userAPI } from '@/api/user.api'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'
import { SKILLS } from '@/utils/constants'
import { cn } from '@/utils/cn'

const profileSetupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[a-z0-9._]+$/, 'Use lowercase letters, numbers, dots, or underscores only'),
  bio: z
    .string()
    .trim()
    .min(20, 'Bio must be at least 20 characters')
    .max(500, 'Bio must be at most 500 characters'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  linkedin: z.string().url('LinkedIn URL must be valid').optional().or(z.literal('')),
  instagram: z.string().url('Instagram URL must be valid').optional().or(z.literal('')),
})

export default function ProfileSetup() {
  const navigate = useNavigate()
  const { user, isProfileComplete } = useAuth()
  const { updateUser } = useAuthStore()
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')

  const defaults = useMemo(
    () => ({
      username: user?.username || '',
      bio: user?.bio || '',
      skills: user?.skills || [],
      linkedin: user?.linkedin || '',
      instagram: user?.instagram || '',
    }),
    [user]
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSetupSchema),
    values: defaults,
  })

  const completeMutation = useMutation({
    mutationFn: async (formValues) => {
      const updatedProfile = await userAPI.updateProfile({
        username: formValues.username,
        bio: formValues.bio,
        skills: formValues.skills,
        linkedin: formValues.linkedin || undefined,
        instagram: formValues.instagram || undefined,
      })

      let avatarUrl = user?.avatar || ''
      if (avatarFile) {
        const avatarResponse = await userAPI.uploadAvatar(avatarFile)
        avatarUrl = avatarResponse?.avatarUrl || avatarUrl
      }

      return {
        ...updatedProfile,
        avatar: avatarUrl,
        isProfileComplete: true,
      }
    },
    onSuccess: (profile) => {
      updateUser(profile)
      toast.success('Profile completed successfully')
      navigate('/dashboard', { replace: true })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to complete profile setup')
    },
  })

  const onAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please choose a valid image')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Avatar must be less than 5MB')
      return
    }

    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  if (!user) {
    return null
  }

  if (isProfileComplete) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/50 to-indigo-50/70 px-4 py-10 dark:from-base dark:via-surface dark:to-base">
      <div className="mx-auto max-w-3xl rounded-3xl border border-indigo-200 bg-white/95 p-8 shadow-2xl shadow-indigo-100/60 dark:border-gray-700 dark:bg-surface/95 dark:shadow-none">
        <div className="mb-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-700">
            Complete Your Profile
          </p>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">Set up your public profile</h1>
          <p className="mt-2 text-slate-600 dark:text-gray-400">
            Add your username, bio, skills, and avatar so your profile feels real and trustworthy like LinkedIn and Instagram.
          </p>
        </div>

        <form
          onSubmit={handleSubmit((values) => completeMutation.mutate(values))}
          className="space-y-6"
        >
          <div className="flex items-center gap-5">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="h-20 w-20 rounded-2xl object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <Camera className="h-8 w-8" />
              </div>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-800 transition-colors hover:bg-slate-50">
              <Camera className="h-4 w-4" />
              Choose Avatar
              <input type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
            </label>
          </div>

          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              Username
            </label>
            <input id="username" className="input" placeholder="johndev" {...register('username')} />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="bio" className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              Bio
            </label>
            <textarea id="bio" rows={4} className="input resize-none" placeholder="Tell people what you build and what you are great at..." {...register('bio')} />
            {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">Skills</label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => {
                          const hasSkill = field.value?.includes(skill)
                          const next = hasSkill
                            ? field.value.filter((item) => item !== skill)
                            : [...(field.value || []), skill]
                          field.onChange(next)
                        }}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-sm font-semibold transition-colors',
                          field.value?.includes(skill)
                            ? 'bg-primary-600 text-white'
                            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        )}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="linkedin" className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
                LinkedIn URL (optional)
              </label>
              <input id="linkedin" className="input" placeholder="https://linkedin.com/in/username" {...register('linkedin')} />
              {errors.linkedin && <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>}
            </div>

            <div>
              <label htmlFor="instagram" className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
                Instagram URL (optional)
              </label>
              <input id="instagram" className="input" placeholder="https://instagram.com/username" {...register('instagram')} />
              {errors.instagram && <p className="mt-1 text-sm text-red-600">{errors.instagram.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || completeMutation.isPending || (!avatarFile && !user?.avatar)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-bold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting || completeMutation.isPending ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Saving profile...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Complete profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
