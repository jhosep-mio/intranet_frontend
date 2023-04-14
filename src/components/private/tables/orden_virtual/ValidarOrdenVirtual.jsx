import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AgregarCliente from './AgregarCliente';


const ValidarOrdenVirtual = () => {

    let token = localStorage.getItem("token");
    const[tipo_documento, setTipo_documento] = useState(0);
    const[numero_documento, setNumero_documento] = useState("");
    const [loged, setLoged] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const navigate = useNavigate();

    const validarPaciente = async(e) =>{
        e.preventDefault();

        const data = new FormData();

        data.append('tipo_documento_paciente_odontologo', tipo_documento);
        data.append('numero_documento_paciente_odontologo', numero_documento);
        data.append('_method', 'POST');

        try {

            let respuesta= await axios.post(`${Global.url}/validarPaciente`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            if(respuesta.data.status === "success"){
                localStorage.removeItem('paciente');
                localStorage.setItem("paciente", JSON.stringify(respuesta.data.paciente));

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Paciente Encontrado',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setTimeout(()=>{
                    navigate('/admin/ordenVirtual/agregar');
                }, 1500)

            }else if(respuesta.data.status === "invalid"){
                setLoged("invalid");
            }else{
                e.preventDefault();
                Swal.fire({
                    title: 'EL PACIENTE NO EXISTE',
                    showDenyButton: true,
                    denyButtonText: `Volver Intentarlo`,
                    confirmButtonText: 'Agregar Paciente',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        setShow(true);
                    }
                })
                setLoged("noexiste");
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="container col-md-5 mt-6">
            <div className="card">
                <div className="card-header fw-bold">
                    Verificar Registro:
                </div>
                <form className="p-4 needs-validation" onSubmit={validarPaciente}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-12 content_img">
                           <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 col-md-11">
                           <label className="form-label">Tipo de documento: </label>
                           <select value={tipo_documento} type="text" className="form-select" autoFocus required onChange={(e) => { setTipo_documento(e.target.value)}}>
                               <option value="0">DNI</option>
                               <option value="1">RUC</option>
                               <option value="2">Pasaporte</option>
                               <option value="3">Carnet de Extranjería</option>
                           </select>
                       </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 col-md-11">
                            <label className="form-label">Numero de documento: </label>
                            <input className="form-control" autoFocus required
                                value={numero_documento}
                                onChange={(e) => { setNumero_documento(e.target.value) }}
                                type="text"/>
                        </div> 
                    </div>
                    <div className="d-flex justify-content-center">
                        {
                        loged === "invalid" ?
                        <p className='login-main__error_datos'>El tipo de documento es incorrecto</p>
                        : loged === "noexiste" ?
                        <div className="mb-3 col-md-11">
                            <Modal show={show} onHide={handleClose} animation={false} >
                                <Modal.Header closeButton>
                                    <img src={logo} alt="" />
                                </Modal.Header>
                                <Modal.Body>
                                    <AgregarCliente/>
                                </Modal.Body>
                            </Modal>
                        </div> 
                        : ""
                        }

                    </div>

                    <div className="d-flex gap-2 contentBtnRegistrar">
                        <input type="hidden" name="oculto" value="1" />
                        <Link to="/admin/clinicas" className="btn btn-danger btnCancelar">Cancelar</Link>
                        <input type="submit" className="btn btn-primary btnRegistrar" value="Continuar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ValidarOrdenVirtual