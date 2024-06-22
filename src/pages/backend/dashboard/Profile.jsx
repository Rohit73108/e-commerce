import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useSelector } from 'react-redux'

function Profile() {
  const currentUser = useSelector(state=>state.user.currentUser)
  useEffect(()=>{

  },[currentUser.image])

  return (
    <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Profile</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="#">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">Profile</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title fw-bold">Profile</h4>
              <Link to= {`/admin/edit/${currentUser.id}`} className="btn btn-primary">Edit Profile</Link>
            </div>
            <h5 className='mt-3'>User Image :  {currentUser.image && <img src={currentUser.image} height={"80px"} width={'80px'} alt={currentUser.name} />} </h5>
            <h5 className='mt-3'>Name : {currentUser.name}</h5>
            <h5 className='mt-3'>Contact Number : {currentUser.contact}</h5>
            <h5 className='mt-3'>Email : {currentUser.email}</h5>
            </div>
             
        
          </div>
            </div>
           </div>
         
    </>
  )
}

export default Profile