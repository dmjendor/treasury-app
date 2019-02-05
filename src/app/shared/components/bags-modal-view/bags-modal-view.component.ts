import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Vault } from 'shared/models/vault';
import { Bag } from 'shared/models/bag';

@Component({
  selector: 'bags-modal-view',
  templateUrl: './bags-modal-view.component.html',
  styleUrls: ['./bags-modal-view.component.css']
})
export class BagsModalViewComponent implements OnInit {
  vault: Vault;
  editBags: boolean = false;
  selectedBag: Bag;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log(this.vault);
  }

}
