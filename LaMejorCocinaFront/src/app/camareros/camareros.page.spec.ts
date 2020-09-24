import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CamarerosPage } from './camareros.page';

describe('CamarerosPage', () => {
  let component: CamarerosPage;
  let fixture: ComponentFixture<CamarerosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamarerosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamarerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
