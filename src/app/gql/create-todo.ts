import { gql } from 'apollo-angular';

import { Todo } from '../interfaces/todo';

export interface ICREATE_TODO {
  createTodo: Todo;
}

export const CREATE_TODO = gql`
  mutation createTodo($CreateTodoInput: CreateTodoInput!) {
    createTodo(CreateTodoInput: $CreateTodoInput) {
      id
      text
      isCompleted
    }
  }
`;
