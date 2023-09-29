import { Controller, Get, Post, Put, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { CreateTaskDto, TaskMetricDto, UpdateTaskDto } from './task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    
    @Post()
    async createTask (@Body() body: CreateTaskDto): Promise<Task> {
        const creationResult = await this.taskService.createTask(body);
        return creationResult;
    };

    @Put(':id')
    async updateTask(@Param('id', ParseIntPipe) id: number, @Body() task: UpdateTaskDto): Promise<Task> {
        const updatationResult = await this.taskService.updateTask(id, task);
        return updatationResult;
    }

    @Get()
    async getAllTasks(
            @Query('page', ParseIntPipe) page: number,
            @Query('limit', ParseIntPipe) limit: number
        ): Promise<Task[]> {

        const getResult = await this.taskService.getAllTasks(page, limit);
        return getResult;
    }

    @Get('metrics')
    async getTaskMetrics(): Promise<TaskMetricDto> {
        const metrics = await this.taskService.getTaskMetrics();
        return metrics;
    }
}
