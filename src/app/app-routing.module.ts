import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';

const routes: Routes = [
  {path:'', component: TableroComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent, canActivate: [ConfiguracionGuard]},
  {path:'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
  {path:'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard]},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
