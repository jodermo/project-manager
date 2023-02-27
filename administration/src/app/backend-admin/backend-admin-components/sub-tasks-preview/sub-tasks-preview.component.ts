import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgTaskEntity } from '../../../../../../angular-classes/angular-entities/ng.task.entity';
import { BackendAdminService } from '../../backend-admin.service';

@Component({
  selector: 'app-sub-tasks-preview',
  templateUrl: './sub-tasks-preview.component.html',
  styleUrls: ['./sub-tasks-preview.component.scss']
})
export class SubTasksPreviewComponent implements OnInit {
  @Input() task?: NgTaskEntity;

  subTasks?: NgTaskEntity[] = [];

  ready = false;

  @Output() clickSubTask = new EventEmitter<NgTaskEntity>();

  constructor(public adminService: BackendAdminService) {

  }

  ngOnInit(): void {
    if (this.task?.id) {
      this.subTasks = this.adminService.apiData['task'].filter((task: NgTaskEntity) => task.nextTask === this.task?.id);
    }
    this.ready = true;
  }

  subTaskClick(e: any, task: NgTaskEntity) {
    e.preventDefault();
    e.stopPropagation();
    console.log('subTaskClick', task);
    this.clickSubTask.emit(task);
  }
}
