import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";

const EditarClinica = () => {
    let token = localStorage.getItem("token");

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [referencia, setReferencia] = useState("");
    const [telefono, setTelefono] = useState("");
    const [celular, setCelular] = useState("");

    const [boton, setBoton] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    const preguntar = (e) =>{
        e.preventDefault();
        Swal.fire({
            title: '¿Seguro que deseas editar el registro?',
            showDenyButton: true,
            confirmButtonText: 'Editar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                updateClinica();
            }
          })
    }

    const updateClinica = async () => {
        const data = new FormData();
        
        data.append('nombre', nombre);
        data.append('direccion', direccion);
        data.append('referencia', referencia);
        data.append('telefono', telefono);
        data.append('celular', celular);
        data.append('_method', 'PUT');

        try {
            let respuesta= await axios.post(`${Global.url}/updateClinica/${id}`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            if(respuesta.data.status === "success"){
                Swal.fire('Actualizacion Correcta', '', 'success');
                navigate('/admin/clinicas');
            }else{
                Swal.fire('Error al editar la clinica', '', 'error');
            }
        } catch (error) {
            console.log(error.request.response)
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

    useEffect(()=>{
        getClinicaOne();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

        const getClinicaOne = async() =>{
            setLoading(true);
            const oneClinica = await axios.get(`${Global.url}/oneClinica/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            setNombre(oneClinica.data.nombre);
            setDireccion(oneClinica.data.direccion);
            setReferencia(oneClinica.data.referencia);
            setTelefono(oneClinica.data.telefono === null ? "" : oneClinica.data.telefono);
            setCelular(oneClinica.data.celular);
            setLoading(false);
        }
       
    return (
        <div className="container col-md-10 mt-6">
            <div className="card">
                <div className="card-header fw-bold">
                    Editar Clinica:
                </div>
                <div className="d-flex justify-content-between">
                    <div className="mb-3 col-md-12 content_img">
                    <img src={logo} alt="" />
                    </div>
                </div>
                {loading === false ?
                <form className="p-4 needs-validation" onSubmit={preguntar}>
                     <div className="d-flex justify-content-center">
                        <div className="mb-3 col-md-11">
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten">
                                    <label className="label_title">Nombres: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={nombre}
                                        type="text"
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten">
                                    <label className="label_title">Dirección: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={direccion}
                                        type="text"
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten">
                                    <label className="label_title">Referencia: </label>
                                    <input className="form-control form-control3" autoFocus
                                        value={referencia}
                                        type="text"
                                        onChange={(e) => setReferencia(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title">Telefono: </label>
                                    <input className="form-control form-control3" autoFocus 
                                    value={telefono}
                                    onChange={(e) => { setTelefono(e.target.value) }}
                                    type="text"
                                    />
                                </div>
                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title">Celular: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={celular}
                                        onChange={(e) => { setCelular(e.target.value) }}
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div className="d-flex gap-2 contentBtnRegistrar">
                            <input type="hidden" name="oculto" value="1" />
                            <Link to="/admin/clinicas" className="btn btn-danger btnCancelar">Cancelar</Link>
                            <input type="submit" className="btn btn-primary btnRegistrar" value="Grabar" />
                        </div>
                </form>
                : <div className="dot-spinner dot-spinner4">
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                </div>}
            </div>
             
        </div>
    )
}

export default EditarClinica