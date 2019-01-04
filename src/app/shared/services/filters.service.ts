import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  filters = {};
  filteredData = [];
  constructor() { }

  private applyFilters(source) {
    return _.filter(source, _.conforms(this.filters) );

    // this.filteredMonsters = _.filter(this.monsters, _.conforms(this.filters) );
  }

   /// filter property by equality to rule
   public filterExact(source: object, property: string, rule: any) {
    this.filters[property] = val => val === rule;
    return this.applyFilters(source);
  }

  /// filter  numbers greater than rule
  public filterGreaterThan(source: object, property: string, rule: number) {
    this.filters[property] = val => val > rule;
    return this.applyFilters(source);
  }

  /// filter  numbers greater than rule
  public filterGTE(source: object, property: string, rule: number) {
    this.filters[property] = val => val >= rule;
    return this.applyFilters(source);
  }

  // filter  numbers less than rule
  public filterLessThan(source: object, property: string, rule: number) {
    this.filters[property] = val => val < rule;
    return this.applyFilters(source);
  }

  public filterLTE(source: object, property: string, rule: number) {
    this.filters[property] = val => val <= rule;
    return this.applyFilters(source);
  }

  /// filter properties that resolve to true
  public filterBoolean(source: object, property: string, rule: boolean) {
    if (!rule) { this.removeFilter(source, property); } else {
      this.filters[property] = val => val;
      return this.applyFilters(source);
    }
  }

  /// removes filter
  public removeFilter(source: object, property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters(source);
  }
}
