import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Produkt } from './produkt';
import { Bestellung } from './bestellung';
import { environment } from '../environments/environment'
import { Bill } from './cart/bill';
import { Relation } from './cart/relation';

@Injectable({
  providedIn: 'root'
})

/**
 * Klasse für den aufruf der HTTP Requests
 */
export class ProduktService {
  baseUrl = "./"
  // baseUrl = 'http://192.168.178.30:80/BarToolAngular/';
  // baseUrl = 'http://localhost/BarToolAngular/'
  produkt: Produkt;
  bill: Bill;
  produkte: Produkt[];
  produkte2: Produkt[];

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param message 
   */
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  /**
   * get all products from the products table
   */
  getAll(): Observable<Produkt[]> {
    return this.http.get(`${this.baseUrl}controller.php?cmd=1`).pipe(
      map((res) => {
        this.produkte = res['data'];
        return this.produkte;
      }),
      catchError(this.handleError));
  }

  /**
 * aufruf für SELECT * from Produtke
 */
  getMenge(produkt: Produkt): Observable<Produkt[]> {
    return this.http.post(`${this.baseUrl}controller.php?cmd=2`, { data: produkt }).pipe(
      map((res) => {
        this.produkte2 = res['data'];
        return this.produkte2;
      }),
      catchError(this.handleError));
  }

  /**
 * aufruf für SELECT * from Produtke
 */
  getZuordnung(): Observable<Produkt[]> {
    return this.http.get(`${this.baseUrl}controller?cmd=3`).pipe(
      map((res) => {
        this.produkte = res['data'];
        return this.produkte;
      }),
      catchError(this.handleError));
  }

  delete(item: Produkt): Observable<Produkt[]> {
    return this.http.post(`${this.baseUrl}/controller.php?cmd=4`, { data: item })
      .pipe(map((res) => {
        this.produkte = res['data'];
        return this.produkte;
      }),
        catchError(this.handleError));
  }

  add(item: Produkt): Observable<Produkt[]> {

    return this.http.post(`${this.baseUrl}/controller.php?cmd=5`, { data: item })
      .pipe(map((res) => {
        this.produkte = res['data'];
        return this.produkte;
      }),
        catchError(this.handleError));
  }

  order(bill: Bill): Observable<Produkt[]> {
    return this.http.post(`${this.baseUrl}/controller.php?cmd=6`, { data: bill })
      .pipe(map((res) => {
        this.produkte = res['data'];
        return this.produkte;
      }),
        catchError(this.handleError));
  }

  getBill(bill: Bill): Observable<string> {
    return this.http.post(`${this.baseUrl}/controller.php?cmd=7`, { data: bill })
      .pipe(map((res) => {

        return res['data'];
      }),
        catchError(this.handleError));
  }

  getProdukt(produkt: Produkt): Observable<string> {
    console.log(produkt);

    return this.http.post(`${this.baseUrl}/controller.php?cmd=8`, { data: produkt })
      .pipe(map((res) => {
        console.log(res);

        return res['data'];
      }),
        catchError(this.handleError));
  }

  relateOrderAndProduct(relation: Relation): Observable<string> {
    return this.http.post(`${this.baseUrl}/controller.php?cmd=9`, { data: relation })
      .pipe(map((res) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  deleteEntries(login) {

    return this.http.post(`${this.baseUrl}/controller.php?cmd=10`, { login })
      .pipe(map((res) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }


  /**
   * Anzeige des Fehlers
   * @param error 
   */
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
