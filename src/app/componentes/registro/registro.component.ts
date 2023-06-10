import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.services';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email:string;
  password:string;

  
  constructor(private router:Router, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(["/"])
      }
    })
  }

  registro() {
    this.loginService.registerApp(this.email, this.password)
    .then(responde => {
      this.router.navigate(["/"])
    }).catch(error => {
      alert("No ha sido posible registrarse" + error.message)
    })
  }
}
