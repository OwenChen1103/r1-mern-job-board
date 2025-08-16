import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, maxlength: 100 })
  title: string;

  @Prop({ required: true, maxlength: 50 })
  company: string;

  @Prop({ required: true, maxlength: 100 })
  location: string;

  @Prop({ maxlength: 1000 })
  description?: string;

  @Prop()
  salary?: string;

  @Prop({ 
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time'
  })
  type: string;

  @Prop({ 
    enum: ['Active', 'Closed', 'Draft'],
    default: 'Active'
  })
  status: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
