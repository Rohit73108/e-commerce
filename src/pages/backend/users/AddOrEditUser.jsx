import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useFormData } from '../../../hooks/formData'
import { useDispatch, useSelector } from 'react-redux'
import { addUserStart, updateUserStart } from '../../../redux/action/user.action'
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase.config'


const initialState = {
  name: '',
  image : '',
  status : 0,
  contact : '',
  email:'',
  password:'',
  role : ''
}
function AddOrEditUser() {
  let {id} = useParams();
  const users = useSelector(state=>state.user.users)
  const dispatch = useDispatch()
  const [handleChange,
    formData,
    setFormData,
    buttonState,
    uploadFiles,] = useFormData(initialState,'user')
    const navigate = useNavigate()
    const {name,email,contact,status,image,password,role} = formData

       const submit = (event)=>{
       event.preventDefault()
     if(id){
       dispatch(updateUserStart(formData))
     }else{
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        dispatch(addUserStart({...formData,uid : userCredential.user.uid}))
  })
  .catch((error) => {
   console.log(error.message);
  });
     }
       setTimeout(()=>{
       navigate('/admin/user')
         },800)
       }
   
   const getUserById =()=>{
     let user = users.find((user)=>user.id === id)
     if(user){
       setFormData(user)
     }else{
       navigate('/admin/user')
     }
     
   }
   
     useEffect(()=>{
       if(id){
         getUserById()
       }
     },[id])
  return (
    <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">{id ? 'Edit' : 'Add' }Users</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">Add User</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className='card-header d-flex justify-content-between'>
              <h4 className="card-title fw-bold">{id ? 'Edit' : 'Add' }Users</h4>
              <Link to="/admin/user" className='btn btn-primary text-white button'>Back</Link>
            </div>
            </div>
            <form onSubmit={submit} action="" method="POST" encType="multipart/form-data">
        <div className=" "/>
         
    <label htmlFor='name' className="form-label">User Name</label>
    <input type="text" onChange={handleChange} name="name" value={name} className="form-control  " id="name" placeholder="Name"/> 

    <label htmlFor='image'  className="form-label mt-3"> Product Image</label>
    <input type="file" name="image" onChange={uploadFiles} className="form-control" id="image"/>
    {image && <img src={image}  className='mt-2' height={'80px'} width={'80px'}/>}
  <br></br>
    <label htmlFor='contact'  className="form-label mt-3">Contact</label>
    <input type="number" step='any' onChange={handleChange} name="contact" value={contact} className="form-control  " id="contact" placeholder="contact"/>
        
    <label htmlFor='email' className="form-label mt-3"> email</label>
    <input type="text" onChange={handleChange} name="email" value={email} className="form-control  " id="email" placeholder="email"/> 
 
 {!id && <div className='mb-3'><label htmlFor='password' className="form-label              mt-3">Password</label>
    <input type="password"  onChange={handleChange} name="password" value={password} className="form-control  " id="password" placeholder="password"/> </div>}

    <label className="form-label mt-3">Select Role</label>
   <select  value={role} onChange={handleChange}  name="role" id="role" className="form-control">
   <option value="">Select Role</option>
    <option value="1">Admin</option>
    <option value="0">Customer</option>
   </select>

  <label className="form-label mt-3">Select Status</label>
   <select  value={status} onChange={handleChange}  name="status" id="status" className="form-control">
   <option value="">select status</option>   
    <option value="1">Active</option>
    <option value="0">Inactive</option>
   </select>
 
    <div className="row mt-3 mb-2">
        <div className="col-sm-6 d-grid">
            <button type='submit' disabled={buttonState} className="btn btn-primary">{id ? 'Update' : 'Add' }</button>
        </div>
        <div className="col-sm-6 d-grid">
            <button type='reset' className="btn btn-warning">Reset</button>
        </div>
    </div>
    </form>
          </div>
            </div>
           </div>
    </>
  )
}

export default AddOrEditUser