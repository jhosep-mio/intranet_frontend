import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { PrivateLayout } from '../components/private/PrivateLayout';
import { Login } from '../components/public/Login';
import { AuthProvider } from '../context/AuthProvider';
import ListaClinica from '../components/private/tables/clinica/ListaClinica';
import EditarClinica from '../components/private/tables/clinica/EditarClinica';
import { PublicLayout } from '../components/public/PublicLayout';
import { Home } from '../components/public/pages/Home';
import { Nosotros } from '../components/public/pages/Nosotros';
import ListaClientes from '../components/private/tables/clientes-odontologos/ListaClientes';
import AgregarCliente from '../components/private/tables/clientes-odontologos/AgregarCliente';
import EditarOdontologo from '../components/private/tables/clientes-odontologos/EditarOdontologo';
import EditarPaciente from '../components/private/tables/clientes-odontologos/EditarPaciente';
import ListaOrdenVirtual from '../components/private/tables/orden_virtual/ListaOrdenVirtual';
import ValidarOrdenVirtual from '../components/private/tables/orden_virtual/ValidarOrdenVirtual';
import AgregarOrdenVirtual from '../components/private/tables/orden_virtual/AgregarOrdenVirtual';
import AgregarClinica from '../components/private/tables/clinica/AgregarClinica';
import ListaServicios from '../components/private/tables/servicios/ListaServicios';
import AgregarServicio from '../components/private/tables/servicios/AgregarServicio';
import EditarServicio from '../components/private/tables/servicios/EditarServicio';
import AgregarItem from '../components/private/tables/servicios/AgregarItem';
import EditarItem from '../components/private/tables/servicios/EditarItem';
import EditarOrdenVirtual from '../components/private/tables/orden_virtual/EditarOrdenVirtual';

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

            {/* PUBLIC */}

            <Route path='/' element={<PublicLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='home' element={<Home/>}/>
                <Route path='nosotros' element={<Nosotros/>}/>
            </Route>

            

            {/* ADMINSITRADOR */}

            <Route path='/login' element={<Login/>}></Route>
            
            <Route path='admin' element={<PrivateLayout/>}>

                <Route index element={<ListaClinica/>}/>
                {/* CLINICA */}
                <Route path='clinicas' element={<ListaClinica/>}/>
                <Route path='clinicas/agregar' element={<AgregarClinica/>}/>     
                <Route path='clinicas/editar/:id' element={<EditarClinica/>}/>     

                {/* PACIENTES / ODONTOLOGOS */}
                <Route path='clientes' element={<ListaClientes/>}/>
                <Route path='clientes/agregar' element={<AgregarCliente/>}/>
                <Route path='clientes/editar/paciente/:id' element={<EditarPaciente/>}/>
                <Route path='clientes/editar/odontologos/:id' element={<EditarOdontologo/>}/>

                {/* PACIENTES / ODONTOLOGOS */}
                <Route path='servicios' element={<ListaServicios/>}/>
                <Route path='servicios/agregar/servicio' element={<AgregarServicio/>}/>
                <Route path='servicios/editar/:id' element={<EditarServicio/>}/>     
                <Route path='servicios/agregar/item' element={<AgregarItem/>}/>
                <Route path='servicios/editar/item/:id' element={<EditarItem/>}/>     

                {/* ORDEN VIRTUAL */}
                <Route path='ordenVirtual' element={<ListaOrdenVirtual/>}/>
                <Route path='ordenVirtual/validar' element={<ValidarOrdenVirtual/>}/>
                <Route path='ordenVirtual/agregar' element={<AgregarOrdenVirtual/>}/>
                <Route path='ordenVirtual/editar/:id' element={<EditarOrdenVirtual/>}/>
            </Route>
            
            <Route path='*' element={
                <>
                    <p>
                        <h1>ERROR 404</h1>
                    </p>
                </>
            } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    )
}
