import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCowPage } from './update-cow.page';

describe('UpdateCowPage', () => {
  let component: UpdateCowPage;
  let fixture: ComponentFixture<UpdateCowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
