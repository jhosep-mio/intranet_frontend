import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../../../helper/Global';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Swal from 'sweetalert2';


const ListaClientes = () => {
    const [pacientes, setPacientes] = useState( [] );
    const [odontologos, setOdontologos] = useState( [] );

    const [itemPagination, setItemPagination] = useState( [] );
    const [itemPaginationOdonto, setItemPaginationOdonto] = useState( [] );


    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [paginaActual, setpaginaActual] = useState(1);
    const [paginaActualOdonto, setPaginaActualOdonto] = useState(1);

    const [cantidadRegistros] = useState(4);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(0);
    const [cargandoBusqueda2, setCargandoBusqueda2] = useState(0);
    const [activo, setActivo] = useState(0);

    let token = localStorage.getItem("token");

    useEffect ( () =>{
        const filter2 = pacientes.filter((cate) => {
            return (
                quitarAcentos(cate.nombres.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.apellido_m.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.apellido_p.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.correo.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.numero_documento_paciente_odontologo.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                cate.celular.toString().includes(search)
            );
        });
        setCargandoBusqueda(filter2.length);


        const filter3 = odontologos.filter((cate) => {
            return (
                quitarAcentos(cate.nombres.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.apellido_m.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.apellido_p.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.correo.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.cop.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.numero_documento_paciente_odontologo.toLowerCase()).includes(quitarAcentos(search.toLowerCase()))
            );
        });
        setCargandoBusqueda2(filter3.length);
    }, [search]);

    useEffect ( () =>{
        getAllPacientes();
        getAllOdontologos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() =>{
        let items= [];
        if(paginaActual > 1){
            items.push(<li key="previous" className="paginate_button page-item previous" id="productos_previous" onClick={()=>{setpaginaActual(paginaActual - 1)}}  >
                            <Link aria-controls="productos" className="page-link">Anterior</Link>
                         </li>);
        }else{
            items.push(<li key="previous" className="paginate_button page-item previous disabled" id="productos_previous" >
                        <Link aria-controls="productos" className="page-link">Anterior</Link>
                    </li>);
        }
        for(let i =1; i <= Math.ceil(totalPosts / cantidadRegistros); i++){
            items.push(<Pagination.Item key={i} active={i=== paginaActual} onClick={(e)=>{setpaginaActual(i)}}>{i}</Pagination.Item>);
        }

        if(paginaActual < Math.ceil(totalPosts / cantidadRegistros)){
            items.push(<li key="next" className="paginate_button page-item next" id="productos_next" onClick={()=>{setpaginaActual(paginaActual + 1)}}>
                            <Link aria-controls="productos" className="page-link">Siguiente</Link>
                        </li>);
        }else{
            items.push(<li key="next" className="paginate_button page-item next disabled" id="productos_next">
                            <Link aria-controls="productos" className="page-link">Siguiente</Link>
                        </li>);
        }
        setItemPagination(items);
    },[pacientes,paginaActual,search]);


    useEffect(() =>{
        let items= [];
        if(paginaActualOdonto > 1){
            items.push(<li key="previous" className="paginate_button page-item previous" id="productos_previous" onClick={()=>{setPaginaActualOdonto(paginaActualOdonto - 1)}}  >
                            <Link aria-controls="productos" className="page-link">Anterior</Link>
                         </li>);
        }else{
            items.push(<li key="previous" className="paginate_button page-item previous disabled" id="productos_previous" >
                        <Link aria-controls="productos" className="page-link">Anterior</Link>
                    </li>);
        }
        for(let i =1; i <= Math.ceil(totalPostsOdonto / cantidadRegistros); i++){
            items.push(<Pagination.Item key={i} active={i=== paginaActualOdonto} onClick={(e)=>{setPaginaActualOdonto(i)}}>{i}</Pagination.Item>);
        }

        if(paginaActualOdonto < Math.ceil(totalPostsOdonto / cantidadRegistros)){
            items.push(<li key="next" className="paginate_button page-item next" id="productos_next" onClick={()=>{setPaginaActualOdonto(paginaActualOdonto + 1)}}>
                            <Link aria-controls="productos" className="page-link">Siguiente</Link>
                        </li>);
        }else{
            items.push(<li key="next" className="paginate_button page-item next disabled" id="productos_next">
                            <Link aria-controls="productos" className="page-link">Siguiente</Link>
                        </li>);
        }
        setItemPaginationOdonto(items);
    },[odontologos,paginaActualOdonto,search]);

    const cambiarActivo = (id) =>{
        setActivo(id);
    }

    const getAllPacientes= async () =>{
        setLoading(true);

        const request = await axios.get(`${Global.url}/allPacientes`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setPacientes(request.data);
        setCargandoBusqueda(request.data.length);
        setLoading(false);
    };

    const getAllOdontologos= async () =>{
        setLoading(true);

        const request = await axios.get(`${Global.url}/allOdontologos`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setOdontologos(request.data);
        setCargandoBusqueda2(request.data.length);
        setLoading(false);
    };

    const indexOfLastPost = paginaActual * cantidadRegistros;
    const indexOfFirstPost= indexOfLastPost - cantidadRegistros;
    let totalPosts = pacientes.length;

    const indexOfLastPostOdonto = paginaActualOdonto * cantidadRegistros;
    const indexOfFirstPostOdonto= indexOfLastPostOdonto - cantidadRegistros;
    let totalPostsOdonto = odontologos.length;

    function quitarAcentos(cadena){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    } 

    const filterDate = () =>{
        if(search.length === 0){
            let paciente = pacientes.slice(indexOfFirstPost, indexOfLastPost);
            return paciente;
        }

        const filter = pacientes.filter((cate) => {
            return (
                quitarAcentos(cate.nombres.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.apellido_m.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.apellido_p.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.correo.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.numero_documento_paciente_odontologo.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                cate.celular.toString().includes(search)
            );
        });

        totalPosts= filter.length;
        return filter.slice(indexOfFirstPost, indexOfLastPost);
    }

    const filterDateOdontologos = () =>{
        if(search.length === 0){
            let odontologo = odontologos.slice(indexOfFirstPostOdonto, indexOfLastPostOdonto);
            return odontologo;
        }

        const filter = odontologos.filter((cate) => {
            return (
                quitarAcentos(cate.nombres.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.apellido_m.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.apellido_p.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.correo.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.cop.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
                quitarAcentos(cate.numero_documento_paciente_odontologo.toLowerCase()).includes(quitarAcentos(search.toLowerCase()))
            );
        });

        totalPosts= filter.length;
        return filter.slice(indexOfFirstPostOdonto, indexOfLastPostOdonto);
    }

    const onSeachChange = ({target}) =>{
        setpaginaActual(1);
        setPaginaActualOdonto(1);
        setSearch(target.value);
    }

    const preguntar = (id) =>{
        Swal.fire({
            title: `¿Estas seguro de eliminar al paciente N° ${id}?`,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                deletePaciente(id);
            }
          })
    }

    const preguntar2 = (id) =>{
        Swal.fire({
            title: `¿Estas seguro de eliminar al odontologo N° ${id}?`,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                deleteOdontologo(id);
            }
          })
    }

    const deletePaciente = async (id) =>{
        try {
            const resultado= await axios.delete(`${Global.url}/deletePaciente/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(resultado.data.status);
            
            if(resultado.data.status === "success"){
                Swal.fire('Registro eliminado correctamente', '', 'success');
                getAllPacientes();
                setTimeout(()=>{
                    if(Math.round(totalPosts / cantidadRegistros) === paginaActual){

                    }else{
                        setpaginaActual(Math.round(totalPosts / cantidadRegistros));
                    }
                }, 1000);
            }else{
                Swal.fire('Error al eliminar el registro', '', 'error');
            }
        } catch (error) {
                Swal.fire('Error al eliminar el registro', '', 'error');
        }
    }

    const deleteOdontologo = async (id) =>{
        try {
            const resultado= await axios.delete(`${Global.url}/deletePaciente/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(resultado.data.status);
            
            if(resultado.data.status === "success"){
                Swal.fire('Registro eliminado correctamente', '', 'success');
                getAllPacientes();
                setTimeout(()=>{
                    if(Math.round(totalPostsOdonto / cantidadRegistros) === paginaActualOdonto){

                    }else{
                        setItemPaginationOdonto(Math.round(totalPostsOdonto / cantidadRegistros));
                    }
                }, 1000);
            }else{
                Swal.fire('Error al eliminar el registro', '', 'error');
            }
        } catch (error) {
                Swal.fire('Error al eliminar el registro', '', 'error');
        }
    }

    return (
        <div className="container mt-6 ms-5-auto">
            <div className="row justify-content-center">
                {/* TAMAÑO DE LA TABLA WIDTH  */}
                <div className="col-md-11">

                    <div className="d-grid">
                        <input type="hidden" name="oculto" value="1" />
                        <Link type="submit" className="btn btn-primary mb-3" to="agregar"> <FontAwesomeIcon icon={faPlus}/> Registrar</Link>
                    </div>
                    {/* <!--==== TABLA PRODUCTOS ====--> */}
                    <div className="card">
                        <div className="card-header text-center fs-5 fw-bolder" style={{transition: 'all 500ms'}}>
                            Lista de {activo === 0 ? "Pacientes" : "Odontologos" } 
                        </div>
                        <div className='content_top_filters'>
                                <div className='content_top_filters__buttons'>
                                    <button onClick={() => cambiarActivo(0)} style={{
                                                backgroundColor: 0 === activo ? '#11284A' : 'transparent',
                                                color: 0 === activo ? 'white' : '#11284A'
                                    }}>Pacientes</button>
                                    <button onClick={() => cambiarActivo(1)} style={{
                                                backgroundColor: 1 === activo ? '#11284A' : 'transparent',
                                                color: 1 === activo ? 'white' : '#11284A'
                                    }}>Odontologos</button>
                                </div>
                                <div id="productos_filter" className="dataTables_filter">
                                    <label>Buscar:<input 
                                    value={search}
                                    onChange={onSeachChange}
                                    type="search" className="form-control form-control-sm" placeholder="" aria-controls="productos"/>
                                    </label>
                                </div>
                        </div>
                        
                        {activo === 0 ?
                        <div className="p-4 table-responsive odon_pacientes">
                            <Table id="productos" className="table align-middle table-hover display">
                                <thead className="table-light">
                                    <tr>
                                        {/* <!-- 1 --> */}
                                        <th scope="col" className="text-center">ID</th>
                                        {/* <!-- 2 --> */}
                                        <th scope="col" className="text-center">Nombre</th>

                                        <th scope="col" className="text-center">Apellidos</th>

                                        <th scope="col" className="text-center">N°Documento</th>

                                        <th scope="col" className="text-center">Correo</th>

                                        <th scope="col" className="text-center">Numero</th>

                                        {/* <!-- 3 --> */}
                                        <th scope="col" className="text-center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    { loading === false ? filterDate().map( (paciente)=>(
                                        <tr key={paciente.id}>
                                            
                                            <td  className="text-center">
                                                {paciente.id}
                                            </td>

                                            <td  className="text-center">
                                                {paciente.nombres}
                                            </td>

                                            <td  className="text-center">
                                                {paciente.apellido_p} {paciente.apellido_m}
                                            </td>

                                            <td  className="text-center">
                                                {paciente.numero_documento_paciente_odontologo}
                                            </td>

                                            <td  className="text-center">
                                                {paciente.correo}
                                            </td>

                                            <td  className="text-center">
                                                {paciente.celular}
                                            </td>

                                            {/* <!-- 9. Opciones --> */}
                                            <td className="text-center">
                                                <Link className="text-success" to={`/admin/clientes/editar/paciente/${paciente.id}`}>
                                                <FontAwesomeIcon icon={faPencil}/>
                                                </Link>
                                                <button className="text-danger btnEliminar" onClick={()=>{preguntar(paciente.id)}}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </td>
                                        </tr>
                                    )) : 
                                    <tr colSpan="6" align="center" rowSpan="5">
                                        <td colSpan="6">
                                            <div className="dot-spinner">
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    }

                                </tbody>
                            </Table>

                            <div className="dataTables_info" id="productos_info" role="status" aria-live="polite">
                              {
                              cargandoBusqueda
                              } Registros</div>
                            
                             <div className="dataTables_paginate paging_simple_numbers" id="productos_paginate">
                                <Pagination>
                                    {itemPagination.map((item) =>{
                                        return item;
                                    })}
                                </Pagination>
                            </div> 
                        </div>
                        : 
                        
                        <div className="p-4 table-responsive odon_pacientes">
                            <Table id="productos" className="table align-middle table-hover display">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="text-center">ID</th>

                                        <th scope="col" className="text-center">COD</th>

                                        <th scope="col" className="text-center">Nombre</th>

                                        <th scope="col" className="text-center">Apellidos</th>

                                        <th scope="col" className="text-center">N°Documento</th>

                                        <th scope="col" className="text-center">Correo</th>

                                        {/* <!-- 3 --> */}
                                        <th scope="col" className="text-center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    { loading === false ? filterDateOdontologos().map( (odontolo)=>(
                                        <tr key={odontolo.id}>
                                            
                                            <td  className="text-center">
                                                {odontolo.id}
                                            </td>

                                            <td  className="text-center">
                                                {odontolo.cop}
                                            </td>

                                            <td  className="text-center">
                                                {odontolo.nombres}
                                            </td>

                                            <td  className="text-center">
                                                {odontolo.apellido_p} {odontolo.apellido_m}
                                            </td>

                                            <td  className="text-center">
                                                {odontolo.numero_documento_paciente_odontologo}
                                            </td>

                                            <td  className="text-center">
                                                {odontolo.correo}
                                            </td>

                                            {/* <!-- 9. Opciones --> */}
                                            <td className="text-center">
                                                <Link className="text-success" to={`/admin/clientes/editar/odontologos/${odontolo.id}`}>
                                                <FontAwesomeIcon icon={faPencil}/>
                                                </Link>
                                                <button className="text-danger btnEliminar" onClick={()=>{preguntar2(odontolo.id)}}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </td>
                                        </tr>
                                    )) : 
                                    <tr colSpan="6" align="center" rowSpan="5">
                                        <td colSpan="6">
                                            <div className="dot-spinner">
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    }

                                </tbody>
                            </Table>

                            <div className="dataTables_info" id="productos_info" role="status" aria-live="polite">
                              {
                              cargandoBusqueda2
                              } Registros</div>
                            
                             <div className="dataTables_paginate paging_simple_numbers" id="productos_paginate">
                                <Pagination>
                                    {itemPaginationOdonto.map((item) =>{
                                        return item;
                                    })}
                                </Pagination>
                            </div> 
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaClientes