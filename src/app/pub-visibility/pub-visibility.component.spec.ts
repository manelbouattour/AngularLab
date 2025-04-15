import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubVisibilityComponent } from './pub-visibility.component';

describe('PubVisibilityComponent', () => {
  let component: PubVisibilityComponent;
  let fixture: ComponentFixture<PubVisibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubVisibilityComponent]
    });
    fixture = TestBed.createComponent(PubVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
