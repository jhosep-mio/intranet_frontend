import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../../../helper/Global';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';


const ListaCategoria = () => {
    const [categorias, setCategorias] = useState( [] );
    const [itemPagination, setItemPagination] = useState( [] );
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [cantidadRegistros] = useState(4);
    const [registros, setRegistros] = useState(0);


    useEffect ( () =>{
        getAllCategories();
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
        setRegistros(totalPosts);
    },[categorias,paginaActual])

    
    const getAllCategories= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allProducto`);
        setCategorias(request.data);
        setLoading(false);
    };

    const indexOfLastPost = paginaActual * cantidadRegistros;
    const indexOfFirstPost= indexOfLastPost - cantidadRegistros;
    let totalPosts = categorias.length;


    const filterDate = () =>{

        if(search.length === 0){
            let categorias2 = categorias.slice(indexOfFirstPost, indexOfLastPost);
            return categorias2;
        }

        const filter = categorias.filter(cate=> cate.nombre.includes(search));
        totalPosts= filter.length;
        return filter.slice(indexOfFirstPost, indexOfLastPost);
    }

    const onSeachChange = ({target}) =>{
        setpaginaActual(1);
        setSearch(target.value);
    }

    const deleteCategories = async (id) =>{
        await axios.delete(`${Global.url}/deleteProducto/${id}`);
        getAllCategories();
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
                            Lista de categorias
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
                                        <th scope="col" className="text-center">Nombre</th>

                                        <th scope="col" className="text-center">Categoria</th>

                                        <th scope="col" className="text-center">Imagen</th>

                                        {/* <!-- 3 --> */}
                                        <th scope="col" className="text-center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {filterDate().map( (categoria)=>(
                                        <tr key={categoria.id}>
                                            <td  className="text-center">
                                                {categoria.id}
                                            </td>

                                            <td  className="text-center">
                                                {categoria.nombre}
                                            </td>

                                            <td  className="text-center">
                                                {categoria.categoria}
                                            </td>

                                            <td  className="text-center">
                                               <img className="images" src={`${Global.urlImages}/productos/${categoria.imagen}`} alt="" />
                                            </td>

                                            {/* <!-- 9. Opciones --> */}
                                            <td className="text-center">
                                                <Link className="text-success" to={`/admin/categoria/editar/${categoria.id}`}>
                                                <FontAwesomeIcon icon={faPencil}/>
                                                </Link>
                                                <button className="text-danger btnEliminar" onClick={()=>{deleteCategories(categoria.id)}}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>

                            <div className="dataTables_info" id="productos_info" role="status" aria-live="polite">
                              {registros} Registros
                            </div>
                            
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

export default ListaCategoria