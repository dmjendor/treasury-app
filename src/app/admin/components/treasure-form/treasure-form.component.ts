import { Component, OnInit } from '@angular/core';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { DefaultTreasureService } from 'shared/services/default-treasure.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'treasure-form',
  templateUrl: './treasure-form.component.html',
  styleUrls: ['./treasure-form.component.css']
})
export class TreasureFormComponent implements OnInit {
  id: string;
  treasure = new DefaultTreasure();
  treasuresSub: Subscription;
  treasures: DefaultTreasure[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private treasureService: DefaultTreasureService
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
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save(treasure) {
    if (this.id) {
      this.treasureService.update(this.id, treasure);
    } else {
      this.treasureService.create(treasure);
    }
    this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
  }

  cancel() {
    this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
  }

  delete() {
    if (confirm('Are you sure you wish to delete this treasure?')) {
      this.treasureService.remove(this.id);
      this.router.navigate(['/admin'],  {queryParams: {tab: 'treasures'}});
    }
  }
}
