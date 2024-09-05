import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocafanPlayComponent } from './socafan-play.component';

describe('SocafanPlayComponent', () => {
  let component: SocafanPlayComponent;
  let fixture: ComponentFixture<SocafanPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocafanPlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocafanPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
