import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './includes/Navbar';
import useAuth from '../../hooks/useAuth';

export const PrivateLayout = () => {

  const { auth, loading } = useAuth({});

  if(loading === true){
    return <div className='centrarclase_do_spinner'>
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
            </div>
  }else{
    return (
      <>
        <Navbar/>
        <section className="home content-wapper">
          {auth.id ?
           <Outlet/>
           :
           <Navigate to="/login"/>
          }
        </section>
      
      </>
    )
  }
}