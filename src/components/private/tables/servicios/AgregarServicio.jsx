import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";

const AgregarServicio = () => {

    const [nombre, setNombre] = useState("");
    const [impresion, setImpresion] = useState(0);
    
    const navigate = useNavigate();

    const saveServicio = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        const data = new FormData();
        data.append('nombre', nombre);
        data.append('impreso', impresion);

        try {
            let respuesta = await axios.post(`${Global.url}/saveServicio`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if(respuesta.data.status === "success"){
                Swal.fire('Agreado correctamente', '', 'success');
                navigate(`/admin/servicios`);
            }else{
                Swal.fire('Error al agregar el registro', '', 'error');
            }
        } catch (error) {
            console.log(error.request.response)
            if(error.request.response.includes("nombre")){
                Swal.fire('Nombre invalido', '', 'error');
            }
        }
    }

    return (
        <div className="container col-md-8 mt-6">
            <div className="card">
                <div className="card-header fw-bold">
                    Agregar Servicio:
                </div>
                <form className="p-4 needs-validation" onSubmit={saveServicio}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-12 content_img">
                           <img src={logo} alt=""/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 col-md-11">
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten">
                                    <label className="label_title">Nombre: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={nombre}  
                                        type="text"
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten">
                                    <label className="label_title col-md-5">¿Desea que aparezca la opcion de impresion?: </label>
                                    <select value={impresion} type="text" className=" form-select2" autoFocus required onChange={(e)=>{setImpresion(e.target.value)}}>
                                        <option value="0" >No</option>
                                        <option value="1" >Si</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>    
                    <div className="d-flex gap-2 contentBtnRegistrar">
                        <input type="hidden" name="oculto" value="1" />
                        <Link to="/admin/servicios" className="btn btn-danger btnCancelar">Cancelar</Link>
                        <input type="submit" className="btn btn-primary btnRegistrar" value="Registrar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AgregarServicio