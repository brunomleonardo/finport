import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTickerComponent } from './add-new-ticker.component';

describe('AddNewTickerComponent', () => {
  let component: AddNewTickerComponent;
  let fixture: ComponentFixture<AddNewTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
