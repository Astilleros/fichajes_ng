import { Component, OnInit } from '@angular/core';
import { WorkersService } from '../shared/workers.service';
import { Worker } from '../shared/worker.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WorkerCreateComponent } from '../worker-create/worker-create.component';
import { WorkersIdComponent } from '../worker-edit/worker-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-socs-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class WorkerListComponent implements OnInit {
  constructor(
    private Dialogs: MatDialog,
    private workersService: WorkersService,
    private Clipboard: Clipboard
  ) {}

  now = new Date();
  workers = new MatTableDataSource<Worker>();

  columnsToDisplay = ['status', 'name', 'mobile', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  createWorkerModal?: MatDialogRef<WorkerCreateComponent>;
  openCreateDialog() {
    this.createWorkerModal = this.Dialogs.open(WorkerCreateComponent, {});
    this.createWorkerModal.componentInstance.workerOut.subscribe(
      (worker: Worker) => (this.workers.data = [...this.workers.data, worker])
    );
  }

  editWorkerModal?: MatDialogRef<WorkersIdComponent>;
  openEditDialog(worker: Worker) {
    this.editWorkerModal = this.Dialogs.open(WorkersIdComponent, {
      data: worker,
    });
    this.editWorkerModal.componentInstance.workerOut.subscribe(
      (worker: Worker) => {
        this.workers.data = this.workers.data.map((wli: Worker) =>
          wli._id != worker._id
            ? wli
            : {
                ...wli,
                ...worker,
              }
        );
      }
    );
  }

  ngOnInit(): void {
    this.workersService
      .getAll()
      .subscribe((response: Worker[]) => (this.workers.data = response));
  }

  async deleteWorker(worker: Worker): Promise<void> {
    let deleted = await firstValueFrom<Worker>(
      this.workersService.deleteOne(worker._id)
    );
    console.log(deleted);
    if (!deleted) return;
    this.workers.data = this.workers.data.filter(
      (wli: Worker) => wli._id != deleted._id
    );
  }

  async shareCalendar(worker: Worker): Promise<void> {
    const updated = await firstValueFrom<Worker>(
      this.workersService.shareCalendar(worker._id)
    );
    if (!updated) return;
    this.workers.data = this.workers.data.map((wli: Worker) =>
      wli._id != updated._id
        ? wli
        : {
            ...wli,
            ...updated,
          }
    );
  }

  copyCalendarUrlToClipboard(worker: Worker) {
    this.Clipboard.copy(`https://calendar.google.com/calendar/u/0/r?cid=${worker.calendar}`)
  }

  async unshareCalendar(worker: Worker): Promise<void> {
    const updated = await firstValueFrom<Worker>(
      this.workersService.unshareCalendar(worker._id)
    );
    if (!updated) return;
    this.workers.data = this.workers.data.map((wli: Worker) =>
      wli._id != updated._id
        ? wli
        : {
            ...wli,
            ...updated,
          }
    );
  }

  async dowloadPdf(worker: Worker) {
    let pdf_data = await firstValueFrom(this.workersService.downloadPdf(worker._id, '2022-11-01', '2022-11-30T23:59:59.000Z'));
    const imageName = 'name.pdf';
    let pdf_file = new File([pdf_data], imageName, { type: 'application/pdf' });
    
    const fileURL = URL.createObjectURL(pdf_file);
    console.log(fileURL);
    
    window.open(fileURL, '_blank');
  }
}
