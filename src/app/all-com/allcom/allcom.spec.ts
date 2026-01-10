import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allcom } from './allcom';

describe('Allcom', () => {
  let component: Allcom;
  let fixture: ComponentFixture<Allcom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allcom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allcom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
