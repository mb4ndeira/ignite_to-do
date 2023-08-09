import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/database/PrismaService';

import { ITasksRepository } from '../ITasksRepository';

@Injectable()
class TasksRepository implements ITasksRepository {
  constructor(private prisma: PrismaService) {}

  async create(title: string, parent: string | null) {
    const { id, completed } = await this.prisma.task.create({
      data: { title, completed: false, parent_id: parent },
    });

    return { id, title, completed, parent, subtasks: !parent ? [] : null };
  }

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { subtasks: true },
    });

    if (!task) return null;

    const { title, completed, parent_id, subtasks } = task;

    return {
      id,
      title,
      completed,
      parent: parent_id,
      subtasks: subtasks,
    };
  }
}

export { TasksRepository };