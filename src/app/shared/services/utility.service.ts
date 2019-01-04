import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

 public toTitleCase(str) {
   if (typeof str === 'string') {
    const mod = str.replace(/(_)/g, ' '); // convert underscores to spaces
    return mod.replace( // campitalize the first letter after each space
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
   } else {
     return '';
   }

 }

  deepFreeze(object) {

    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object);

    // Freeze properties before freezing self

    for (const name of propNames) {
      const value = object[name];

      object[name] = value && typeof value === 'object' ?
        this.deepFreeze(value) : value;
    }

    return Object.freeze(object);
  }
}
