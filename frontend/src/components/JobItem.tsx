import React, { useState } from 'react'
import { FiEdit, FiTrash2, FiMapPin } from 'react-icons/fi'
import { Job } from '@/types/job'

interface JobItemProps {
  job: Job
  onEdit: (job: Job) => void
  onDelete: (jobId: string) => void
}

const JobItem: React.FC<JobItemProps> = ({ job, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    onDelete(job._id)
    setShowDeleteConfirm(false)
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Active': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Closed': 'bg-red-100 text-red-800 border-red-200',
      'Draft': 'bg-amber-100 text-amber-800 border-amber-200'
    }
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status}
      </span>
    )
  }

  const getTypeBadge = (type: string) => {
    const typeClasses = {
      'Full-time': 'bg-green-100 text-green-800 border-green-200',
      'Part-time': 'bg-purple-100 text-purple-800 border-purple-200',
      'Contract': 'bg-orange-100 text-orange-800 border-orange-200',
      'Internship': 'bg-pink-100 text-pink-800 border-pink-200'
    }
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${typeClasses[type as keyof typeof typeClasses] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {type}
      </span>
    )
  }

  return (
    <>
      <tr className="hover:bg-gray-50 transition-all duration-200 group">
        <td className="px-6 py-5 whitespace-nowrap">
          <div>
            <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </div>
            {job.description && (
              <div className="text-sm text-gray-500 truncate max-w-xs mt-1">
                {job.description}
              </div>
            )}
          </div>
        </td>
        <td className="px-6 py-5 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{job.company}</div>
        </td>
        <td className="px-6 py-5 whitespace-nowrap">
          <div className="flex items-center text-sm text-gray-700">
            <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
            {job.location}
          </div>
        </td>
        <td className="px-6 py-5 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {job.salary ? (
              <span className="font-medium text-green-600">{job.salary}</span>
            ) : (
              <span className="text-gray-400 italic">Not specified</span>
            )}
          </div>
        </td>
        <td className="px-6 py-5 whitespace-nowrap">
          {getTypeBadge(job.type)}
        </td>
        <td className="px-6 py-5 whitespace-nowrap">
          {getStatusBadge(job.status)}
        </td>
        <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-3">
            <button
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 group/edit"
              onClick={() => onEdit(job)}
              title="Edit job"
            >
              <FiEdit className="w-4 h-4 group-hover/edit:scale-110 transition-transform" />
            </button>
            <button
              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 group/delete"
              onClick={() => setShowDeleteConfirm(true)}
              title="Delete job"
            >
              <FiTrash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
            </button>
          </div>
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-6 border w-96 shadow-2xl rounded-xl bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FiTrash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <div className="mt-2 px-4 py-3">
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to delete this job posting?
                </p>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {job.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    at {job.company}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-3">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default JobItem
