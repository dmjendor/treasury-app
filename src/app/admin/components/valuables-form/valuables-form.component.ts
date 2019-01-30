import { Component, OnInit } from '@angular/core';
import { DefaultValuable } from 'shared/models/defaultvaluable';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { DefaultValuablesService } from 'admin/services/default-valuables.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'valuables-form',
  templateUrl: './valuables-form.component.html',
  styleUrls: ['./valuables-form.component.css']
})
export class ValuablesFormComponent implements OnInit {
  id: string;
  valuable = new DefaultValuable();
  valuablesSub: Subscription;
  valuables: DefaultValuable[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private valuableService: DefaultValuablesService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.valuableService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.valuable = p as DefaultValuable;
        this.valuable.key = this.id;
      });
    }
  }

  async ngOnInit() {
    this.valuablesSub = this.valuableService.getAll()
    .subscribe(cls => {
      this.valuables = cls as DefaultValuable[];
    });
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save(valuable) {
    if (this.id) {
      this.valuableService.update(this.id, valuable);
    } else {
      this.valuableService.create(valuable);
    }
    this.router.navigate(['/admin/valuables']);
  }

  cancel() {
    this.router.navigate(['/admin/valuables']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this valuable?')) {
      this.valuableService.remove(this.id);
      this.router.navigate(['/admin/valuables']);
    }
  }
}
