import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Theme } from 'shared/models/theme';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {
  currentTheme: Theme;
  themes$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
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
        this.currentTheme = p as Theme;
    });
  }

  ngOnInit() {
    this.setCurrentTheme(null);
  }


}
