import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import * as proposalAPI from '@/api/proposal.api';
import { Loader } from 'lucide-react';

const proposalSchema = z.object({
  price: z.number().min(1, 'Price must be at least ₹1').max(10000000, 'Price is too high'),
  deliveryDays: z.number().min(1, 'Delivery must be at least 1 day').max(365, 'Delivery cannot exceed 1 year'),
  coverLetter: z.string().min(20, 'Cover letter must be at least 20 characters').max(1000, 'Cover letter cannot exceed 1000 characters'),
});

export function ProposalForm({ requirementId, onSuccess, requirement }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      price: Math.ceil((requirement?.budget?.min + requirement?.budget?.max) / 2 / 100) || 0,
      deliveryDays: 7,
      coverLetter: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => proposalAPI.createProposal(requirementId, data),
    onSuccess: () => {
      toast.success('Proposal submitted successfully!');
      reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit proposal');
    },
  });

  const onSubmit = handleSubmit((data) => {
    createMutation.mutate({
      ...data,
      price: Math.round(data.price * 100), // Convert to paise
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Submit Your Proposal</h3>

      {/* Budget */}
      <div>
        <label htmlFor="price" className="block text-sm font-semibold text-gray-900 dark:text-white">
          Your Price <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">₹</span>
          <input
            type="number"
            id="price"
            {...register('price', { valueAsNumber: true })}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-accent dark:focus:ring-accent"
            placeholder="50000"
          />
        </div>
        {errors.price && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price.message}</p>}
        {requirement && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Budget range: ₹{Math.ceil(requirement.budget?.min / 100)?.toLocaleString('en-IN')} - ₹{Math.ceil(requirement.budget?.max / 100)?.toLocaleString('en-IN')}
          </p>
        )}
      </div>

      {/* Delivery Days */}
      <div>
        <label htmlFor="deliveryDays" className="block text-sm font-semibold text-gray-900 dark:text-white">
          Delivery in (days) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="deliveryDays"
          {...register('deliveryDays', { valueAsNumber: true })}
          min="1"
          max="365"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-accent dark:focus:ring-accent"
          placeholder="7"
        />
        {errors.deliveryDays && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deliveryDays.message}</p>}
      </div>

      {/* Cover Letter */}
      <div>
        <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-900 dark:text-white">
          Cover Letter <span className="text-red-500">*</span>
        </label>
        <textarea
          id="coverLetter"
          {...register('coverLetter')}
          rows={5}
          maxLength={1000}
          className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-accent dark:focus:ring-accent"
          placeholder="Tell the client why you're the perfect fit for this project..."
        />
        {errors.coverLetter && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.coverLetter.message}</p>}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Minimum 20 characters, maximum 1000</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || createMutation.isPending}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-accent dark:hover:bg-accent/90"
      >
        {isSubmitting || createMutation.isPending ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Proposal'
        )}
      </button>
    </form>
  );
}
