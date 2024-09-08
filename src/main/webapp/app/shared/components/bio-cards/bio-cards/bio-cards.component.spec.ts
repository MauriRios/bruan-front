import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioCardsComponent } from './bio-cards.component';

describe('BioCardsComponent', () => {
  let component: BioCardsComponent;
  let fixture: ComponentFixture<BioCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
