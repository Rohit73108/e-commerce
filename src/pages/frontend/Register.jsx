import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormData } from '../../hooks/formData'
import { addUserStart } from '../../redux/action/user.action';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';


function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ err , setErr] = useState('')
   const [ handleChange,
    formData,
    setFormData,
    buttonState,
    uploadFiles ]= useFormData({
        name: '',
        email: '',
        password: '',
        image:'',
        contact:''
    })
    const {name,email,password,image,contact} = formData
    const submit = (event)=>{
      event.preventDefault()
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        dispatch(addUserStart({...formData,uid : userCredential.user.uid}))
        setTimeout(() => {
             navigate('/login')
        }, 800);
       
     
  })
  .catch((errr) => {
    setErr(errr.message)
  });
    }
  return (
    <>
         <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Register Page</h1>
            {/* <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/Register">Register</Link></li>
            </ul> */}
        </div>    
        <div className="container-fluid ">
<div className="row justify-content-center ">
	<div className="col-lg-6 mt-3 ">
		<div className="card text-white bg-primary">
				<h2 className="card-title text-white mt-3" align="center">Register</h2>
				<p className="card-text" align="center"> Please Register to be our new user</p>
				<hr className="border position-relative"/>
				<div className="card-body">
				<form onSubmit={submit} className="row g-3  needs-validation" action="" method="post"  >
             {err && <p className='text-center text-danger fw-bold'>{err}</p>}
                <label htmlFor="name" className="form-label">User name</label>
            <div className="input-group has-validation">                          
              <input type="text" onChange={handleChange} className="form-control rounded-pill" value={name} name="name" id="name" required/>
              </div>


              
            <label htmlFor="enteremail" className="form-label">Email</label>
            <div className="input-group has-validation">                          
              <input type="email" onChange={handleChange} className="form-control rounded-pill" value={email} name="email" id="enteremail"  aria-describedby="inputGroupPrepend" required/>
              <div className="invalid-feedback">
                Please Enter Valid Email.
              </div>
              
            </div>          

            <label htmlFor="password1" className="form-label">Password</label>
            <div className="input-group has-validation">                          
              <input type="password" onChange={handleChange} className="form-control rounded-pill" value={password} name="password" id="password1" required/>
            </div> 

            <label htmlFor="contact" className="form-label">Contact Number</label>
            <div className="input-group has-validation">                          
              <input type="number" onChange={handleChange} className="form-control rounded-pill" value={contact} name="contact" id="contact" required/>
              </div>

              <label htmlFor='image'  className="form-label"> User Image</label>
    <input type="file" name="image" onChange={uploadFiles} className="form-control" id="image"/>
    {image && <img src={image} className='mt-2' style={{height:'80px',width:'80px'}} />} 
            {/* <div className="col-6">
              <div className="form-check">
                <input className="form-check-input" name="remeberme" type="checkbox" value="" id="invalidCheck"/>
                <label className="form-check-label" htmlFor="invalidCheck">
                  Remember Me
                </label>
                
              </div>
            </div> */}

             {/* <div className="col-6" align="right">
              <a href="recover_email.php">Forgot Password</a>
            </div> */}

            <div className="col-md-12 text-center">
              <button className="btn bg-white text-dark col-6" title="Submit Your Form" aria-label="Left Align" name="log_user" type="submit"> <span className="fa fa-user mx-2" aria-hidden="true"></span>Register</button>
            </div>
            <span className="extra-line text-center">
              <span>Already have an account ?</span>
               
              <Link className='mx-2 text-dark' to='/login'>Login here</Link>
            
            </span>
          </form>
</div>
</div>		
</div>	
</div>
</div>
    </>
  )
}

export default Register