import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { workerModes } from '../shared/mode.enum';
import { Worker } from '../shared/worker.model';
import { WorkersService } from '../shared/workers.service';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.css'],
})
export class WorkersIdComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<WorkersIdComponent>,
    private WorkersService: WorkersService,
    private FB: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Worker
  ) {}

  worker: any;
  @Output() workerOut = new EventEmitter<Worker>();

  modes = Object.keys(workerModes).filter((v) => !isNaN(Number(v))).map((value: string) => ({ value: Number(value), key: workerModes[ Number(value)] }));

  formEditWorker: FormGroup = this.FB.group({
    name: this.FB.control('', [Validators.required]),
    dni: this.FB.control('', [Validators.required]),
    seguridad_social: this.FB.control(''),
    email: this.FB.control('', [Validators.required]),
    mobile: this.FB.control('', [Validators.required]),
    status: this.FB.control('', [Validators.required]),
    mode: this.FB.control('', [Validators.required]),
  });

  ngOnInit(): void {
    this.worker = this.data;
    
    let value = Object.keys(this.formEditWorker.value).reduce(
      (acc: any, key: string) => ({ ...acc, ...{ [key]: this.worker[key] } }),
      {}
    );
    this.formEditWorker.patchValue(value);
    this.formEditWorker.valueChanges.subscribe(this.onChange);
  }

  onChange = (worker: Worker) => {
    if (this.formEditWorker?.invalid) return;
    if (this.worker) {
      this.WorkersService.updateOne(this.worker._id, {
        ...this.worker,
        ...worker,
      }).subscribe((worker: Worker) => {
        this.worker = worker
        console.log(worker);
      });
    }

  };

  close() {
    this.workerOut.emit(this.worker);
    this.dialogRef.close();
  }
}
