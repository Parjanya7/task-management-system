import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}

export class TaskMetricDto {
    monthlyMetrics: {
        date: string;
        metrics: {
            open_tasks: number;
            inProgress_tasks: number;
            completed_tasks: number;
        }
    }[];
    totalMetrics: {
        open_tasks: number;
        inProgress_tasks: number;
        completed_tasks: number;
    };
}