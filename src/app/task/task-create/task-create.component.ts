import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<TaskCreateComponent>,
    private Tasks : TasksService,
    private FB : FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Task
  ){}

  @Output() taskOut = new EventEmitter<Task>()

  formCreateTask : FormGroup = this.FB.group({
    name: this.FB.control('', [Validators.required]),
    description: this.FB.control('', [Validators.required]),
  })
  
  ngOnInit(): void {}

  create(){
    if(this.formCreateTask?.invalid) return
    let form_data = this.formCreateTask?.value
    this.Tasks.createOne(form_data).subscribe((new_task : Task) => {
      this.taskOut.emit(new_task)
      this.dialogRef.close()
    })
  }

  close() {
    this.dialogRef.close()
  }

}
