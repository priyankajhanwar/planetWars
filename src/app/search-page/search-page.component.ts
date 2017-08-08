import { Component} from '@angular/core';
import { SearchService } from '../search.service';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  providers: [SearchService]
})
export class SearchPageComponent {


  fontSize :"20px";
  results: Object;
  searchTerm$ = new Subject<string>();


  constructor(private searchService: SearchService,
    private activatedRoute: ActivatedRoute ) {
    let params: any = this.activatedRoute.snapshot.params;
    this.searchService.search(this.searchTerm$,params.user)
    .subscribe(data => {
      this.results = this.searchService.getPercentage(this.searchService.sorting(data.results));
    });
  }



  // getFont(j){
    //   let len =Object.keys(this.results).length;
    //   for(let i=0;i< len;i++){
      //     if(this.results[i].population==="unknown"){
        //         this.results[i].percent=1;
        //     }
        //            this.fontSize[i]=this.results[i].percent+"px";
        //     }
        //       return this.fontSize[j];
        // }
  }