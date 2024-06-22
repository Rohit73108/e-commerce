import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addCartStart } from '../../redux/action/cart.action';
import useCart from '../../hooks/useCart';

function Cart() {
    const currentUser = useSelector(state=>state.user.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [,updateCart , deleteCart] = useCart()
  const currentCart = useSelector(state => state.cart.currentCart)
    const [quantities, setQuantities] = useState(currentCart.items.map(item => item.purchaseQuantity))
    const item = currentCart.items.map(item => item)

    const handleClickIncrease = (index) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index]++;
         setQuantities(updatedQuantities);
      let data =   updateCart({...currentCart} , item[index] , quantities[index] +1)
      dispatch(addCartStart(data)) 
    }

    const handleClickDecrease = (index) => {
        if (quantities[index] > 1) {
          const updatedQuantities = [...quantities];
          updatedQuantities[index]--;
           setQuantities(updatedQuantities);
        let data =   updateCart({...currentCart} , item[index] , quantities[index] -1)
        dispatch(addCartStart(data)) 
        }
    }

    const handleDelete = (index)=>{
      let data =   deleteCart({...currentCart} , item[index])
      dispatch(addCartStart(data)) 
    }
    useEffect(()=>{
      if(!currentUser.name){
         navigate('/login')
    }
    },[currentUser.name , currentCart.items.length])
  return (
    <> 
   ccc
 <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Products</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Handle</th>
                          </tr>
                        </thead>
                        <tbody>
                            {currentCart.items.length > 0 && currentCart.items.map((item,index)=>{
                              return <tr key={index}>
                                <th scope="row" >
                                    <div className="d-flex align-items-center" key={index}>
                                        <img src={item.image} className="img-fluid me-5 rounded-circle" style={{width: '80px', height: '80px'}} alt={item.name}/>
                                    </div>
                                </th>
                                <td>
                                    <p className="mb-0 mt-4"> {item.name}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">${item.price}</p>
                                </td>
                                <td>
                                    <div className="input-group quantity mt-4" style={{width: "100px"}}>
                                        <div className="input-group-btn">
                                            <button onClick={()=>{handleClickDecrease( index)}}   className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input disabled  onChange={()=>{}}  type="number" className="bg-white form-control form-control-sm text-center border-0" value={quantities[index]}/>
                                        <div className="input-group-btn">
                                            <button onClick={()=>{handleClickIncrease( index)}} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">${+item.price *  quantities[index]}</p>
                                </td>
                                <td>
                                    <button onClick={()=>{handleDelete(index)}} className="btn btn-md rounded-circle bg-light border mt-4" >
                                        <i className="fa fa-times text-danger"></i>
                                    </button>
                                </td>
                            
                            </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5">
                    <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code"/>
                    <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                </div>
                <div className="row g-4 justify-content-end">
                    <div className="col-8"></div>
                    <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div className="bg-light rounded">
                            <div className="p-4">
                                <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="mb-0 me-4">Subtotal:</h5>
                                    <p className="mb-0">${currentCart.subTotal}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h5 className="mb-0 me-4">Shipping</h5>
                                    <div className="">
                                        <p className="mb-0">${currentCart.tax}</p>
                                    </div>
                                </div>
                                <p className="mt-2 mb-0 text-start">Shipping to Location.</p>
                            </div>
                            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                <h5 className="mb-0 ps-4 me-4">Total</h5>
                                <p className="mb-0 pe-4">${currentCart.grandTotal}</p>
                            </div>
                            <Link className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" to={'/checkout'}>Proceed Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>)
        }
        


export default Cart