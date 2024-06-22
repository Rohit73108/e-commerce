import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate} from 'react-router-dom'

function Auth() {
  const currentUser = useSelector(state=>state.user.currentUser)
  const navigate = useNavigate()
  const location = useLocation();
   
  useEffect(()=>{
    if(!currentUser.name){
       navigate('/login')
  }
   if(currentUser.role !== '1'){
    if(location.pathname.includes('product') || location.pathname.includes('category') ||location.pathname.includes('user') ){
      navigate('/admin/dashboard')
    }
   }

  },[currentUser.name])
  
  return (
    <div>Auth
    <Outlet/>
    </div>
    
  )
}

export default Auth