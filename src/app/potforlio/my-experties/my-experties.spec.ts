import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExperties } from './my-experties';

describe('MyExperties', () => {
  let component: MyExperties;
  let fixture: ComponentFixture<MyExperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyExperties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyExperties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
