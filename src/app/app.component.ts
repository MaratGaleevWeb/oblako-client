import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, EMPTY, switchMap } from 'rxjs';

import { DialogComponent } from './components/dialog/dialog.component';

import { CategoryService } from './services/category.service';
import { TodoService } from './services/todo.service';

import { Category } from './interfaces/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  categories: Category[] = [];
  isModalVisible = false;
  todo = '';

  constructor(
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoryService,
    private readonly todoService: TodoService,
    private readonly cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => this.setCategories(categories));
  }

  updateTodo([id, isCompleted]: [number, boolean]): void {
    this.todoService.updateTodo(id, isCompleted).subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '400px',
      data: { todo: this.todo, categories: this.categories },
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap(({ category, todo }) =>
          this.todoService.createTodo(category, todo),
        ),
        switchMap(() => this.categoryService.getCategories()),
        catchError(() => EMPTY),
      )
      .subscribe((categories) => this.setCategories(categories));
  }

  private setCategories(categories: Category[]): void {
    this.categories = categories;
    this.cd.markForCheck();
  }
}
