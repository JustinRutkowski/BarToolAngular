import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Produkt } from './produkt';
import { Bestellung } from './bestellung';
import { environment }  from '../environments/environment'

@Injectable({
  providedIn: 'root'
})

/**
 * Klasse für den aufruf der HTTP Requests
 */
export class ProduktService {
  baseUrl = "./"

  // baseUrl = 'http://localhost:80/BarToolAngular/';
  produkt: Produkt;
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
