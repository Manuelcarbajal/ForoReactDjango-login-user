import React, { useState } from 'react'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import CPU from '../media/cpu.png'

import { Portal, PopupInner, Title, Form, Input, Button } from '../components/portal/Portal'
import { FaHome } from "react-icons/fa";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse,faPaperPlane} from '@fortawesome/free-solid-svg-icons';
// // import { far } from '@fortawesome/free-regular-svg-icons'
// // import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faHouse,faPaperPlane)

const Header = () => {


  const [show, setShow] = useState(false)
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)

  const { userInfo } = userLogin;

  //funciones
  const handleClose = () => {
    setShow(false);
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  //junta de funcion sign out y cerrar
  const cerrar = () => {
    logoutHandler();
    setShow(false);
  }



  return (
    <div>
      <div className='header'>
        <div className='logo'>
          <img src={CPU} />
        </div>

        {userInfo ? //con esta condicional muestra solo el boton d eregister y login y si esta detro de la cuenta muestra perfil y lo demas
          <>
            <div className='Items'>
              <div className='perfile'>
                <button className='sesion' onClick={() => { setShow(true) }}>
                  <img src={`http://127.0.0.1:8000${userInfo.image}`} />
                </button>
              </div>
              <div className='mas'>
                <button><a href='/addBlog'><FontAwesomeIcon icon={faPaperPlane}/></a></button>
              </div>
              <div className='home'>
                <button><a href='/'><FontAwesomeIcon icon={faHouse} /></a></button>
                
              </div>
            </div>
          </>
          :
          <div >
            <div className="buttons">
              <button className="login-btn">
                <a href="/login">Sign in</a>
              </button>

              <button className="register-btn">
                <a href="/register">Sign up</a>
              </button>
            </div>
          </div>
        }

      </div>


      <Portal trigger={show} >
        <PopupInner>
          <Title>
            <h1><a href="/miPerfil">Your Perfile</a></h1>
            <h1><a onClick={cerrar}>Sign Out</a></h1>
          </Title>
          <Form>
            <Button>
              <button onClick={handleClose}> CLOSED</button>
            </Button>
          </Form>
        </PopupInner>
      </Portal>


    </div>
  )
}

export default Header
