import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Worker } from '../shared/worker.model';
import { WorkersService } from '../shared/workers.service';

@Component({
  selector: 'app-worker-create',
  templateUrl: './worker-create.component.html',
  styleUrls: ['./worker-create.component.css']
})
export class WorkerCreateComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<WorkerCreateComponent>,
    private Workers : WorkersService,
    private FB : FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Worker
  ){}

  @Output() workerOut = new EventEmitter<Worker>()

  formCreateWorker : FormGroup = this.FB.group({
    name: this.FB.control('', [Validators.required]),
    dni: this.FB.control('', [Validators.required]),
    seguridad_social: this.FB.control('', [Validators.required]),
    mobile: this.FB.control('', [Validators.required]),
    email: this.FB.control('', [Validators.required]),
  })
  
  ngOnInit(): void {}

  create(){
    if(this.formCreateWorker?.invalid) return
    let form_data = this.formCreateWorker?.value
    this.Workers.createOne(form_data).subscribe((new_worker : Worker) => {
      this.workerOut.emit(new_worker)
      this.dialogRef.close()
    })
  }

  close() {
    this.dialogRef.close()
  }

}
