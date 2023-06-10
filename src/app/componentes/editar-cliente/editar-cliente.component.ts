import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.model';

import { ClienteServicio } from 'src/app/servicios/cliente.services';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {nombre: '', apellido: '', email:'', saldo: 0}
  id: string;
  mostrarAlerta:boolean = false;

  constructor(private clienteServicio: ClienteServicio, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteServicio.getCliente(this.id).subscribe((cliente: Cliente | null) => {
      if (cliente) {
        this.cliente = cliente;
      }
    });
  }

  guardar(form: NgForm, value:Cliente) {
    if (!form.valid || !value.nombre || !value.apellido || !value.email || !value.saldo) {
      let count = 0;
      const tiempoAlerta = setInterval(() => {
        count++;
        if (count === 1) {
          this.mostrarAlerta = true;
        }
        if (count === 3) {
          this.mostrarAlerta = false;
          clearInterval(tiempoAlerta);
        }
      }, 1000);
    }else{
      value.id = this.id
      this.clienteServicio.guardarCliente(value)
      this.router.navigate(["/"]);

    }
  }  

  eliminar() {
    let confirmacion = confirm("¿Esta seguro que desea eliminar este cliente?")
    if(confirmacion) {
      this.clienteServicio.eliminarCliente(this.cliente)
      this.router.navigate(["/"])
    }
  }
}
