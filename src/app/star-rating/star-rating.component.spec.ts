import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingComponent } from './star-rating.component';
import { MaterialModule } from '../material-module';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarRatingComponent ],
      imports:  [MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return star_border as icon ', () => {
    component.rating = 2;
    let icon = component.showIcon(3);
    expect(icon).toEqual('star_border');
  });

  it('should return star as icon ', () => {
    component.rating = 3;
    let icon = component.showIcon(2);
    expect(icon).toEqual('star');
  });

  it('should load an array with same amount of ids as starCount number', () => {
    component.starCount = 3;
    component.ngOnInit();
    expect(component.ratingArr.length).toEqual(component.starCount);
  });

  it('should send an emit with the rating on star click event', () => {
    spyOn(component.ratingUpdated, 'emit');
    component.onClick(2);
    expect(component.ratingUpdated.emit).toHaveBeenCalledWith(2);
  });

});
