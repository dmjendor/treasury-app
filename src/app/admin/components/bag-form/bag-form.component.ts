import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DefaultBag } from 'shared/models/defaultbag';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { DefaultBagService } from 'shared/services/default-bag.service';
import { UtilityService } from 'shared/services/utility.service';

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
    private bagService: DefaultBagService,
    private confirmationDialogService: ConfirmationDialogService
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
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the bag ' + this.bag.name + '?  This action cannot be undone.';
    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.bagService.remove(this.id);
        this.router.navigate(['/admin'],  {queryParams: {tab: 'bags'}});
      }
    })
    .catch(() => {

    });
  }
}
