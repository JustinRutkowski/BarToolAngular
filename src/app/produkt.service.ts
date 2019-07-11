import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Produkt } from './produkt';

@Injectable({
  providedIn: 'root'
})

/**
 * Klasse für den aufruf der HTTP Requests
 */
export class ProduktService {
  baseUrl = 'http://localhost/BartoolAngular/';
  produkte: Produkt[];

  constructor(private http: HttpClient) { }

  /**
   * aufruf für SELECT * from Produtke
   */
  getAll(): Observable<Produkt[]> {
    return this.http.get(`${this.baseUrl}controller?cmd=1`).pipe(
      map((res) => {
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
