import { Component, OnInit } from '@angular/core';
import { Edition } from 'shared/models/edition';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { EditionService } from 'shared/services/edition.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'edition-form',
  templateUrl: './edition-form.component.html',
  styleUrls: ['./edition-form.component.css']
})
export class EditionFormComponent {
  id: string;
  edition = new Edition();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private editionService: EditionService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.editionService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.edition = p as Edition;
        this.edition.key = this.id;
      });

    }
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save(edition) {
    if (this.id) {
      this.editionService.update(this.id, edition);
    } else {
      this.editionService.create(edition);
    }
    this.router.navigate(['/admin'],  {queryParams: {tab: 'editions'}});
  }

  cancel() {
    this.router.navigate(['/admin'],  {queryParams: {tab: 'editions'}});
  }

  delete() {
    if (confirm('Are you sure you wish to delete this edition?')) {
      this.editionService.remove(this.id);
      this.router.navigate(['/admin'],  {queryParams: {tab: 'editions'}});
    }
  }
}
