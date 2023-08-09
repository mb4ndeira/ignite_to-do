import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { ITasksRepository } from '../../src/modules/tasks/providers/repositories/ITasksRepository';

import { fakeTasks } from '../data';

@Injectable()
class MockTasksRepository implements ITasksRepository {
  private tasks = fakeTasks;

  async create(title: string, parent: string | null) {
    const task = {
      id: v4(),
      title,
      completed: false,
      subtasks: !parent ? [] : null,
      parent,
    };

    this.tasks.push(task);
    return task;
  }

  async findById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
}

export { MockTasksRepository };