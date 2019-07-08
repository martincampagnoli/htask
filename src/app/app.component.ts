import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Hexad Task';
  rrOn = 'Start';
  rrOff = 'Stop';
  rr = false;
  buttonColor = 'primary';
  randomRatingString = this.rrOn;
  items: any[] = [];
  subs: any;
  randomRating$: Observable<any>;

  constructor(private http: HttpClient){
  }

  ngOnInit() {

    this.randomRating$ = new Observable((subscriber) =>{
      let randomInterval = () => Math.floor(Math.random() * 500) + 1;
      const intervalId = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * this.items.length - 1) + 1;
        let randomValue = Math.floor(Math.random() * 5) + 1;
        subscriber.next({randomIndex, randomValue});
    }, randomInterval());
    return function unsubscribe() {
        clearInterval(intervalId);
      };
    });

    this.getItems();
  }

  onRatingChanged(rating: any, item: { rating: any; }){
    item.rating = rating;
    this.filter();
  }

  toogleRandomRating(){
    !this.rr ? this.startRandomRating() : this.stopRandomRating();
    this.rr = !this.rr;
  }

  private getItems(){
    let items$ = this.http.get('../assets/items.json');
    items$.subscribe(r => {this.items = r as []; this.filter()} );
  }

  private startRandomRating(){
    this.randomRatingString = this.rrOff;
    this.buttonColor = 'warn';
    this.subs = this.randomRating$.subscribe(r => this.onRatingChanged(r.randomValue, this.items[r.randomIndex]) );
  }

  private stopRandomRating(){
    this.randomRatingString = this.rrOn;
    this.buttonColor = 'primary';
    this.subs.unsubscribe();
  }

  private filter(){
    this.items.sort((a, b) => {
        if (a.rating < b.rating) return 1;
        else if (a.rating > b.rating) return -1;
        else return 0;
      });
  }
}
