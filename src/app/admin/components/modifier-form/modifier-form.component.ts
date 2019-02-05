import { Component, OnInit } from '@angular/core';
import { Modifier } from 'shared/models/modifier';
import { Subscription } from 'rxjs';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { Edition } from 'shared/models/edition';
import { ActivatedRoute, Router } from '@angular/router';
import { EditionService } from 'shared/services/edition.service';
import { UtilityService } from 'shared/services/utility.service';
import { DefaultTreasureService } from 'shared/services/default-treasure.service';
import { take } from 'rxjs/operators';
import { ModifierService } from 'shared/services/modifier.service';

@Component({
  selector: 'app-modifier-form',
  templateUrl: './modifier-form.component.html',
  styleUrls: ['./modifier-form.component.css']
})
export class ModifierFormComponent implements OnInit {
  id: string;
  modifier = new Modifier();
  treasuresSub: Subscription;
  treasures: DefaultTreasure[];
  editionSub: Subscription;
  editions: Edition[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private editionService: EditionService,
    private utilityService: UtilityService,
    private modifierService: ModifierService,
    private treasureService: DefaultTreasureService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.modifierService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.modifier = p as Modifier;
        this.modifier.key = this.id;
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

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save(treasure) {
    if (this.id) {
      this.modifierService.update(this.id, treasure);
    } else {
      this.modifierService.create(treasure);
    }
    this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
  }

  cancel() {
    this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
  }

  delete() {
    if (confirm('Are you sure you wish to delete this modifier?')) {
      this.modifierService.remove(this.id);
      this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
    }
  }
}
