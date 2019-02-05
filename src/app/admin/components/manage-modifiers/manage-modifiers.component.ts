import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { Subscription } from 'rxjs';
import { DefaultTreasureService } from 'shared/services/default-treasure.service';
import { Router } from '@angular/router';
import { Modifier } from 'shared/models/modifier';
import { ModifierService } from 'shared/services/modifier.service';

@Component({
  selector: 'manage-modifiers',
  templateUrl: './manage-modifiers.component.html',
  styleUrls: ['./manage-modifiers.component.css']
})
export class ManageModifiersComponent implements OnInit, OnDestroy {
  modifiers: Modifier[];
  modifiersSub: Subscription;
  selectedModifier: Modifier;
  treasureSub: Subscription;
  treasures: DefaultTreasure[];
  selected: any;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Value'},
    { name: 'Parent' },
    { name: 'Active' }
  ];

  constructor(
    private treasureService: DefaultTreasureService,
    private modifierService: ModifierService,
    private router: Router
    ) {
    }

  createModifier() {
    this.router.navigate(['/admin/modifiers/new']);
  }

  getParentName(key: string) {
    if (this.treasures && key) {
      const val = this.treasures.find(vl => vl.key === key);
      return val.name;
    }
  }

  editModifier() {
    localStorage.setItem('returnUrl', '/admin/modifiers');
    this.router.navigate(['/admin/modifiers/' + this.selectedModifier.key]);
  }

  deleteModifier() {
    this.modifierService.remove(this.selectedModifier.key);
  }

  onSelect({ selected }) {
    this.selectedModifier = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
    // const filteredProducts = (query) ? ;
      // this.modifiers.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      // this.modifiers;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {
    this.modifiersSub = this.modifierService.getAll()
    .subscribe(cls => {
      this.modifiers = cls as Modifier[];
      this.selected = [this.modifiers[0]];
      this.selectedModifier = this.modifiers[0];
    });

    this.treasureSub = this.treasureService.getAll()
    .subscribe(ts => {
      this.treasures = ts as DefaultTreasure[];
    });
  }

  ngOnDestroy() {
     this.modifiersSub.unsubscribe();
     this.treasureSub.unsubscribe();
  }
}

