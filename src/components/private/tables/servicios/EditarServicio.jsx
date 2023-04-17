import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";

const EditarServicio = () => {
    let token = localStorage.getItem("token");

    const [nombre, setNombre] = useState("");
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
                updateServicio();
            }
          })
    }

    const updateServicio = async () => {
        const data = new FormData();
        
        data.append('nombre', nombre);
        data.append('_method', 'PUT');

        try {
            let respuesta= await axios.post(`${Global.url}/updateServicio/${id}`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            if(respuesta.data.status === "success"){
                Swal.fire('Actualizacion Correcta', '', 'success');
                navigate(`/admin/servicios`);
            }else{
                Swal.fire('Error al realizar la edicion', '', 'error');
            }
        } catch (error) {
            console.log(error.request.response)
            if(error.request.response.includes("nombre")){
                Swal.fire('Nombre invalido', '', 'error');
            }
        }
     
    }

    useEffect(()=>{
        getClinicaOne();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

        const getClinicaOne = async() =>{
            setLoading(true);
            const oneServicio = await axios.get(`${Global.url}/oneServicio/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            setNombre(oneServicio.data.nombre);
            setLoading(false);
        }
       
    return (
        <div className="container col-md-10 mt-6">
            <div className="card">
                <div className="card-header fw-bold">
                    Editar Servicio:
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
                                    <label className="label_title">Nombre: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={nombre}
                                        type="text"
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div className="d-flex gap-2 contentBtnRegistrar">
                            <input type="hidden" name="oculto" value="1" />
                            <Link to="/admin/clinicas" className="btn btn-danger btnCancelar">Cancelar</Link>
                            <input type="submit" className="btn btn-primary btnRegistrar" value="Editar" />
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

export default EditarServicio