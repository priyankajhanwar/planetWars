import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {
  count=[];
  // results={};
  baseUrl: string = 'https://swapi.co/api/planets/';
  queryUrl: string = '?search=';
  constructor(private http: Http) { }

  search(terms: Observable<string>,user) {
    return terms.debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => this.searchEntries(term,user));
  }


  searchEntries(term,user) {
    let start = new Date().getTime();
    this.count.push(start);
    console.log(this.count);
    let len =this.count.length;
    let timeDifference=parseInt(this.count[len-1])-parseInt(this.count[len-14]);
    if(user!=="Luke Skywalker" && (len>=15 && timeDifference<=30000)){
      let time=30000-timeDifference;
      console.log(time);
      var input = (<HTMLInputElement>document.getElementById("input"));
      console.log("time starts");
      input.disabled=true;
       console.log("disabled");
      let currentTime=new Date().getTime();
      for(let i=0;;i++){
        let currentTimeForLoop=new Date().getTime();
        if(currentTimeForLoop>currentTime+time){
          console.log(currentTime);
          console.log(currentTimeForLoop);
          break;
        }
        else{
          continue;
        }
      }
       console.log("time end");
       input.disabled=false;
     
      return this.getData(term);         
    }
    else{
      return this.getData(term);
    }
  } 

  sorting(array){
    for (let i = 0; i < array.length; i++){
      for (let j = i + 1; j < array.length; j++){  
        if (parseInt(array[i].population) > parseInt(array[j].population)){  
          let temp =  array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }    
    return array;
  }

  getPercentage(array){
    let percentPopulation: Array<any>=[]; 
    let len =array.length-1;
    for(let i = 0; i < array.length; i++){
      let value = (parseInt(array[i].population)/parseInt(array[len].population))*100;
      array[i].percent=value;
    }
    return array;
  }


  getData(term){
    return this.http
    .get(this.baseUrl + this.queryUrl + term)
    .map(res => res.json());
  }
}
