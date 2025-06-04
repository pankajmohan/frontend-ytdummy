import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader';

function Protected({children, authentication=true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state=>state.auth.status)
    console.log(authStatus);
    
    

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, navigate, authentication])
  return loader ? <Loader /> : <>{children}</>
}

export default Protected