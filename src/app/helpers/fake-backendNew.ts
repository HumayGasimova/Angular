import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
   
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        // let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                // let filteredUsers = users.filter(user => {
                //     return user.username === request.body.username && user.password === request.body.password;
                // });
                let body = JSON.parse(request.body);


                if (body.email === 'mosh@domain.com' && body.password === '1234') {
                    // if login details are valid return 200 OK with user details and fake jwt token

                    return of(new HttpResponse({ status: 200, body: { token: token }}));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // // get users
            // if (request.url.endsWith('/users') && request.method === 'GET') {
            //     // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         return of(new HttpResponse({ status: 200, body: users }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError({ error: { message: 'Unauthorised' } });
            //     }
            // }

            // // get user by id
            // if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            //     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         // find user by id in users array
            //         let urlParts = request.url.split('/');
            //         let id = parseInt(urlParts[urlParts.length - 1]);
            //         let matchedUsers = users.filter(user => { return user.id === id; });
            //         let user = matchedUsers.length ? matchedUsers[0] : null;

            //         return of(new HttpResponse({ status: 200, body: user }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError({ error: { message: 'Unauthorised' } });
            //     }
            // }

            // // register user
            // if (request.url.endsWith('/users/register') && request.method === 'POST') {
            //     // get new user object from post body
            //     let newUser = request.body;

            //     // validation
            //     let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
            //     if (duplicateUser) {
            //         return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
            //     }

            //     // save new user
            //     newUser.id = users.length + 1;
            //     users.push(newUser);
            //     localStorage.setItem('users', JSON.stringify(users));

            //     // respond 200 OK
            //     return of(new HttpResponse({ status: 200 }));
            // }

            // // delete user
            // if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
            //     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         // find user by id in users array
            //         let urlParts = request.url.split('/');
            //         let id = parseInt(urlParts[urlParts.length - 1]);
            //         for (let i = 0; i < users.length; i++) {
            //             let user = users[i];
            //             if (user.id === id) {
            //                 // delete user
            //                 users.splice(i, 1);
            //                 localStorage.setItem('users', JSON.stringify(users));
            //                 break;
            //             }
            //         }

            //         // respond 200 OK
            //         return of(new HttpResponse({ status: 200 }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError({ error: { message: 'Unauthorised' } });
            //     }
            // }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};