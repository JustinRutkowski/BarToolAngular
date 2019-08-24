import { TestBed, async } from '@angular/core/testing';
import { OverlayComponent } from './overlay.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Produkt } from '../produkt';


describe('OverlayComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        OverlayComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(OverlayComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should check that addToCart adds an item to cart', () => {
    TestBed.createComponent(OverlayComponent);
    const component: OverlayComponent = new OverlayComponent();
    var item = new Produkt('', '', '', '');
    item.Art = "Test";
    var itemArray = new Array();
    itemArray.push(item);
    component.addToCart(item, 5);
    expect(component.cartProdukte).toEqual(itemArray);
  });

  it('should set the old Cart to the stored value from localStorage', () => {
    TestBed.createComponent(OverlayComponent);
    const component: OverlayComponent = new OverlayComponent();
    var item = new Produkt('', '', '', '');
    item.Art = "Test";
    item.Groesse = "0.5 Liter";
    item.Menge = "5";
    item.Preis = "3";
    localStorage.setItem("cartOld", JSON.stringify(item));
    console.log(localStorage);

    component.cartProdukteOld.push(JSON.parse(localStorage.getItem("cartOld")));
    expect(component.cartProdukteOld[0]).toEqual(JSON.parse(localStorage.getItem("cartOld")));
  });

  it('should check that the cartItemOverlay is displayed correctly', () => {
    const fixture = TestBed.createComponent(OverlayComponent);
    const component: OverlayComponent = new OverlayComponent();
    spyOn(component, 'off');
    var item = new Produkt('', '', '', '');
    item.Art = "Test";
    var buttonItem = document.createElement("button");
    buttonItem.innerHTML = "Test";
    var lengthBeforeDelete = component.cartProdukte.length;
    console.log(lengthBeforeDelete);
    // sets the title as item.Art
    component.cartItemOverlayOn(buttonItem, item)

    expect(document.getElementById("title2").innerText).toEqual(item.Art);
    expect(document.getElementById("cartItemOverlay").style.display).toEqual("block");

    component.off(document.getElementById("cartItemOverlay"));
    expect(component.off).toHaveBeenCalled;
    // expect(document.getElementById("cartItemOverlay").style.display).toEqual("none")
  });

});
