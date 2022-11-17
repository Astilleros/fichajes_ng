import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-id',
  templateUrl: './task-id.component.html',
  styleUrls: ['./task-id.component.css'],
})
export class TasksIdComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<TasksIdComponent>,
    private Tasks: TasksService,
    private FB: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Task
  ) {}

  task: any;
  @Output() taskOut = new EventEmitter<Task>();

  formEditTask: FormGroup = this.FB.group({
    name: this.FB.control('', [Validators.required]),
    description: this.FB.control('', [Validators.required])
  });

  ngOnInit(): void {
    this.task = this.data;

    let value = Object.keys(this.formEditTask.value).reduce(
      (acc: any, key: string) => ({ ...acc, ...{ [key]: this.task[key] } }),
      {}
    );
    this.formEditTask.patchValue(value);
    this.formEditTask.valueChanges.subscribe(this.onChange);
  }

  onChange = (task: Task) => {
    if (this.formEditTask?.invalid) return;
    if (this.task) {
      this.Tasks.updateOne(this.task._id, {
        ...this.task,
        ...task,
      }).subscribe((task: Task) => {
        this.task = task
        console.log(task);
      });
    }
  };

  close() {
    this.taskOut.emit(this.task);
    this.dialogRef.close();
  }
}
