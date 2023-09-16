import { Component, OnInit } from '@angular/core';
import { TvService } from '../tv.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  allTvs: any[] = [];
  allData : any[] = [];
  lang : string = 'en-US';
  currentPage: number = 1;

  totalTvs! : number;
  numberppage: number = 20;


  private searchVal :string = '';
  set searchValue (value:string){
    this.searchVal = value;
    this.searchTvs(value);
  }

  constructor(private tvServis : TvService){}
  
  ngOnInit(): void {
    this.tvServis.getAllTVs().subscribe({
      next : (response) => {
        console.log(response);
        this.allTvs = response.results;
        this.allData = this.allTvs;
        this.totalTvs = response.total_results;
      }
    })
  }

  searchTvs(tvName :string) {
    this.tvServis.searchTvs(tvName).subscribe({
      next : (response) => {
        this.allTvs = response.results;
        this.allData = this.allTvs;
      }
    })
  }

  changeLanguage(){
    this.lang = this.lang == 'en-US' ? 'ar-AS' : 'en-US';
    this.tvServis.getAllTVs(this.currentPage,this.lang).subscribe({
      next : (response) =>{
        this.allTvs = response.results;
        this.allData = this.allTvs;
      }
    })
  }

  changePage(pageData:PageEvent){
    this.currentPage = pageData.pageIndex +1;
    this.tvServis.getAllTVs(this.currentPage,this.lang).subscribe({
      next : (response) =>{
        this.allTvs = response.results;
        this.allData = this.allTvs;
      }
    })
  }

}
