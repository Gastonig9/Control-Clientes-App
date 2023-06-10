import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs";

@Injectable()
export class LoginService {
    constructor(private authService: AngularFireAuth) {}
    

    loginApp(email:string, password:string) {
        return new Promise((resolve, reject) => {
            this.authService.signInWithEmailAndPassword(email, password)
            .then(response => resolve(response),
                  error => reject(error))
        })
    }

    logoutApp() {
        this.authService.signOut()
    }

    registerApp(email:string, password:string) {
        return new Promise((resolve, reject) => {
            this.authService.createUserWithEmailAndPassword(email, password)
            .then(response => resolve(response),
                  error => reject(error))
        })
    }

    getAuth() {
        return this.authService.authState.pipe(
            map( auth => auth )
        )
    }
}