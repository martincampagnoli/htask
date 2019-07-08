import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StarRatingComponent
      ],
      imports: [
        MaterialModule,
        HttpClientModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'htask'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Hexad Task');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Hexad Task!');
  });

  it(`should re-order array on rating changed`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let item = { rating: 2 };
    spyOn(app, 'filter');
    app.onRatingChanged(3, item);
    expect(app.filter).toHaveBeenCalled();
  });

  it(`should order array from highest rating to lowest`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.items = [{ title:"test1", rating: 1 }, { title:"test2", rating: 2 }, { title:"test3", rating: 3 }];
    app.filter()
    expect(app.items).toEqual([{ title:"test3", rating: 3 }, { title:"test2", rating: 2 }, { title:"test1", rating: 1 }] );
  });

  it(`should toggle random rating from false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.items = [{ title:"test1", rating: 1 }, { title:"test2", rating: 2 }, { title:"test3", rating: 3 }];
    app.rr = false;
    spyOn(app, 'startRandomRating');
    spyOn(app, 'stopRandomRating');
    app.toogleRandomRating()
    expect(app.startRandomRating).toHaveBeenCalled();
    expect(app.rr).toBeTruthy();
  });

  it(`should toggle random rating from true`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.items = [{ title:"test1", rating: 1 }, { title:"test2", rating: 2 }, { title:"test3", rating: 3 }];
    app.rr = true;
    spyOn(app, 'startRandomRating');
    spyOn(app, 'stopRandomRating');
    app.toogleRandomRating();
    expect(app.stopRandomRating).toHaveBeenCalled();
    expect(app.rr).toBeFalsy();
  });

  it(`should start random rating`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.items = [{ title:"test1", rating: 1 }, { title:"test2", rating: 2 }, { title:"test3", rating: 3 }];

    fixture.detectChanges();
    app.startRandomRating();
    expect(app.randomRatingString).toEqual(app.rrOff);
    expect(app.buttonColor).toEqual('warn');
    expect(app.subs).toBeDefined();
  });

  it(`should stop random rating`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.items = [{ title:"test1", rating: 1 }, { title:"test2", rating: 2 }, { title:"test3", rating: 3 }];
    fixture.detectChanges();
    app.startRandomRating();
    spyOn(app.subs, 'unsubscribe');

    app.stopRandomRating();
    expect(app.randomRatingString).toEqual(app.rrOn);
    expect(app.buttonColor).toEqual('primary');
    expect(app.subs.unsubscribe).toHaveBeenCalled();
  });


});
