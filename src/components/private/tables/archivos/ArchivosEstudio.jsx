import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";
import Button from 'react-bootstrap/Button';
import { BsEyeFill, BsFileZipFill , BsFillImageFill, BsFillTrashFill } from "react-icons/bs";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage,faTimes}  from '@fortawesome/free-solid-svg-icons';
import ModalSeperado from './ModalSeperado';

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

    const [id_servicio, setId_servicio] = useState('');
    const [id_item, setIdItem] = useState('');

    const[fechaCreacion, setFechaCreacion] = useState("");
    const[edad, setEdad] = useState(0);
    const[fecha, setFecha] = useState(0);
    const[varon, setVaron] = useState(false);
    const[mujer, setMujer] = useState(false);
    const[show, setShow] = useState(false);
    const[images, setImages] = useState([]);

    const handleClose = ((e)=>{
        setShow(false);
        getImages();
    }) 

    const handleShow = ((e)=>{
        const id = e.target.id;
        const name = e.target.name;
        setIdItem(name)
        setId_servicio(id)
        setShow(true)
    }) 
    // const handleShow = () => setShow(true);

    const[odontologo, setOdontologo] = useState("");
    const [boton, setBoton] = useState(false);
    const [url, setUrl] = useState("");

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
    }

    const getImages= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/verImagenes`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }); 

        setImages(request.data);
        setLoading(false);
    };

    useEffect(() =>{
        getOneOrden();
        getImages();
    },[])


    return (
        <div className="container col-md-11 mt-6">
            <div className="card">
                <div className="card-header fw-bold">
                    Subir Registros de estudio:
                </div>
                {loading === false ?
                <form className="p-4 needs-validation" >
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
                                <div key={lista.id_item}>
                                    <div className="card-header fw-bold" style={{marginTop: '20px'}}>
                                        {serv.nombre}
                                        {serv.id}
                                        <ModalSeperado show={show} handleClose={handleClose} id_servicio={id_servicio} id_item={id_item} id_orden={idOrden}/>
                                    </div>
                                    <div className="d-flex  justify-content-between" style={{paddingTop: '30px'}}>
                                        <div className="mb-3 col-md-12" style={{paddingRight: '20px'}}>
                                            <div className='content_archivos'>
                                                 <div>
                                                    <div className='content_archivos-boton'>
                                                        <label className="form-label col-md-4" style={{textAlign: 'center'}}>ARCHIVOS ADQUIRIDOS: </label>
                                                        <Button onClick={handleShow} className='form-label col-md-3' id={serv.id} name={lista.id_item}>
                                                            Subir Archivo
                                                        </Button>
                                                    </div>
                                                     <ul className='content_archivos__ul'>
                                                        {images.map((img)=>(
                                                            img.id_servicio === serv.id && img.id_item_servicio === lista.id_item ?
                                                            <div className='content_archivos__ul__divs' key={img.id}>
                                                                <div className='content_archivos__ul__divs__clindrns'>
                                                                    {(img.archivo).split(',').map((linea,index)=>(
                                                                        <p key={index}>
                                                                            {linea}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                                <button className="text-danger btnEliminar">
                                                                    <BsFillTrashFill/>
                                                                </button>
                                                            </div>
                                                            : ""
                                                        ))}
                                                    </ul>
                                                </div>   
                                                <div>
                                                    <label className="form-label col-md-12" style={{textAlign: 'center'}}>INFORME FINAL: </label>
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

export default ArchivosEstudio