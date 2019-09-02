export class Produkt{
    Art: string;

    // ein Produkt kann in verschiedenne Groessen auftreten
    Groesse: string;

    // verschiedene Groessen haben verschiedene Preise
    Preis: string;
    
    Menge: string;

    Einkaufspreis: string;

    Nutzer: string;

    constructor(
        Art: string,
        Groesse: string,
        Preis: string,
        Menge: string,
        Einkaufspreis: string,
        Nutzer: string
        ) {}
}