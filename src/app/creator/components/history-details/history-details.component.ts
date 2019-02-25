import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Differences } from 'shared/models/differences';
import { Vault } from 'shared/models/vault';
import { LoggingService } from 'shared/services/logging.service';
import { UtilityService } from 'shared/services/utility.service';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit {
  vault: Vault;
  history: Differences;

  constructor(
    public loggingService: LoggingService,
    public utilityService: UtilityService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  formatDate(date: string) {
    return this.utilityService.formatDate(date, true);
  }

  save() {

  }

  delete() {

  }

  cancel() {
    this.modal.close();
  }

}
