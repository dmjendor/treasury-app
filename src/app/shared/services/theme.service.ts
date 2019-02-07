import { Injectable, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Theme } from 'shared/models/theme';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {
  currentTheme: string;
  themes$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private zone: NgZone
    ) {
    this.themes$ = this.db.list('/themes', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Theme) {
    return this.db.list('/themes').push(obj);
  }

  update(themesID: string, obj: Theme) {
    return this.db.object('/themes/' + themesID).update(obj);
  }

  remove(themesID: string) {
    return this.db.object('/themes/' + themesID).remove();
  }

  getAll() {
    return this.themes$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(themesID: string) {
    return this.db.object('/themes/' + themesID);
  }

  setCurrentTheme(themeId) {
    if (!themeId) {
      themeId = '-LVdBVohyKBcruIzCxRX';
    }
    this.get(themeId)
      .valueChanges()
      .pipe(take(1))
      .subscribe(p => {
        const ct = p as Theme;
        this.zone.run(() => {
          this.currentTheme = '/assets/styles/' + ct.file;
          sessionStorage.setItem('currentTheme', this.currentTheme);
        });
    });
  }

  ngOnInit() {
    this.setCurrentTheme(null);
  }


}
