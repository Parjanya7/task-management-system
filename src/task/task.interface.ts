import { IsString } from 'class-validator';

export interface Task {
    id: number;
    title: String;
    description: String;
    status: String;
    createdAt: Date;
    updatedAt: Date;
}