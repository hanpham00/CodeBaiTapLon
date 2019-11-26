import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  storage: Storage;

	constructor() {
		this.storage = window.localStorage;
 	}

 	setStudent(key:string,value:any) {
 		if(!value){
 			return;
 		}
 		this.storage[key] = JSON.stringify(value);
 	}

 	getValue<type>(key:string):type {
 		const obj = JSON.parse(this.storage[key] || null);
 		return <type>obj || null;
 	}
}