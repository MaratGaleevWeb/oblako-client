import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

import { GET_CATEGORIES, IGET_CATEGORIES } from '../gql/get-categories';

import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly apollo: Apollo) {}

  getCategories(): Observable<Category[]> {
    return this.apollo
      .watchQuery<IGET_CATEGORIES>({
        query: GET_CATEGORIES,
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(
        map(({ data }) => plainToInstance(Category, data.categories)),
      );
  }
}
