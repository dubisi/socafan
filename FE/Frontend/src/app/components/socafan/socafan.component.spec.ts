import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocafanComponent } from './socafan.component';

describe('SocafanComponent', () => {
  let component: SocafanComponent;
  let fixture: ComponentFixture<SocafanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocafanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocafanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
