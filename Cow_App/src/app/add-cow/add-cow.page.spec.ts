import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCowPage } from './add-cow.page';

describe('AddCowPage', () => {
  let component: AddCowPage;
  let fixture: ComponentFixture<AddCowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
