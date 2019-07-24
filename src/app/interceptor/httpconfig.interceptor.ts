import { Injectable } from '@angular/core';
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { tap } from "rxjs/operators";

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if(token){
            request = request.clone({ 
                headers: request.headers.set('Authorization', 'Bearer ' + token) 
            });
        }
        
        if(!request.headers.has('Content-Type')){
            request = request.clone({ 
                headers: request.headers.set('Content-Type', 'application/json') 
            });
        }
      
        request = request.clone({ 
            headers: request.headers.set('Accept', 'application/json') 
        });


        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {   
                console.log('event --->', event);
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
            
              const started = Date.now();            
              const elapsed = Date.now() - started;
              console.log(`Request for ${request.urlWithParams} failed after ${elapsed} ms.`);
             // debugger; 
            }
          }))
        // return next.handle(request).pipe(
        //     map((event: HttpEvent<any>) => {
        //         if(event instanceof HttpResponse){
        //             console.log('event --->', event);
        //             // this.errorDialogService.openDialog(event);
        //         }
        //         return event;
        //     },
        //     catchError((error: HttpErrorResponse) => {
        //         let data = {};
        //         data = {
        //             reason: error && error.error.reason ? error.error.reason : '',
        //             status: error.status
        //         };
        //         // this.errorDialogService.openDialog(data);
        //         return throwError(error);
        //     })
        //     ));

        
    }
}