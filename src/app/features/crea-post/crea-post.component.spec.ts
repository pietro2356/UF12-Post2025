import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaPostComponent } from './crea-post.component';

describe('CreaPostComponent', () => {
  let component: CreaPostComponent;
  let fixture: ComponentFixture<CreaPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
