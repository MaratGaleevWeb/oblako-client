import { gql } from 'apollo-angular';

import type { Todo } from '../interfaces/todo';

export interface IUPDATE_TODO {
  updateTodo: Todo;
}

export const UPDATE_TODO = gql`
  mutation updateTodo($UpdateTodoInput: UpdateTodoInput!) {
    updateTodo(UpdateTodoInput: $UpdateTodoInput) {
      id
      text
      isCompleted
    }
  }
`;
