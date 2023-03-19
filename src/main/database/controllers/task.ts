import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { getRepository, Repository } from 'typeorm';
import { Task } from '../entity/Task';

@Controller()
export class TaskController {
    taskRepository: Repository<Task> = getRepository(Task);

  @Get('/tasks')
    async getAll() {
        return await this.taskRepository.find();
    }

  @Get('/tasks/:id')
  getOne(@Param('id') id: number) {
      return 'This action returns user #' + id;
  }

  @Post('/tasks')
  post(@Body() task: any) {
      return 'Saving user...';
  }

  @Put('/tasks/:id')
  put(@Param('id') id: number, @Body() task: any) {
      return 'Updating a user...';
  }

  @Delete('/tasks/:id')
  remove(@Param('id') id: number) {
      return 'Removing user...';
  }
}