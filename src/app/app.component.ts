import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'htask';
  items: any[] = [];

  constructor(private http: HttpClient){

  }

  ngOnInit() {
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

  private _filter(){
    this.items.sort((a, b) => {
        if (a.rating < b.rating) return 1;
        else if (a.rating > b.rating) return -1;
        else return 0;
      });
    }
}
