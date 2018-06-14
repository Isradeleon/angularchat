import { Component, OnInit } from '@angular/core';
import Chance from 'chance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  me: string;
  ngOnInit(){
    const chance = new Chance();
    localStorage.setItem("myid",''+(new Date()).getTime());
    this.me = chance.name();
    localStorage.setItem("myname",this.me);
  }
}
