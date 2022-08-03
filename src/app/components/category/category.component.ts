import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

import { Category } from 'src/app/interfaces/category';
import type { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
  @Input() category!: Category;

  @Output() checkEvent = new EventEmitter<[number, boolean]>();

  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
  ) {}

  get checkboxes(): FormArray {
    return this.form.get('checkboxes') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
  }

  checkHandler({ id, isCompleted }: Todo): void {
    this.checkEvent.emit([id, !isCompleted]);
  }

  private initForm(): void {
    this.form = this.fb.group({
      checkboxes: this.fb.array(
        this.category.todos.map(({ isCompleted }) =>
          this.fb.control(isCompleted),
        ),
      ),
    });

    requestAnimationFrame(() => this.cd.markForCheck());
  }
}
