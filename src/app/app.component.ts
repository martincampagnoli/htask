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
  starCount: 5;
  filteredOptions: Observable<any[]>;

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
    console.dir("need to reorder")
    item.rating = rating;
  }


}
