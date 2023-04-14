import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../../../helper/Global';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Swal from 'sweetalert2';
import { BsXCircle } from "react-icons/bs";

const ListaClinica = () => {

    const [clinicas, setClinicas] = useState( [] );
    const [itemPagination, setItemPagination] = useState( [] );
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [cantidadRegistros] = useState(4);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(0);
    let token = localStorage.getItem("token");

    useEffect ( () =>{
        const filter2 = clinicas.filter(cate => quitarAcentos(cate.nombre.toLowerCase()).includes(quitarAcentos(search.toLowerCase())));
        setCargandoBusqueda(filter2.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect ( () =>{
        getAllClinicas();
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
    },[clinicas,paginaActual,search])

    
    const getAllClinicas= async () =>{
        setLoading(true);

        const request = await axios.get(`${Global.url}/allClinicas`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setClinicas(request.data);
        setCargandoBusqueda(request.data.length);
        setLoading(false);
    };


    const indexOfLastPost = paginaActual * cantidadRegistros;
    const indexOfFirstPost= indexOfLastPost - cantidadRegistros;
    let totalPosts = clinicas.length;

    function quitarAcentos(cadena){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    } 

    const filterDate = () =>{
        if(search.length === 0){
            let clinica = clinicas.slice(indexOfFirstPost, indexOfLastPost);
            return clinica;
        }

        const filter = clinicas.filter(cate => quitarAcentos(cate.nombre.toLowerCase()).includes(quitarAcentos(search.toLowerCase())));
        totalPosts= filter.length;
        return filter.slice(indexOfFirstPost, indexOfLastPost);
    }

    const onSeachChange = ({target}) =>{
        setpaginaActual(1);
        setSearch(target.value);
    }

    const preguntar = (id) =>{
        Swal.fire({
            title: `¿Estas seguro de eliminar la clinica N° ${id}?`,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                deleteClinica(id);
            }
          })
    }

    const deleteClinica = async (id) =>{
        try {
            const resultado= await axios.delete(`${Global.url}/deleteClinica/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if(resultado.data.status === "success"){
                Swal.fire('Registro eliminado correctamente', '', 'success');
                getAllClinicas();
                setTimeout(()=>{
                    if(Math.round(totalPosts / cantidadRegistros) === paginaActual){

                    }else{
                        setpaginaActual(Math.round(totalPosts / cantidadRegistros));
                    }
                }, 1000);3

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
                        <div className="card-header text-center fs-5 fw-bolder">
                            Lista de Clinicas
                        </div>
                        <div className="p-4 table-responsive">
                            <div id="productos_filter" className="dataTables_filter">
                                <label>Buscar:<input 
                                value={search}
                                onChange={onSeachChange}
                                type="search" className="form-control form-control-sm" placeholder="" aria-controls="productos"/>
                                </label>
                            </div>
                           
                            <Table id="productos" className="table align-middle table-hover display">
                                <thead className="table-light">
                                    <tr>
                                        {/* <!-- 1 --> */}
                                        <th scope="col" className="text-center">ID</th>
                                        {/* <!-- 2 --> */}
                                        <th scope="col" className="text-left">Nombre</th>

                                        <th scope="col" className="text-left" >Dirección</th>

                                        <th scope="col" className="text-center">Telefono</th>

                                        <th scope="col" className="text-center">Celular</th>
                                        {/* <!-- 3 --> */}
                                        <th scope="col" className="text-center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    { loading === false ? filterDate().map( (clinica)=>(
                                        <tr key={clinica.id}>
                                            
                                            <td  className="text-center">
                                                {clinica.id}
                                            </td>

                                            <td  className="text-truncate trucate_text">
                                                {clinica.nombre}
                                            </td>

                                            <td  className="text-truncate trucate_text">
                                                {clinica.direccion}
                                            </td>

                                            <td  className="text-center">
                                                {clinica.telefono === null ?
                                                <BsXCircle/>
                                                : clinica.telefono}
                                            </td>

                                            <td  className="text-center">
                                                {clinica.celular}
                                            </td>

                                            {/* <!-- 9. Opciones --> */}
                                            <td className="text-center">
                                                <Link className="text-success" to={`/admin/clinicas/editar/${clinica.id}`}>
                                                <FontAwesomeIcon icon={faPencil}/>
                                                </Link>
                                                <button className="text-danger btnEliminar" onClick={()=>{preguntar(clinica.id)}}>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaClinica