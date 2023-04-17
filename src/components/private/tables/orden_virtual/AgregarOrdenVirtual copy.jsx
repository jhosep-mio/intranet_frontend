import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";
import grande from './../../../../assets/admin/grande.jpg';
import mediano from './../../../../assets/admin/mediano.jpg';
import pequeno from './../../../../assets/admin/pequeno.jpg';

const AgregarOrdenVirtual = () => {

    useEffect(() =>{
        getCliente();
        getAllOdontologos();
        getAllServicios();
    },[])

    let token = localStorage.getItem("token");

    const[varon, setVaron] = useState(false);
    const[mujer, setMujer] = useState(false);

    const[odontologos, setOdontologos] = useState([]);
    const[servicios, setServicios] = useState([]);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const[nombres, setNombres] = useState("");
    const[edad, setEdad] = useState(0);
    const[celular, setCelular] = useState(0);
    const[genero, setGenero] = useState(0);
    const[fecha, setFecha] = useState(0);
    const[odontologo, setOdontologo] = useState("");
    const[cop, setCop] = useState("");
    const[emailOdon, setEmailOdon] = useState("");


    //ORDEN VIRTUAL
    const[idPaciente,setIdPaciente] = useState(0);
    const[consulta, setConsulta] = useState("");
    const[idOdontologo, setIdOdontologo] = useState(0);

    const[senosMaxilares, setSenosMaxilares] = useState(false);
    const[atm, setAtm] = useState(false);
    const[ortodoncia, setOrtodoncia] = useState(false);
    const[areaPatologica, setAreaPatologica] = useState(false);
    const[implantes, setImplantes] = useState(false);
    const[localizacionDiente, setLocalizacionDiente] = useState(false);
    const[fracturaRadiocular, setFracturaRadiocular] = useState(false);
    const[endodoncia, setEndodoncia] = useState(false);
    const[anatomia, setAnatomia] = useState(false);
    const[sinAnalisis, setSinAnalisis] = useState(false);
    const[conAnalisis, setConAnalisis] = useState(false);

    const[box18, setBox18] = useState(false);
    const[box17, setBox17] = useState(false);
    const[box16, setBox16] = useState(false);
    const[box15, setBox15] = useState(false);
    const[box14, setBox14] = useState(false);
    const[box13, setBox13] = useState(false);
    const[box12, setBox12] = useState(false);
    const[box11, setBox11] = useState(false);

    const[box21, setBox21] = useState(false);
    const[box22, setBox22] = useState(false);
    const[box23, setBox23] = useState(false);
    const[box24, setBox24] = useState(false);
    const[box25, setBox25] = useState(false);
    const[box26, setBox26] = useState(false);
    const[box27, setBox27] = useState(false);
    const[box28, setBox28] = useState(false);

    const[box48, setBox48] = useState(false);
    const[box47, setBox47] = useState(false);
    const[box46, setBox46] = useState(false);
    const[box45, setBox45] = useState(false);
    const[box44, setBox44] = useState(false);
    const[box43, setBox43] = useState(false);
    const[box42, setBox42] = useState(false);
    const[box41, setBox41] = useState(false);

    const[box31, setBox31] = useState(false);
    const[box32, setBox32] = useState(false);
    const[box33, setBox33] = useState(false);
    const[box34, setBox34] = useState(false);
    const[box35, setBox35] = useState(false);
    const[box36, setBox36] = useState(false);
    const[box37, setBox37] = useState(false);
    const[box38, setBox38] = useState(false);

    const[siConGuias, setSiConGuias] = useState(false);
    const[noConGuias, setNoConGuias] = useState(false);

    const[radiografiaPanoramica, setRadiografiaPanoramica] = useState(false);
    const[radiografiaCefalometrica, setRadiografiaCefalometrica] = useState(false);
    const[radiografiaCerpal, setRadiografiaCerpal] = useState(false);
    const[fotosExtraorales, setFotosExtraorales] = useState(false); 
    const[estudioAtm, setEstudioAtm] = useState(false);
    const[radiografiaPosterior, setRadiografiaPosterior] = useState(false);
        
    const[otrosRadiografias, setOtrosRadiografias] = useState("");

    const[paquetesOrtodoncicosA, setPaquetesOrtodoncicosA] = useState(false);
    const[paquetesOrtodoncicosB, setPaquetesOrtodoncicosB] = useState(false);
    const[paquetesPediatricos, setPaquetesPediatricos] = useState(false);

    const[ricketts, setRicketts] = useState(false);
    const[schwartz, setSchwartz] = useState(false);
    const[steiner, setSteiner] = useState(false);
    const[mcNamara, setMcNamara] = useState(false);
    const[tweed, setTweed] = useState(false);
    const[downs, setDowns] = useState(false);
    const[bjork, setBjork] = useState(false);
    const[usp, setUsp] = useState(false);
    const[tejidosJarabak, setTejidosJarabak] = useState(false);
    const[otrosAnalisis, setOtrosAnalisis] = useState("");


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

    const onSeachChange = ({target}) =>{
        setSearch(target.value);
    }

    function quitarAcentos(cadena){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    } 

    const getCliente = ()=>{
        let paciente = JSON.parse(localStorage.getItem("paciente"));
        setIdPaciente(paciente.id);
        setNombres(`${paciente.nombres} ${paciente.apellido_p} ${paciente.apellido_m}`);
        setEdad(calcularEdad(paciente.f_nacimiento));
        setFecha(paciente.f_nacimiento);
        setCelular(paciente.celular);
        setGenero(paciente.genero);

        if(paciente.genero == 0 ){
            setVaron(true);
        }else if (paciente.genero == 1){
            setMujer(true);
        }
    }

    const getAllOdontologos= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allOdontologos`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setOdontologos(request.data);
        setLoading(false);
    };

    const getAllServicios= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allItemServices`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setServicios(request.data);
        setLoading(false);
    };

    useEffect(()=>{
        filterDate()
    }, [search])

    const filterDate = () =>{
        
        if(search.length > 4){
            const filter = odontologos.filter(
            odon => odon.cop.toString() === (search)
            );

            if(filter.length === 1) {
                if(filter[0].cop.toString().length === search.length){
                    setOdontologo(`${filter[0].nombres} ${filter[0].apellido_p} ${filter[0].apellido_m}`);
                    setCop(filter[0].cop);
                    setIdOdontologo(filter[0].id);
                    setEmailOdon(filter[0].correo);
                    return filter[0];
                }
            }else{
                const filter = [];
                setIdOdontologo(0);
                setOdontologo("");
                setCop("");
                setEmailOdon("");
                return filter[0];
            }

        }else {
            const filter = [];
            setIdOdontologo(0);
            setOdontologo("");
            setCop("");
            setEmailOdon("");
            return filter[0];
        }
    }

    

    const saveOrdenVirtual = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        const data = new FormData();

        data.append('id_paciente', idPaciente);
        data.append('id_odontologo', idOdontologo);
        data.append('consulta', consulta);
        data.append('senosMaxilares', senosMaxilares === true ? 1 : 0);
        data.append('atm', atm === true ? 1 : 0);
        data.append('ortodoncia', ortodoncia === true ? 1 : 0);
        data.append('areaPatologica', areaPatologica === true ? 1 : 0);

        data.append('implantes', implantes === true ? 1 : 0);
        data.append('localizacionDiente', localizacionDiente === true ? 1 : 0);
        data.append('fracturaRadiocular', fracturaRadiocular === true ? 1 : 0);
        data.append('endodoncia', endodoncia === true ? 1 : 0);
        data.append('anatomia', anatomia === true ? 1 : 0);

        data.append('sinAnalisis', sinAnalisis === true ? 1 : 0);
        data.append('conAnalisis', conAnalisis === true ? 1 : 0);
        
        data.append('box18', box18 === true ? 1 : 0);
        data.append('box17', box17 === true ? 1 : 0);
        data.append('box16', box16 === true ? 1 : 0);
        data.append('box15', box15 === true ? 1 : 0);
        data.append('box14', box14 === true ? 1 : 0);
        data.append('box13', box13 === true ? 1 : 0);
        data.append('box12', box12 === true ? 1 : 0);
        data.append('box11', box11 === true ? 1 : 0);

        data.append('box21', box21 === true ? 1 : 0);
        data.append('box22', box22 === true ? 1 : 0);
        data.append('box23', box23 === true ? 1 : 0);
        data.append('box24', box24 === true ? 1 : 0);
        data.append('box25', box25 === true ? 1 : 0);
        data.append('box26', box26 === true ? 1 : 0);
        data.append('box27', box27 === true ? 1 : 0);
        data.append('box28', box28 === true ? 1 : 0);

        data.append('box48', box48 === true ? 1 : 0);
        data.append('box47', box47 === true ? 1 : 0);
        data.append('box46', box46 === true ? 1 : 0);
        data.append('box45', box45 === true ? 1 : 0);
        data.append('box44', box44 === true ? 1 : 0);
        data.append('box43', box43 === true ? 1 : 0);
        data.append('box42', box42 === true ? 1 : 0);
        data.append('box41', box41 === true ? 1 : 0);

        data.append('box31', box31 === true ? 1 : 0);
        data.append('box32', box32 === true ? 1 : 0);
        data.append('box33', box33 === true ? 1 : 0);
        data.append('box34', box34 === true ? 1 : 0);
        data.append('box35', box35 === true ? 1 : 0);
        data.append('box36', box36 === true ? 1 : 0);
        data.append('box37', box37 === true ? 1 : 0);
        data.append('box38', box38 === true ? 1 : 0);

        data.append('siConGuias', siConGuias == true ? 1 : 0);
        data.append('noConGuias', noConGuias == true ? 1 : 0);
        
        data.append('radiografiaPanoramica', radiografiaPanoramica === true ? 1 : 0);
        data.append('radiografiaCefalometrica', radiografiaCefalometrica === true ? 1 : 0);
        data.append('radiografiaCerpal', radiografiaCerpal === true ? 1 : 0);
        data.append('fotosExtraorales', fotosExtraorales === true ? 1 : 0);
        data.append('estudioAtm', estudioAtm === true ? 1 : 0);
        data.append('radiografiaPosterior', radiografiaPosterior === true ? 1 : 0);

        data.append('otrosRadiografias', otrosRadiografias);

        data.append('paquetesOrtodoncicosA', paquetesOrtodoncicosA === true ? 1 : 0);
        data.append('paquetesOrtodoncicosB', paquetesOrtodoncicosB === true ? 1 : 0);
        data.append('paquetesPediatricos', paquetesPediatricos === true ? 1 : 0);
        data.append('ricketts', ricketts === true ? 1 : 0);
        data.append('schwartz', schwartz === true ? 1 : 0);
        data.append('steiner', steiner === true ? 1 : 0);
        data.append('mcNamara', mcNamara === true ? 1 : 0);
        data.append('tweed', tweed === true ? 1 : 0);
        data.append('downs', downs === true ? 1 : 0);
        data.append('bjork', bjork === true ? 1 : 0);
        data.append('usp', usp === true ? 1 : 0);
        data.append('tejidosJarabak', tejidosJarabak === true ? 1 : 0);
        data.append('otrosAnalisis', otrosAnalisis);
        data.append('estado', 0);


        try {
            let respuesta = await axios.post(`${Global.url}/saveOrdenVirtual`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if(respuesta.data.status === "success"){
                Swal.fire('Agreado correctamente', '', 'success');
                navigate('/admin/ordenVirtual');
            }else{
                Swal.fire('Error al agregar el registro', '', 'error');
            }
        } catch (error) {
            console.log(error.request.response);
            // if(error.request.response.includes("telefono")){
            //     Swal.fire('Telefono invalido', '', 'error');
            // }else if(error.request.response.includes("celular")){
            //     Swal.fire('Celular invalido', '', 'error');
            // }else if(error.request.response.includes("nombre")){
            //     Swal.fire('Nombre invalido', '', 'error');
            // }else{
            //     Swal.fire('Error no encontrado', '', 'error');
            // }
        }
    }

    return (
        <div className="container col-md-9 mt-6">
            {loading === false ?
            <div className="card">
                <div className="card-header fw-bold">
                    Agregar orden Virtual:
                </div>
                <form className="p-4 needs-validation" onSubmit={saveOrdenVirtual}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-12 content_img">
                           <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 col-md-11">
                            <label className="form-label titulos_labels">DATOS DEL PACIENTE </label>
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-10 div_conten2">
                                    <label className="label_title">Nombres: </label>
                                    <input className="form-control form-control3" disabled autoFocus required
                                        value={nombres}
                                        type="text"
                                        onChange={(e) => setNombres(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-2 div_conten">
                                    <label className="label_title">Edad: </label>
                                    <input className="form-control form-control3" disabled autoFocus required
                                        value={edad}
                                        type="text"
                                        onChange={(e) => setEdad(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-5 div_conten2">
                                    <label className="label_title">Fecha de Nacimiento: </label>
                                    <input className="form-control form-control3" disabled autoFocus required
                                        value={fecha}
                                        type="text"
                                        onChange={(e) => setFecha(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-3 div_conten2">
                                    <label className="label_title">Sexo:</label>
                                    <span className=''>M</span>
                                    <input value={varon} type="checkbox" className='on_active' disabled onChange={(e) => setVaron(e.target.checked)} checked={varon} />
                                    <span className="">F</span>
                                    <input value={mujer} type="checkbox" className='on_active' disabled onChange={(e) => setMujer(e.target.checked)} checked={mujer}/>
                                </div>

                                <div className="mb-3 col-md-4 div_conten">
                                    <label className="label_title">Telefono: </label>
                                    <input className="form-control form-control3 form-control2"  disabled autoFocus required
                                        value={celular}
                                        type="text"
                                        onChange={(e) => setCelular(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten2">
                                    <label className="label_title " >Motivo de consulta: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={consulta}
                                        type="text"
                                        onChange={(e) => setConsulta(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='div_busqueda'>
                                <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>DATOS DEL DOCTOR(A) </label>
                                <label>Buscar:<input 
                                    value={search}
                                    maxLength={10}
                                    onChange={onSeachChange}
                                    type="text"  className="form-control form-control-sm" placeholder="" aria-controls="productos"/>
                                </label>
                            </div>
                            
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten2">
                                    <label className="label_title">Doctor(a): </label>
                                    <input className="form-control form-control3" required disabled
                                        value={odontologo}
                                        type="text"
                                        onChange={(e) => setOdontologo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title">C.O.P: </label>
                                    <input className="form-control form-control3" required disabled
                                        value={cop}
                                        type="text"
                                        onChange={(e) => setCop(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title">EMAIL: </label>
                                    <input className="form-control form-control3 form-control2" required disabled
                                        value={emailOdon}
                                        type="text"
                                        onChange={(e) => setEmailOdon(e.target.value)}
                                    />
                                </div>
                            </div>

                            <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>TOMOGRAFIA DENTAL 3D</label>
                            <div className='mb-3 col-md-12 div_general_box'>
                                <div className="mb-3 col-md-4 div_secundario">
                                    <label className="label_title col-md-12 ">CAMPO 3D GRANDE</label>
                                    <label className="label_title col-md-12 ">(13x14 - 13x16)</label>
                                    
                                    <div className='content_checkBox chsscjcon'>
                                        <input type="checkbox" className='on_active' onChange={(e) => setSenosMaxilares(e.target.checked)} checked={senosMaxilares}/>
                                        <span className=''>Senos Maxilares</span>
                                    </div>

                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active'  onChange={(e) => setAtm(e.target.checked)} checked={atm}/>
                                        <span className="">A.T.M (BA + BC)</span>
                                    </div>

                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' onChange={(e) => setOrtodoncia(e.target.checked)} checked={ortodoncia}/>
                                        <span className="">Ortodoncia-Ortognática</span>
                                    </div>
                                    <img className="img_boxes" src={grande} alt="" />
                                </div>
                                <div className="mb-3 col-md-4 div_secundario">
                                    <label className="label_title col-md-12 ">CAMPO 3D MEDIANO</label>
                                    <label className="label_title col-md-12 ">(8x6- 13x10)</label>
                                    
                                    <div className='content_checkBox chsscjcon'>
                                        <input type="checkbox" className='on_active'  onChange={(e) => setAreaPatologica(e.target.checked)} checked={areaPatologica}/>
                                        <span className=''>Area Patológica (Zona)</span>
                                    </div>

                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active'  onChange={(e) => setImplantes(e.target.checked)} checked={implantes}/>
                                        <span className="">Implantes</span>
                                    </div>

                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active'  onChange={(e) => setLocalizacionDiente(e.target.checked)} checked={localizacionDiente}/>
                                        <span className="">Localizacion de diente</span>
                                    </div>

                                    <img className="img_boxes" src={mediano} alt=""/>
                                
                                </div>
                                <div className="mb-3 col-md-4 div_secundario">
                                    <label className="label_title col-md-12 ">CAMPO 3D PEQUEÑO</label>
                                    <label className="label_title col-md-12 ">(4x4 -7x6)</label>
                                    
                                    <div className='content_checkBox chsscjcon'>
                                        <input type="checkbox" className='on_active'  onChange={(e) => setFracturaRadiocular(e.target.checked)} checked={fracturaRadiocular}/>
                                        <span className=''>Fractura radiocular</span>
                                    </div>

                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' onChange={(e) => setEndodoncia(e.target.checked)} checked={endodoncia}/>
                                        <span className="">Endodoncia</span>
                                    </div>

                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active'onChange={(e) => setAnatomia(e.target.checked)} checked={anatomia}/>
                                        <span className="">Anatomia endodontica</span>
                                    </div>

                                    <img className="img_boxes" src={pequeno} alt="" />
                                </div>
                            </div>

                            <div className='mb-3 col-md-12 div_bot_box'>
                                <div className='content_checkBox chk2'>
                                    <input type="checkbox" className='on_active' value={sinAnalisis} onChange={(e) => setSinAnalisis(e.target.checked)} checked={sinAnalisis}/>
                                    <span className=''>Sin analisis(Solo Software)</span>
                                </div>

                                <div className='content_checkBox'>
                                    <input type="checkbox" className='on_active' value={conAnalisis} onChange={(e) => setConAnalisis(e.target.checked)} checked={conAnalisis}/>
                                    <span className="">Con analisis</span>
                                </div>
                            </div>
                            <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>IMPLANTES / ENDODONCIA</label>

                            <div className='mb-3 col-md-12 div_box_generl_bot'>
                                <div className="mb-3 col-md-12 div_tercero">
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box18} onChange={(e) => setBox18(e.target.checked)} checked={box18}/>
                                        <span className=''>18</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box17} onChange={(e) => setBox17(e.target.checked)} checked={box17}/>
                                        <span className="">17</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box16} onChange={(e) => setBox16(e.target.checked)} checked={box16}/>
                                        <span className="">16</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box15} onChange={(e) => setBox15(e.target.checked)} checked={box15}/>
                                        <span className="">15</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box14} onChange={(e) => setBox14(e.target.checked)} checked={box14}/>
                                        <span className="">14</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box13} onChange={(e) => setBox13(e.target.checked)} checked={box13}/>
                                        <span className="">13</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box12} onChange={(e) => setBox12(e.target.checked)} checked={box12}/>
                                        <span className="">12</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box11} onChange={(e) => setBox11(e.target.checked)} checked={box11}/>
                                        <span className="">11</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box21} onChange={(e) => setBox21(e.target.checked)} checked={box21}/>
                                        <span className="">21</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box22} onChange={(e) => setBox22(e.target.checked)} checked={box22}/>
                                        <span className="">22</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box23} onChange={(e) => setBox23(e.target.checked)} checked={box23}/>
                                        <span className="">23</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box24} onChange={(e) => setBox24(e.target.checked)} checked={box24}/>
                                        <span className="">24</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box25} onChange={(e) => setBox25(e.target.checked)} checked={box25}/>
                                        <span className="">25</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box26} onChange={(e) => setBox26(e.target.checked)} checked={box26}/>
                                        <span className="">26</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box27} onChange={(e) => setBox27(e.target.checked)} checked={box27}/>
                                        <span className="">27</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box28} onChange={(e) => setBox28(e.target.checked)} checked={box28}/>
                                        <span className="">28</span>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3 col-md-12 '>
                                <div className="mb-3 col-md-12 div_tercero">
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box48} onChange={(e) => setBox48(e.target.checked)} checked={box48} />
                                        <span className=''>48</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box47} onChange={(e) => setBox47(e.target.checked)} checked={box47}/>
                                        <span className="">47</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box46} onChange={(e) => setBox46(e.target.checked)} checked={box46}/>
                                        <span className="">46</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box45} onChange={(e) => setBox45(e.target.checked)} checked={box45}/>
                                        <span className="">45</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box44} onChange={(e) => setBox44(e.target.checked)} checked={box44}/>
                                        <span className="">44</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box43} onChange={(e) => setBox43(e.target.checked)} checked={box43}/>
                                        <span className="">43</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box42} onChange={(e) => setBox42(e.target.checked)} checked={box42}/>
                                        <span className="">42</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box41} onChange={(e) => setBox41(e.target.checked)} checked={box41}/>
                                        <span className="">41</span>
                                    </div>

                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box31} onChange={(e) => setBox31(e.target.checked)} checked={box31}/>
                                        <span className="">31</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box32} onChange={(e) => setBox32(e.target.checked)} checked={box32}/>
                                        <span className="">32</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box33} onChange={(e) => setBox33(e.target.checked)} checked={box33}/>
                                        <span className="">33</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box34} onChange={(e) => setBox34(e.target.checked)} checked={box34}/>
                                        <span className="">34</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box35} onChange={(e) => setBox35(e.target.checked)} checked={box35}/>
                                        <span className="">35</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box36} onChange={(e) => setBox36(e.target.checked)} checked={box36}/>
                                        <span className="">36</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box37} onChange={(e) => setBox37(e.target.checked)} checked={box37}/>
                                        <span className="">37</span>
                                    </div>
                                    <div className='content_cuadrados'>
                                        <input type="checkbox" className='' value={box38} onChange={(e) => setBox38(e.target.checked)} checked={box38}/>
                                        <span className="">38</span>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-3 col-md-12 div_bot_box2'>
                                <span className='label_title2'>MUY IMPORTANTE: ¿El paciente es enviado con guias?</span>
                                <div className='content_checkBox'>
                                    <span className="">Si</span>
                                    <input type="checkbox" className='on_active'  value={siConGuias} onChange={(e) => setSiConGuias(e.target.checked)} checked={siConGuias} />
                                </div>
                                <div className='content_checkBox'>
                                    <span className="">No</span>
                                    <input type="checkbox" className='on_active'  value={noConGuias} onChange={(e) => setNoConGuias(e.target.checked)} checked={noConGuias} />
                                </div>
                            </div>

                            <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>RADIOGRACIAS EXTRAORALES</label>

                            <div className='mb-3 col-md-12 div_general_box'>
                                <div className="mb-3 col-md-6 div_secundario">
                                    <div className='content_checkBox chsscjcon'>
                                        <input type="checkbox" className='on_active' value={radiografiaPanoramica} onChange={(e) => setRadiografiaPanoramica(e.target.checked)} checked={radiografiaPanoramica}/>
                                        <span className=''>Radiografia Panoramica</span>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={radiografiaCefalometrica} onChange={(e) => setRadiografiaCefalometrica(e.target.checked)} checked={radiografiaCefalometrica}/>
                                        <span className="">Radiografia Cefalometrica</span>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={radiografiaCerpal} onChange={(e) => setRadiografiaCerpal(e.target.checked)} checked={radiografiaCerpal}/>
                                        <div className='content_span_2'>
                                            <span className="">Radiografia Carpal con Análisis</span>
                                            <span className="content_span_2__edad_color">(Edad)</span>
                                        </div>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={fotosExtraorales} onChange={(e) => setFotosExtraorales(e.target.checked)} checked={fotosExtraorales}/>
                                        <span className="">Fotos Extraorales</span>
                                    </div>
                                </div>
                                <div className="mb-3 col-md-6 div_secundario">
                                    <div className='content_checkBox chsscjcon'>
                                        <input type="checkbox" className='on_active' value={estudioAtm} onChange={(e) => setEstudioAtm(e.target.checked)} checked={estudioAtm}/>
                                        <span className=''>Estudio ATM <span className='color_Edad'>(Boca Abierta y cerrada)</span></span>
                                    </div>

                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={radiografiaPosterior} onChange={(e) => setRadiografiaPosterior(e.target.checked)} checked={radiografiaPosterior}/>
                                        <span className="">Radiografia Posteior - Interior <span className='color_Edad'>(Frontal)</span></span>
                                    </div>

                                    <div className='content_checkBox'>
                                        <span className="">Otros</span>
                                        <input className="form-control form-control3"  required 
                                        value={otrosRadiografias}
                                        type="text"
                                        onChange={(e) => setOtrosRadiografias(e.target.value)}
                                    />
                                    </div>
                                </div>
                            </div>

                            <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>PAQUETES ORTODONCICOS</label>
                            <div className='mb-3 col-md-12 div_general_box'>
                                <div className="mb-3 col-md-12 div_secundario">
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active on_active2' value={paquetesOrtodoncicosA} onChange={(e) => setPaquetesOrtodoncicosA(e.target.checked)} checked={paquetesOrtodoncicosA}/>
                                        <div className='checkbox_content_box checkbox_content_box4'>
                                            <span className='checkbox_content_box__1'>Paquetes Ortodoncicos A</span>
                                            <span className='checkbox_content_box__2'>(Panoramica, cefalometrica, 2 estudios cefalometricos, fotos extraorales, fotos intraorales)</span>
                                        </div>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active on_active2' value={paquetesOrtodoncicosB} onChange={(e) => setPaquetesOrtodoncicosB(e.target.checked)} checked={paquetesOrtodoncicosB}/>
                                        <div className='checkbox_content_box checkbox_content_box4'>
                                            <span className='checkbox_content_box__1'>Paquetes Ortodoncicos B</span>
                                            <span className='checkbox_content_box__2'>(Panoramica, cefalometrica, 1 estudio cefalometrico, fotos extraorales)</span>
                                        </div>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active on_active2' value={paquetesPediatricos} onChange={(e) => setPaquetesPediatricos(e.target.checked)} checked={paquetesPediatricos}/>
                                        <div className='checkbox_content_box checkbox_content_box4'>
                                            <span className='checkbox_content_box__1'>Paquetes Pediatricos</span>
                                            <span className='checkbox_content_box__2'>(Panoramica, cefalometrica, 1 estudio cefalometrico, radiografia carpal con analisis, fotos extraorales e intraorales)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>ANÁLISIS CEFALOMETRICOS DIGITALES</label>
                            <div className='mb-3 col-md-12 div_general_box div_general_box2'>
                                <div className="mb-3 col-md-3 div_secundario">
                                    <div className='content_checkBox chsscjcon'>
                                        <input type="checkbox" className='on_active' value={ricketts} onChange={(e) => setRicketts(e.target.checked)} checked={ricketts}/>
                                        <span className=''>Ricketts</span>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={schwartz} onChange={(e) => setSchwartz(e.target.checked)} checked={schwartz}/>
                                        <span className="">Schwartz</span>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={steiner} onChange={(e) => setSteiner(e.target.checked)} checked={steiner}/>
                                        <div className='content_span_2'>
                                            <span className="">Steiner</span>
                                        </div>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={mcNamara} onChange={(e) => setMcNamara(e.target.checked)} checked={mcNamara}/>
                                        <span className="">Mc Namara</span>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={tweed} onChange={(e) => setTweed(e.target.checked)} checked={tweed}/>
                                        <span className="">Tweed</span>
                                    </div>
                                </div>
                                <div className="mb-3 col-md-3 div_secundario div_secundario2">
                                    <div className='content_checkBox chsscjcon'>
                                        <input type="checkbox" className='on_active' value={downs} onChange={(e) => setDowns(e.target.checked)} checked={downs}/>
                                        <span className=''>Downs</span>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={bjork} onChange={(e) => setBjork(e.target.checked)} checked={bjork}/>
                                        <span className="">Bjork</span>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={usp} onChange={(e) => setUsp(e.target.checked)} checked={usp}/>
                                        <div className='content_span_2'>
                                            <span className="">U.S.P</span>
                                        </div>
                                    </div>
                                    <div className='content_checkBox'>
                                        <input type="checkbox" className='on_active' value={tejidosJarabak} onChange={(e) => setTejidosJarabak(e.target.checked)} checked={tejidosJarabak}/>
                                        <span className="">Tejidos-Jarabak</span>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-3 col-md-12 div_general_box div_general_box2'>
                                <div className="mb-3 col-md-8 div_secundario">
                                    <textarea type="text" className="form-control areas_textos" cols="50"  required  value={otrosAnalisis} onChange={(e) => setOtrosAnalisis(e.target.value)} placeholder='Otros:'></textarea>
                                </div>
                            </div>
                       </div>
                    </div>
                    <div className="d-flex gap-2 contentBtnRegistrar">
                        <input type="hidden" name="oculto" value="1" />
                        <Link to="/admin/ordenVirtual/validar" className="btn btn-danger btnCancelar">Cancelar</Link>
                        <input type="submit" className="btn btn-primary btnRegistrar" value="Continuar" />
                    </div>
                </form>
            </div>
            :<div className="dot-spinner dot-spinner3">
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
    )
}

export default AgregarOrdenVirtual