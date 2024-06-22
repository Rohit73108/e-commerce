import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormData } from '../../../hooks/formData';
import Sidebar from '../../../layouts/Sidebar';
import { logoutUserStart, updateUserStart } from '../../../redux/action/user.action';

const initialState = {
  name: '',
  image : '',
  status : 0,
  contact : '',
  email:'',
  password:'',
}
function ProfileEdit() {
  let {id} = useParams();
  const users = useSelector(state=>state.user.users)
  const dispatch = useDispatch()
  const [handleChange,
    formData,
    setFormData,
    buttonState,
    uploadFiles,] = useFormData(initialState,'user')
    const navigate = useNavigate()
    const {name,email,contact,status,image,password} = formData

       const submit = (event)=>{
       event.preventDefault()
    
       dispatch(updateUserStart(formData))
       setTimeout(()=>{
        navigate('/admin/dashboard')
        // dispatch(logoutUserStart())
         },800)
       }
   
   const getUserById =()=>{
     let user = users.find((user)=>user.id === id)
     if(user){
       setFormData(user)
     
     }else{
       navigate('/admin/dashboard')
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
           <h1 className="text-center text-white display-6">Edit Profile</h1>
           <ul className="breadcrumb justify-content-center mb-0">
               <li className="breadcrumb-item"><Link href="/">Home</Link></li>
               <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
               <li className="breadcrumb-item active text-white">profile</li>
           </ul>
       </div>    
       <div className='container pt-4'>
          <div className='row'>
          <Sidebar/>
           <div className="card col-9">
           <div className="card-body">
           <div className='card-header d-flex justify-content-between'>
             <h4 className="card-title fw-bold">Edit Profile</h4>
             <Link to="/admin/dashboard" className='btn btn-primary text-white button'>Back</Link>
           </div>
           </div>
           <form onSubmit={submit} action="" method="POST" encType="multipart/form-data">
       <div className=" "/>
        
   <label htmlFor='name' className="form-label">User Name</label>
   <input type="text" onChange={handleChange} name="name" value={name} className="form-control  " id="name" placeholder="Name"/> 

   <label htmlFor='image'  className="form-label mt-3"> Profile Image</label>
   <input type="file" name="image" onChange={uploadFiles} className="form-control" id="image"/>
   {image && <img src={image}  className='mt-2' height={'80px'} width={'80px'}/>}
 <br></br>
   <label htmlFor='contact'  className="form-label mt-3">Contact</label>
   <input type="number" step='any' onChange={handleChange} name="contact" value={contact} className="form-control  " id="contact" placeholder="contact"/>
       
   <label htmlFor='email' className="form-label mt-3"> email</label>
   <input type="text" disabled={true} onChange={handleChange} name="email" value={email} className="form-control  " id="email" placeholder="email"/> 

{!id && <div className='mb-3'><label htmlFor='password' className="form-label              mt-3">Password</label>
   <input type="password"  onChange={handleChange} name="password" value={password} className="form-control  " id="password" placeholder="password"/> </div>}

   

 <label className="form-label mt-3">Select Status</label>
  <select  value={status} onChange={handleChange}  name="status" id="status" className="form-control">
   <option value="1">Active</option>
   <option value="0">Inactive</option>
  </select>

   <div className="row mt-3 mb-2">
       <div className="col-sm-6 d-grid">
           <button type='submit' disabled={buttonState} className="btn btn-primary"> Update </button>
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

export default ProfileEdit