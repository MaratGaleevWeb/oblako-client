import type { Todo } from './todo';

export class Category {
  id!: number;
  title!: string;
  todos!: Todo[];
}
