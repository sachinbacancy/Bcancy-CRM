import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { LeadsService } from "src/app/services/leads.service";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class LeadsInterceptor implements HttpInterceptor{
    constructor(private leadsService: LeadsService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        return this.leadsService.user
        .pipe(take(1), 
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReqeust = req.clone({
                    headers: new HttpHeaders().set('authentication-token', user.data.auth_token)
                });
                return next.handle(modifiedReqeust);
            })
        );
    }
}