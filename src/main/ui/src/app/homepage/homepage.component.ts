import { Component, OnInit } from '@angular/core';
import { ForcastService } from '../data-api/forcast.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  temp: number;

  constructor(private forcastService: ForcastService){
  }

  ngOnInit(){
    this.forcastService.LoadCurrentWeather().subscribe((data)=>{
      console.log(data);
      this.temp=Math.trunc(data.main.temp);
    })
  }
}
