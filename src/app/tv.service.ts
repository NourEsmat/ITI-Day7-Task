import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  api : string  = 'decb7881a0c027bde425746ed1782d1f';
  allTvs : any[] = [];

  constructor(private http:HttpClient) { }

  getAllTVs (pageNumber:number=1,lang : string = 'en-US') :Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=${this.api}&language=${lang}&page=${pageNumber}`);
  }

  getTvByID(tvId:number) : Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${this.api}`);
  }

  searchTvs(tvName :string):Observable<any>{
    if (tvName == ''){
      return this.getAllTVs();
    } else {
      return this.http.get(`https://api.themoviedb.org/3/search/tv?api_key=${this.api}&query=${tvName}`)
    }
  }
}
