import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";
import { BsEyeFill } from "react-icons/bs";

const ArchivosEstudio = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    let token = localStorage.getItem("token");

    const[idOrden,setIdOrden] = useState(0);
    const [servicios, setservicios] = useState( [] );
    const[idPaciente,setIdPaciente] = useState(0);
    const[nombres, setNombres] = useState("");
    const[idOdontologo, setIdOdontologo] = useState(0);
    const[impresionCheck, setImpresionCheck] = useState([]);
    const [elementos, setElementos] = useState([]);
    const[resultado, setResultado] = useState([]);
    
    const[fechaCreacion, setFechaCreacion] = useState("");
    const[edad, setEdad] = useState(0);
    const[fecha, setFecha] = useState(0);
    const[varon, setVaron] = useState(false);
    const[mujer, setMujer] = useState(false);

    const[odontologo, setOdontologo] = useState("");


    const navigate = useNavigate();

    function calcularEdad(fecha_nacimiento) {
        let hoy = new Date();
        let cumpleanos = new Date(fecha_nacimiento);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        let m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    }

    const getOneOrden = async() =>{
        setLoading(true);
        const oneOrden = await axios.get(`${Global.url}/oneOrdenVirtual/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setIdPaciente(oneOrden.data.verOrden.id_paciente);
        setIdOdontologo (oneOrden.data.verOrden.id_odontologo);
        setIdOrden(oneOrden.data.verOrden.id);
        const fecha_at = new Date(oneOrden.data.verOrden.created_at)
        setFechaCreacion(`${fecha_at.toLocaleDateString()}  -  ${fecha_at.toLocaleTimeString()}`)
        setElementos(JSON.parse(oneOrden.data.verOrden.listaItems))
       
        const onePaciente = await axios.get(`${Global.url}/onePaciente/${oneOrden.data.verOrden.id_paciente}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setNombres(`${onePaciente.data.nombres} ${onePaciente.data.apellido_p} ${onePaciente.data.apellido_m}`);
        setEdad(calcularEdad(onePaciente.data.f_nacimiento));
        const fecha_date = new Date(onePaciente.data.f_nacimiento);
        setFecha(fecha_date.toLocaleDateString());


        if(onePaciente.data.genero == 0 ){
            setVaron(true);
        }else if (onePaciente.data.genero == 1){
            setMujer(true);
        }

        const request = await axios.get(`${Global.url}/allServicios`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setservicios(request.data);

        const oneOdontologo = await axios.get(`${Global.url}/oneOdontologo/${oneOrden.data.verOrden.id_odontologo}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setOdontologo(`${oneOdontologo.data.nombres} ${oneOdontologo.data.apellido_p} ${oneOdontologo.data.apellido_m}`);
        setIdOdontologo(oneOdontologo.data.id);
        setLoading(false);
    }


    useEffect(() =>{
        getOneOrden();
        traerArray();
    },[])

    const traerArray = () =>{
        
    }
    // useEffect(()=>{
    // },[servicios])

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
                navigate('/admin/clinicas');
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
        <div className="container col-md-11 mt-6">
            <div className="card">
                <div className="card-header fw-bold">
                    Subir Registros de estudio:
                </div>
                <form className="p-4 needs-validation" onSubmit={saveClinica}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-12 content_img" style={{position: 'relative'}}>
                           <img src={logo} alt=""/>
                        </div>
                        <div className='eyes_content'>
                            <BsEyeFill/>
                        </div>
                    </div>
                    <div className="d-flex  justify-content-between" style={{paddingTop: '30px'}}>
                        <div className="mb-3 col-md-3" style={{paddingRight: '20px'}}>
                            <label className="form-label">N° Orden: </label>
                            <input className="form-control" disabled
                                type="text"
                                value={idOrden}
                                // onChange={(e)=>{setIdOrden(e.target.value)}}
                                style={{textAlign: 'center'}}
                            />
                        </div>
                        <div className="mb-3 col-md-3" style={{paddingRight: '20px'}}>
                            <label className="form-label">Fecha: </label>
                            <input className="form-control" disabled
                                type="text"
                                value={fechaCreacion}
                                // onChange={(e)=>{setFechaCreacion(e.target.value)}}
                                style={{textAlign: 'center'}}
                            />
                        </div>
                        <div className="mb-3 col-md-3" style={{paddingRight: '20px'}}>
                            <label className="form-label">Paciente: </label>
                            <input className="form-control" disabled
                                type="text"
                                value={nombres}
                            />
                        </div>
                        <div className="mb-3 col-md-2" style={{paddingRight: '20px'}}>
                            <label className="form-label">Nacimiento: </label>
                            <input className="form-control" disabled
                                type="text"
                                value={fecha}
                            />
                        </div>
                        <div className="mb-3 col-md-1" >
                            <label className="form-label">Edad: </label>
                            <input className="form-control" disabled
                                type="text"
                                value={edad}
                            />
                        </div>
                    </div>

                    <div className="d-flex  justify-content-left" >
                        <div className="mb-3 col-md-2" style={{paddingRight: '20px'}}>
                            <label className="form-label">Genero: </label>
                            <input className="form-control" disabled
                                type="text"
                                value={varon=== true ? "Hombre" : mujer === true ? "Mujer" : ""}
                            />
                        </div>
                        <div className="mb-3 col-md-3" style={{paddingRight: '20px'}}>
                            <label className="form-label">Entrega: </label>
                            <input className="form-control" disabled
                                type="text"
                            />
                        </div>
                    </div>
                    {elementos.map((lista) =>(
                            servicios.map((serv) => (
                                lista.estado === true && serv.id === lista.id_servicio?
                                <div>
                                    <div className="card-header fw-bold" style={{marginTop: '20px'}}>
                                        {serv.nombre}
                                    </div>
                                    <div className="d-flex  justify-content-between" style={{paddingTop: '30px'}}>
                                        <div className="mb-3 col-md-3" style={{paddingRight: '20px'}}>
                                            <div>
                                                 <div>
                                                    <label className="form-label">ARCHIVOS ADQUIRIDOS: </label>
                                                </div>   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :""
                            ))
                        ))
                       
                    }
                    <div className="d-flex gap-2 contentBtnRegistrar">
                        <input type="hidden" name="oculto" value="1" />
                        <Link to="/admin/clinicas" className="btn btn-danger btnCancelar">Cancelar</Link>
                        <input type="submit" className="btn btn-primary btnRegistrar" value="Registrar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArchivosEstudio