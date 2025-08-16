import React, { useState, useEffect, useCallback } from 'react'
import { Job, CreateJobData } from '@/types/job'

interface AddJobModalProps {
  onClose: () => void
  onSubmit: (jobData: CreateJobData | Job) => void
  mode: 'add' | 'edit'
  job?: Job | null
}

const AddJobModal: React.FC<AddJobModalProps> = ({ onClose, onSubmit, mode, job }) => {
  const [formData, setFormData] = useState<CreateJobData>({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    type: 'Full-time',
    status: 'Active'
  })

  const [errors, setErrors] = useState<Partial<CreateJobData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && job) {
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description || '',
        salary: job.salary || '',
        type: job.type,
        status: job.status
      })
    }
  }, [mode, job])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof CreateJobData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }, [errors])

  const validateForm = useCallback(() => {
    const newErrors: Partial<CreateJobData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Job location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const jobData = {
        ...formData,
        title: formData.title.trim(),
        company: formData.company.trim(),
        location: formData.location.trim(),
        description: formData.description?.trim() || '',
        salary: formData.salary?.trim() || ''
      }

      await onSubmit(jobData)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, onSubmit, isSubmitting])

  const isEditMode = mode === 'edit'

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Job' : 'Add New Job'}
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="form-label">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior React Developer"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="company" className="form-label">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className={`form-input ${errors.company ? 'border-red-500' : ''}`}
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Tech Corp"
              />
              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="form-label">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={`form-input ${errors.location ? 'border-red-500' : ''}`}
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="form-input"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., $80,000 - $120,000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="form-label">
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="form-input"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-input"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the job responsibilities, requirements, and benefits..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? 'Update Job' : 'Create Job'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJobModal
