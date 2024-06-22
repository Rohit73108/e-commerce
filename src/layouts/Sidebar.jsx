import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { logoutUserStart } from '../redux/action/user.action'


function Sidebar() {
  const currentUser = useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const logout = ()=>{
    dispatch(logoutUserStart())
    setTimeout(() => {
       navigate('/login')
    }, 1000);
  }

  useEffect(()=>{
  console.log(currentUser , currentUser.role);
  },[currentUser.role])
  return (
    <div className='col-sm-3'>
           <ul className="list-group ">
              <li className="list-group-item active" aria-current="true">Slidebar</li>
              <Link to={'/admin/dashboard'} className="list-group-item">Profile</Link>
              <Link to={'/admin/order'} className="list-group-item">Order</Link>

               {
                currentUser.role === '1'
                && <>
               <Link to={'/admin/category'} className="list-group-item ">Category</Link>
              <Link to={'/admin/product'} className="list-group-item">Product</Link>
              <Link to={'/admin/user'} className="list-group-item">User</Link>
               </>}

              <Link onClick={logout} className="list-group-item text-danger">
              Logout</Link>
            

           </ul>
           </div>
  )
}

export default Sidebar