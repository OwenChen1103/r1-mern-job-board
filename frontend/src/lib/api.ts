import axios from 'axios'
import { Job, CreateJobData, UpdateJobData } from '@/types/job'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Job API functions
export const getJobs = async (): Promise<Job[]> => {
  try {
    return await api.get('/jobs')
  } catch (error) {
    throw new Error('Failed to fetch jobs')
  }
}

export const getJob = async (id: string): Promise<Job> => {
  try {
    return await api.get(`/jobs/${id}`)
  } catch (error) {
    throw new Error('Failed to fetch job')
  }
}

export const createJob = async (jobData: CreateJobData): Promise<Job> => {
  try {
    return await api.post('/jobs', jobData)
  } catch (error) {
    throw new Error('Failed to create job')
  }
}

export const updateJob = async (id: string, jobData: UpdateJobData): Promise<Job> => {
  try {
    return await api.patch(`/jobs/${id}`, jobData)
  } catch (error) {
    throw new Error('Failed to update job')
  }
}

export const deleteJob = async (id: string): Promise<void> => {
  try {
    return await api.delete(`/jobs/${id}`)
  } catch (error) {
    throw new Error('Failed to delete job')
  }
}

export default api
