import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'htask';
  rrOn = 'Start';
  rrOff = 'Stop';
  rr = false;
  randomRatingString = this.rrOn;
  items: any[] = [];
  subs: any;
  randomRating$: Observable<any>;


  constructor(private http: HttpClient){
  }

  ngOnInit() {
    this.randomRating$ = new Observable(function subscribe(subscriber, ) {
      let randomInterval = () => Math.floor(Math.random() * 1000) + 1;
      const intervalId = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * 9) + 0;
        let randomValue = Math.floor(Math.random() * 5) + 1;
        subscriber.next({randomIndex, randomValue});
    }, randomInterval());
    return function unsubscribe() {
        clearInterval(intervalId);
      };
    });
    let items$ = this.http.get('../assets/items.json');
    items$.subscribe(
                response => {
                        this.items = response as [];
                        this.items = this.items.map(x => ({ ...x, rating: 1 }));
                      });
  }

  onRatingChanged(rating, item){
    item.rating = rating;
    this._filter();
  }

  toogleRandomRating(){
    if (!this.rr) {
      this.randomRatingString = this.rrOff;
      this.subs = this.randomRating$.subscribe(r =>{
        this.onRatingChanged(r.randomValue, this.items[r.randomIndex]);
      })
    }
    else {
      this.randomRatingString = this.rrOn;
      this.subs.unsubscribe();
    }
    this.rr = !this.rr;
  }

  private _filter(){
    this.items.sort((a, b) => {
        if (a.rating < b.rating) return 1;
        else if (a.rating > b.rating) return -1;
        else return 0;
      });
  }


}
