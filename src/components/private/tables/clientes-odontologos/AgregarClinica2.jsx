import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';


const AgregarClinica2 = (props) => {

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [referencia, setReferencia] = useState(null);
    const [telefono, setTelefono] = useState(null);
    const [celular, setCelular] = useState("");

    const saveClinica = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        const data = new FormData();
        data.append('nombre', nombre);
        data.append('direccion', direccion);
        data.append('referencia', referencia);
        data.append('telefono', telefono);
        data.append('celular', celular);

        try {
            let respuesta = await axios.post(`${Global.url}/saveClinica`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if(respuesta.data.status === "success"){
                Swal.fire('Agreado correctamente', '', 'success');
                setNombre("");
                setDireccion("");
                setReferencia("");
                setTelefono("");
                setCelular("");
            }else{
                Swal.fire('Error al agregar el registro', '', 'error');
            }
        } catch (error) {
            if(error.request.response.includes("telefono")){
                Swal.fire('Telefono invalido', '', 'error');
            }else if(error.request.response.includes("celular")){
                Swal.fire('Celular invalido', '', 'error');
            }else if(error.request.response.includes("nombre")){
                Swal.fire('Nombre invalido', '', 'error');
            }else{
                Swal.fire('Error no encontrado', '', 'error');
            }
        }
    }

    return (
        <div className="container col-md-10 mt-6">
            <div className="card">
                <div className="card-header fw-bold">
                    Agregar Clinica:
                </div>
                <form className="p-4 needs-validation" onSubmit={saveClinica}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-5">
                            <label className="form-label">Nombre: </label>
                            <input className="form-control" autoFocus required
                                value={nombre}
                                onChange={(e) => { setNombre(e.target.value) }}
                                type="text"
                            />
                        </div>

                        <div className="mb-3 col-md-6">
                            <label className="form-label">Dirección: </label>
                            <input className="form-control" autoFocus required
                                value={direccion}
                                onChange={(e) => { setDireccion(e.target.value) }}
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="d-flex  justify-content-between">
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Referencia: </label>
                            <input className="form-control" autoFocus required
                                value={referencia}
                                onChange={(e) => { setReferencia(e.target.value) }}
                                type="text"/>
                        </div> 

                        <div className="mb-3 col-md-3">
                            <label className="form-label">Telefono: </label>
                            <input className="form-control" autoFocus 
                                value={telefono}
                                onChange={(e) => { setTelefono(e.target.value) }}
                                type="text"/>
                        </div> 
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Celular: </label>
                            <input className="form-control" autoFocus required
                                value={celular}
                                onChange={(e) => { setCelular(e.target.value) }}
                                type="text"/>
                        </div> 
                    </div>

                    <div className="d-flex gap-2 contentBtnRegistrar">
                        <input type="hidden" name="oculto" value="1" />
                        <input type="submit" className="btn btn-primary btnRegistrar" value="Registrar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AgregarClinica2