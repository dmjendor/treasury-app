import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { ThemeService } from 'shared/services/theme.service';
import { Theme } from 'shared/models/theme';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.css']
})
export class ThemeFormComponent {
  id: string;
  theme = new Theme();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private themeService: ThemeService
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
    this.router.navigate(['/admin/themes']);
  }

  cancel() {
    this.router.navigate(['/admin/themes']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this theme?')) {
      this.themeService.remove(this.id);
      this.router.navigate(['/admin/themes']);
    }
  }
}
