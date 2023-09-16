import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from './../tv.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent implements OnInit {

  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  selectedTv :any;

  constructor(private route:ActivatedRoute ,private tvServis : TvService) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.tvServis.getTvByID(id).subscribe({
      next : (response) =>{
        console.log(response);
        this.selectedTv = response;
      }
    })
  }

}
