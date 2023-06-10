import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Cliente } from '../modelo/cliente.model';
import { Observable, first, map } from 'rxjs';

@Injectable()
export class ClienteServicio {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente | null>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }

  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Cliente;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.clientes;
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  agregarNuevoCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

  guardarCliente(cliente: Cliente){
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`)
    this.clienteDoc.update(cliente)
    
  }

  eliminarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`)
    this.clienteDoc.delete()
  }
}
