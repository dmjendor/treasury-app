import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { take } from 'rxjs/operators';
import { DefaultBag } from 'shared/models/defaultbag';
import { DefaultBagService } from 'shared/services/default-bag.service';

@Component({
  selector: 'bag-form',
  templateUrl: './bag-form.component.html',
  styleUrls: ['./bag-form.component.css']
})
export class BagFormComponent {
  id: string;
  bag = new DefaultBag();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private bagService: DefaultBagService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.bagService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.bag = p as DefaultBag;
        this.bag.key = this.id;
      });

    }
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save(bag) {
    if (this.id) {
      this.bagService.update(this.id, bag);
    } else {
      this.bagService.create(bag);
    }
    this.router.navigate(['/admin'],  {queryParams: {tab: 'bags'}});
  }

  cancel() {
    this.router.navigate(['/admin'],  {queryParams: {tab: 'bags'}});
  }

  delete() {
    if (confirm('Are you sure you wish to delete this bag?')) {
      this.bagService.remove(this.id);
      this.router.navigate(['/admin'],  {queryParams: {tab: 'bags'}});
    }
  }
}
