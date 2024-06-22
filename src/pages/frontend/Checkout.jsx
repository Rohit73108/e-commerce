import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormData } from '../../hooks/formData'
import { placeOrderStart } from '../../redux/action/order.action'

const initialState = {
  name :'',
  email:'',
  companyName : '',
  address : '',
  city : '',
  state : '',
  country : '',
  zipCode : '',
  contact : '',
}


function Checkout() {
  const currentCart = useSelector(state=>state.cart.currentCart)
  const currentUser = useSelector(state=>state.user.currentUser)
  const [handleChange,formData,setFormData,,,] = useFormData(initialState,'');
  const { name,email,companyName,address,city,state,country,zipCode,contact} = formData
 const navigate = useNavigate()
 const dispatch = useDispatch()
  
 const submit = (event)=>{
  event.preventDefault()
  const orderPlaced = {...currentCart , billingAddress : formData , placeOrder : true}
  dispatch(placeOrderStart(orderPlaced))

  setTimeout(() => {
    navigate('/thankyou')
  }, 1000);
 }
  useEffect(()=>{
    if(!currentUser.name){
       navigate('/login')
  }
  setFormData((preValue)=>({
    ...preValue,
    name:currentUser.name,
    contact :currentUser.contact,
    email : currentUser.email
   }))
 
  },[currentUser.name , currentCart.items.length])
  return (
    <>
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Checkout</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                <li className="breadcrumb-item active text-white">Checkout</li>
            </ol>
        </div>
        <div className="container-fluid py-5">
            <div className="container py-5">
                <h1 className="mb-4">Billing details</h1>
                <form onSubmit={submit}>
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Name<sup>*</sup></label>
                                        <input type="text"
                                        onChange={handleChange}
                                        name='name'
                                        value={name} className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Company Name<sup>*</sup></label>
                                <input onChange={handleChange} name='companyName' value={companyName} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Address <sup>*</sup></label>
                                <input onChange={handleChange} name='address' value={address} type="text" className="form-control" placeholder="House Number Street Name"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Town/City<sup>*</sup></label>
                                <input onChange={handleChange} name='city' value={city} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">State<sup>*</sup></label>
                                <input onChange={handleChange} name='state' value={state} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Country<sup>*</sup></label>
                                <input onChange={handleChange} name='country' value={country} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                <input onChange={handleChange} name='zipCode' value={zipCode} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Mobile<sup>*</sup></label>
                                <input onChange={handleChange} name='contact' value={contact} type="tel" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Email Address<sup>*</sup></label>
                                <input onChange={handleChange} name='email' value={email} type="email" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {currentCart.items.length > 0 && currentCart.items.map((item,index)=>{
                                      return<tr key={index}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center mt-2">
                                                    <img src={item.image} className="img-fluid rounded-circle" style={{width: "90px", height: "90px"}} alt={item.name}/>
                                                </div>
                                            </th>
                                            <td className="py-5">{item.name}</td>
                                            <td className="py-5">${item.price}</td>
                                            <td className="py-5">{item.purchaseQuantity}</td>
                                            <td className="py-5">${+item.price * item.purchaseQuantity}</td>
                                        </tr>
                                    })}
                                        
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-3">Subtotal</p>
                                            </td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">${currentCart.subTotal}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-4">Tax</p>
                                            </td>
                                            <td colSpan="3" className="py-5">
                                            <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">${currentCart.tax}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                            </td>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">${currentCart.grandTotal}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Delivery-1" name="Delivery" value="Delivery"/>
                                        <label className="form-check-label" htmlFor="Delivery-1">Cash On Delivery</label>
                                    </div>
                                </div>
                            </div>
                       
                            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"> for Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Checkout