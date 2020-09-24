import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CocinerosPage } from './cocineros.page';

describe('CocinerosPage', () => {
  let component: CocinerosPage;
  let fixture: ComponentFixture<CocinerosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocinerosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CocinerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
