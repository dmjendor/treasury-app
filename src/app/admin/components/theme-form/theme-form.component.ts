import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { ThemeService } from 'shared/services/theme.service';
import { Theme } from 'shared/models/theme';
import { take } from 'rxjs/operators';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';

@Component({
  selector: 'theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.css']
})
export class ThemeFormComponent {
  id: string;
  theme = new Theme();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private themeService: ThemeService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.themeService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.theme = p as Theme;
        this.theme.key = this.id;
      });

    }
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save(theme) {
    if (this.id) {
      this.themeService.update(this.id, theme);
    } else {
      this.themeService.create(theme);
    }
    this.router.navigate(['/admin'],  {queryParams: {tab: 'themes'}});
  }

  cancel() {
    this.router.navigate(['/admin'],  {queryParams: {tab: 'themes'}});
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the theme ' + this.theme.name + '?  This action cannot be undone.';
    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.themeService.remove(this.id);
        this.router.navigate(['/admin'],  {queryParams: {tab: 'themes'}});
      }
    })
    .catch(() => {

    });
  }
}
