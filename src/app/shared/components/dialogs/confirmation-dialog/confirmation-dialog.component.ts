import { Component, OnInit } from '@angular/core';
import { ModalService } from 'shared/services/modal.service';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

}
