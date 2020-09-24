import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReporteCamarerosPage } from './reporte-camareros.page';

describe('ReporteCamarerosPage', () => {
  let component: ReporteCamarerosPage;
  let fixture: ComponentFixture<ReporteCamarerosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCamarerosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteCamarerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
