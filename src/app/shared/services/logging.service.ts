import { Injectable } from '@angular/core';
import { Differences } from 'shared/models/differences';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

    constructor() { }

  directLog(source, id: string) {
    console.log(source, id);
  }

  logChanges(source: string, newVal: any, oldVal: any) {
    console.log(oldVal.quantity,newVal.quantity)
    const result = this.deepDiffMapper().map(oldVal, newVal);
    // remove unchanged results.
    // for(let key in result.changes){

    //     if(!required.includes(key)){
    //         if(result.changes[key].type === 'unchanged'){
    //             delete result.changes[key];
    //         }
    //     }
        
    // }
    console.log(result);
    switch (source) {
      case 'treasure':
      break;
      case 'valuables':
      break;
      case 'bags':
      break;
      case 'defaulttreasures':
      break;
      case 'defaultvaluables':
      break;
      case 'defaultbags':
      break;
    }
  }

  deepDiffMapper() {
    return {
        VALUE_CREATED: 'created',
        VALUE_UPDATED: 'updated',
        VALUE_DELETED: 'deleted',
        VALUE_UNCHANGED: 'unchanged',
        map: function(obj1, obj2) {
            if (this.isFunction(obj1) || this.isFunction(obj2)) {
                throw new Error('Invalid argument. Function given, object expected.');
            }
            if (this.isValue(obj1) || this.isValue(obj2)) {
                return {
                    type: this.compareValues(obj1, obj2),
                    newValue: (obj1 === undefined) ? obj2 : obj1,
                    oldValue: (obj2 === undefined) ? obj1 : obj2
                };
            }

            const diff = new Differences();
            diff.key = obj1.key;
            diff.vault = obj1.vault;
            diff.changeby = obj1.changeby;
            diff.timestamp = Date.now();

            for (const key in obj1) {
                if (this.isFunction(obj1[key])) {
                    continue;
                }

                let value2;
                if ('undefined' !== typeof(obj2[key])) {
                    value2 = obj2[key];
                }

                diff.changes[key] = this.map(obj1[key], value2);
            }
            for (const key in obj2) {
                if (this.isFunction(obj2[key]) || ('undefined' !== typeof(diff[key]))) {
                    continue;
                }

                diff.changes[key] = this.map(undefined, obj2[key]);
            }

            return diff;

        },
        compareValues: function(value1, value2) {
            if (value1 === value2) {
                return this.VALUE_UNCHANGED;
            }
            if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
                return this.VALUE_UNCHANGED;
            }
            if ('undefined' === typeof(value1)) {
                return this.VALUE_CREATED;
            }
            if ('undefined' === typeof(value2)) {
                return this.VALUE_DELETED;
            }

            return this.VALUE_UPDATED;
        },
        isFunction: function(obj) {
            return {}.toString.apply(obj) === '[object Function]';
        },
        isArray: function(obj) {
            return {}.toString.apply(obj) === '[object Array]';
        },
        isDate: function(obj) {
            return {}.toString.apply(obj) === '[object Date]';
        },
        isObject: function(obj) {
            return {}.toString.apply(obj) === '[object Object]';
        },
        isValue: function(obj) {
            return !this.isObject(obj) && !this.isArray(obj);
        }
    };
  }



}
