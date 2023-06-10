import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.services';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggin:boolean = false;
  loginUser:string | null;
  permitirRegistro:boolean;

  constructor(private loginService: LoginService, private router: Router, private configuracionService: ConfiguracionServicio){}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if(auth) {
        this.isLoggin = true
        this.loginUser = auth.email
      }else{
        this.isLoggin = false
      }
    })

    this.configuracionService.getConfiguracion().subscribe( configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro as boolean;
    }
    )
  }

  logout() {
    this.loginService.logoutApp()
    this.isLoggin = false
    this.router.navigate(["/login"])
  }

}
