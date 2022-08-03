import { gql } from 'apollo-angular';

import type { Category } from '../interfaces/category';

export interface IGET_CATEGORIES {
  categories: Category[];
}

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      title
      todos {
        id
        text
        isCompleted
      }
    }
  }
`;
