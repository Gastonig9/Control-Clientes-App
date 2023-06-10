import { CanActivate, Router } from "@angular/router";
import { ConfiguracionServicio } from "../servicios/configuracion.service";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable()
export class ConfiguracionGuard implements CanActivate {
    constructor(private router:Router, private configuracionService: ConfiguracionServicio){}

    canActivate(): Observable<boolean>{
        return this.configuracionService.getConfiguracion().pipe(
            map( configuracion => {
                if(configuracion.permitirRegistro) {
                    return true
                }else{
                    this.router.navigate(["/login"])
                    return false;
                }
            })
        )
    }
}