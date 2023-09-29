import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto, TaskMetricDto, UpdateTaskDto } from './task.dto';
import { TaskStatus } from './task.dto';

@Injectable()
export class TaskService {
    constructor(private readonly db: DatabaseService) {}

    async createTask(task: CreateTaskDto): Promise<Task> {
        const { title, description } = task;
        const taskParams = {
            title,
            description,
            status: TaskStatus.OPEN,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const createdTask = await this.db.task.create({ data: taskParams });
        return createdTask;
    }

    async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
        const updateParams = {
            ...task,
            updatedAt: new Date()
        };
        const updatedTask = await this.db.task.update({
            where: {
                id
            },
            data: updateParams
        });
        return updatedTask;
    }

    async getAllTasks(page: number = 1, limit: number = 10): Promise<Task[]> {
        const skip = (page - 1) * 10;
        const tasks = await this.db.task.findMany({
            skip,
            take: limit
        });
        return tasks;
    }

    async getTaskMetrics(): Promise<TaskMetricDto> {
        const metrics = await this.db.task.groupBy({
            by: ['status', 'createdAt'],
            orderBy: {
                createdAt: 'asc'
            },
            _count: true,
        });

        let monthlyMetrics = [];
        let totalMetrics = {
            open_tasks: 0,
            inProgress_tasks: 0,
            completed_tasks: 0
        };

        metrics.forEach(metric => {
            const formattedDate = metric.createdAt.toLocaleString(undefined, { year: 'numeric', month: 'long' });
            let found = false;
            monthlyMetrics.forEach((met, i) => {
                if (met.date === formattedDate) {
                    if (metric.status === 'OPEN') {
                        monthlyMetrics[i].metrics.open_tasks += metric._count;
                        totalMetrics.open_tasks += metric._count;
                    } else if (metric.status === 'IN_PROGRESS') {
                        monthlyMetrics[i].metrics.inProgress_tasks += metric._count;
                        totalMetrics.inProgress_tasks += metric._count;
                    } else if (metric.status === 'COMPLETED') {
                        monthlyMetrics[i].metrics.completed_tasks += metric._count;
                        totalMetrics.completed_tasks += metric._count;
                    }
                    found = true;
                    return;
                }
            });
            if (!found) {
                monthlyMetrics.push({
                    date: metric.createdAt.toLocaleString(undefined, { year: 'numeric', month: 'long' }),
                    metrics: {
                        open_tasks: 0,
                        inProgress_tasks: 0,
                        completed_tasks: 0
                    }
                });
                if (metric.status === 'OPEN') {
                    monthlyMetrics[monthlyMetrics.length - 1].metrics.open_tasks += metric._count;
                    totalMetrics.open_tasks += metric._count;
                } else if (metric.status === 'IN_PROGRESS') {
                    monthlyMetrics[monthlyMetrics.length - 1].metrics.inProgress_tasks += metric._count;
                    totalMetrics.inProgress_tasks += metric._count;
                } else if (metric.status === 'COMPLETED') {
                    monthlyMetrics[monthlyMetrics.length - 1].metrics.completed_tasks += metric._count;
                    totalMetrics.completed_tasks += metric._count;
                }
            }
        });

        return {
            totalMetrics,
            monthlyMetrics
        };
    }
}
