import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  permitirRegistro:boolean = false;

  constructor(private router: Router, private configuracionServicio: ConfiguracionServicio){}

  ngOnInit(): void {
    this.configuracionServicio.getConfiguracion().subscribe(
      (configuracion: Configuracion) => {
        this.permitirRegistro = configuracion.permitirRegistro as boolean;
      }
    )
  }

  guardar() {
    let config = {permitirRegistro: this.permitirRegistro}
    this.configuracionServicio.modificarConfiguracion(config)
    this.router.navigate(["/"])
  }
}
