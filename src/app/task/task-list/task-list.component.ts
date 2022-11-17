import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TasksIdComponent } from '../task-id/task-id.component';

@Component({
  selector: 'app-socs-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TaskListComponent implements OnInit {

  constructor(
    private Dialogs : MatDialog,
    private tasksService : TasksService,
  ) { }

  tasks: Task[] = []

  columnsToDisplay = ['name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;


  createTaskModal? : MatDialogRef<TaskCreateComponent>
  openCreateDialog () {
    this.createTaskModal = this.Dialogs.open(TaskCreateComponent, {});
    this.createTaskModal.componentInstance.taskOut.subscribe((task: Task) => {
      this.tasks.push(task)
    })
  }

  editTaskModal? : MatDialogRef<TasksIdComponent>
  openEditDialog (task: Task) {
    this.editTaskModal = this.Dialogs.open(TasksIdComponent, { data: task });
    this.editTaskModal.componentInstance.taskOut.subscribe((task: Task) => {
      this.tasks.push(task)
    })
  }

  ngOnInit(): void {
    this.tasksService.getAll().subscribe((response: Task[]) => {
      this.tasks = response
    })
  }

}
