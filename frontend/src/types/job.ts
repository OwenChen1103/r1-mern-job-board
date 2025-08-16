export interface Job {
  _id: string
  title: string
  company: string
  location: string
  description?: string
  salary?: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  status: 'Active' | 'Closed' | 'Draft'
  createdAt: string
  updatedAt: string
}

export type CreateJobData = Omit<Job, '_id' | 'createdAt' | 'updatedAt'>
export type UpdateJobData = Partial<CreateJobData>
