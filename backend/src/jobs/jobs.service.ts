import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = new this.jobModel(createJobDto);
    return createdJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find({ status: { $ne: 'Deleted' } }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const updatedJob = await this.jobModel
      .findByIdAndUpdate(id, updateJobDto, { new: true, runValidators: true })
      .exec();
    
    if (!updatedJob) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    
    return updatedJob;
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }
}
