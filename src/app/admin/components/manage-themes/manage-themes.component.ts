import { Component, OnInit, OnDestroy } from '@angular/core';
import { Theme } from 'shared/models/theme';
import { Subscription } from 'rxjs';
import { ThemeService } from 'shared/services/theme.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-themes',
  templateUrl: './manage-themes.component.html',
  styleUrls: ['./manage-themes.component.css']
})
export class ManageThemesComponent implements OnInit, OnDestroy {
  themes: Theme[];
  themeSub: Subscription;
  selected: any[];
  selectedTheme: Theme;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'File' },
    { name: 'Active' }
  ];

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private sanitizer: DomSanitizer
    ) {
    }

  createTheme() {
    this.router.navigate(['/admin/themes/new']);
  }

  editTheme() {
    localStorage.setItem('returnUrl', '/admin/themes');
    this.router.navigate(['/admin/themes/' + this.selectedTheme.key]);
  }

  deleteTheme() {
    this.themeService.remove(this.selectedTheme.key);
  }

  onSelect({ selected }) {
    this.selectedTheme = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  currentTheme() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('/assets/styles/' + this.selectedTheme.file);
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.themes.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.themes;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {

    this.themeSub = this.themeService.getAll()
    .subscribe(cls => {
      this.themes = cls as Theme[];
      this.selected = [this.themes[0]];
      this.selectedTheme = this.themes[0];
    });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }

}

