import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemsCompraComponent } from './itemsCompra.component';
import { ItemsCompraService } from '@itemsCompra/shared/service/itemsCompra.service';
import { HttpService } from '@core/services/http.service';

describe('ItemsCompraComponent', () => {
/*   let component: ItemsCompraComponent;
 */  let fixture: ComponentFixture<ItemsCompraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsCompraComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ItemsCompraService, HttpService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCompraComponent);
/*     component = fixture.componentInstance;
 */    fixture.detectChanges();
  });

/*   it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
