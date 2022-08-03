import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

import { Todo } from '../interfaces/todo';

import { CREATE_TODO, ICREATE_TODO } from '../gql/create-todo';
import { IUPDATE_TODO, UPDATE_TODO } from '../gql/update-todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly apollo: Apollo) {}

  createTodo(category: string, text: string) {
    return this.apollo
      .mutate<ICREATE_TODO>({
        mutation: CREATE_TODO,
        variables: { CreateTodoInput: { category, text } },
      })
      .pipe(map(({ data }) => plainToInstance(Todo, data!.createTodo)));
  }

  updateTodo(id: number, isCompleted: boolean): Observable<Todo> {
    return this.apollo
      .mutate<IUPDATE_TODO>({
        mutation: UPDATE_TODO,
        variables: { UpdateTodoInput: { id, isCompleted } },
      })
      .pipe(map(({ data }) => plainToInstance(Todo, data!.updateTodo)));
  }
}
