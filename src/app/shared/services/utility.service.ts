import { Injectable } from '@angular/core';
import { DateTime } from 'shared/models/datetime';

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

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
  }

  isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
  }

  formatDate(obj: string, long: boolean) {
    const options = new DateTime();
    if (long) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    } else {
      delete options.hour;
      delete options.minute;
    }
    const date  = new Date(obj);
    return date.toLocaleDateString('en-US', options);
  }
}
