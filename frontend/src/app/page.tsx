'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import JobList from '@/components/JobList'
import AddJobModal from '@/components/AddJobModal'
import { getJobs, createJob, updateJob, deleteJob } from '@/lib/api'
import { Job, CreateJobData } from '@/types/job'

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const data = await getJobs()
      setJobs(data)
    } catch (error) {
      toast.error('Failed to fetch jobs')
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddJob = async (jobData: CreateJobData | Job) => {
    try {
      const newJob = await createJob(jobData as CreateJobData)
      setJobs([newJob, ...jobs])
      setShowAddModal(false)
      toast.success('Job created successfully!')
    } catch (error) {
      toast.error('Failed to create job')
      console.error('Error creating job:', error)
    }
  }

  const handleEditJob = async (jobData: CreateJobData | Job) => {
    try {
      if (editingJob && '_id' in editingJob) {
        const updatedJob = await updateJob(editingJob._id, jobData)
        setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job))
        setEditingJob(null)
        toast.success('Job updated successfully!')
      }
    } catch (error) {
      toast.error('Failed to update job')
      console.error('Error updating job:', error)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJob(jobId)
      setJobs(jobs.filter(job => job._id !== jobId))
      toast.success('Job deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete job')
      console.error('Error deleting job:', error)
    }
  }

  const openEditModal = (job: Job) => {
    setEditingJob(job)
  }

  const closeEditModal = () => {
    setEditingJob(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-16">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 blur-xl"></div>
            </div>
            <h1 className="relative text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Job Board
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Manage your job postings with ease and efficiency
          </p>
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </header>

        <div className="flex justify-end mb-8">
          <button 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Add New Job
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : (
          <JobList
            jobs={jobs}
            onEdit={openEditModal}
            onDelete={handleDeleteJob}
          />
        )}

        {/* Add Job Modal */}
        {showAddModal && (
          <AddJobModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddJob}
            mode="add"
          />
        )}

        {/* Edit Job Modal */}
        {editingJob && (
          <AddJobModal
            onClose={closeEditModal}
            onSubmit={handleEditJob}
            mode="edit"
            job={editingJob}
          />
        )}
      </div>
    </div>
  )
}
