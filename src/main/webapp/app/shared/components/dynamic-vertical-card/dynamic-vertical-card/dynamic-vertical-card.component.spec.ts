import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicVerticalCardComponent } from './dynamic-vertical-card.component';

describe('DynamicVerticalCardComponent', () => {
  let component: DynamicVerticalCardComponent;
  let fixture: ComponentFixture<DynamicVerticalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicVerticalCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicVerticalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
