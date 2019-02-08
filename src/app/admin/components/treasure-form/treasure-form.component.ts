import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { DefaultTreasureService } from 'shared/services/default-treasure.service';
import { take } from 'rxjs/operators';
import { Edition } from 'shared/models/edition';
import { EditionService } from 'shared/services/edition.service';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';

@Component({
  selector: 'treasure-form',
  templateUrl: './treasure-form.component.html',
  styleUrls: ['./treasure-form.component.css']
})
export class TreasureFormComponent implements OnInit, OnDestroy {
  id: string;
  treasure = new DefaultTreasure();
  treasuresSub: Subscription;
  treasures: DefaultTreasure[];
  editionSub: Subscription;
  editions: Edition[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editionService: EditionService,
    private utilityService: UtilityService,
    private treasureService: DefaultTreasureService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.treasureService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.treasure = p as DefaultTreasure;
        this.treasure.key = this.id;
      });
    }
  }

  async ngOnInit() {
    this.treasuresSub = this.treasureService.getAll()
    .subscribe(cls => {
      this.treasures = cls as DefaultTreasure[];
    });

    this.editionSub = this.editionService.getAll()
    .subscribe(eds => {
      this.editions = eds as Edition[];
    });
  }

  ngOnDestroy() {
    this.treasuresSub.unsubscribe();
    this.editionSub.unsubscribe();
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save(treasure) {
    if (this.id) {
      this.treasureService.update(this.treasure.key, treasure);
    } else {
      this.treasureService.create(treasure);
    }
    this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
  }

  cancel() {
    this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the treasure ' + this.treasure.name + '?  This action cannot be undone.';
    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.treasureService.remove(this.id);
        this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
      }
    })
    .catch(() => {

    });
  }
}
