import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaListsComponent } from './social-media-lists.component';

describe('SocialMediaListsComponent', () => {
  let component: SocialMediaListsComponent;
  let fixture: ComponentFixture<SocialMediaListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
