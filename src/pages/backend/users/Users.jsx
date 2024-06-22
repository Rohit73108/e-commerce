import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserStart, getUserStart } from '../../../redux/action/user.action';
 
function Users() {
  const users = useSelector(state=>state.user.users)
  const dispatch = useDispatch();

  const handleDelete = (userDelete)=>{
    dispatch(deleteUserStart(userDelete));
    dispatch(getUserStart())
  }
 useEffect(()=>{
     dispatch(getUserStart())
  },[users.length])
  return (
    <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Users</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">Users</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title fw-bold">Users</h4>
              <Link to="create" className="btn btn-primary">Add Users</Link>
            </div>
            </div>
             
             <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
              {users.length > 0 && users.map((user,index)=>{
                 return <tr key={index}>
                  <th scope="row">{index +1}</th>
                  <td><img src={user.image} alt={user.name} height={"80px"}/></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.status == 1? 'Active' : 'Inactive'}</td>
                  <td>
                    <Link to={`/admin/user/edit/${user.id}`} className='btn btn-warning '>Edit</Link>
                    <button  onClick={()=>{handleDelete(user)}} className='btn btn-danger mx-1'>Delete</button>
                  </td>
                </tr>
                 })}
              </tbody>
            </table>
          </div>
            </div>
           </div>
         
    </>
  )
}

export default Users