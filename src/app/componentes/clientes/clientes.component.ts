import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.services';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  mostrarAlerta:boolean = false;

  @ViewChild ("f") f: NgForm;
  @ViewChild ("botonCerrar") botonCerrar: ElementRef

  constructor(private clienteServicio: ClienteServicio) {}

  ngOnInit(): void {
    this.clienteServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes
      }
    )
  }

  getSaldoTotal() {
    let saldoTotal = this.clientes.reduce((acumulador, currentValue) => {
      return currentValue.saldo + acumulador 
    },0)

    return saldoTotal;
  }

  agregarCliente(f: NgForm, value:Cliente) {
    if (!f.valid || !f.value.nombre || !f.value.apellido || !f.value.email || !f.value.saldo) {
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
      this.clienteServicio.agregarNuevoCliente(value)
      this.f.resetForm();
      this.cerrarVentana()
    }
  }

  private cerrarVentana() {
    this.botonCerrar.nativeElement.click()
  }
  
  
}
