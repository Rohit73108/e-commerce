import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function OrdersView() {
  const {id} = useParams()
  const [order,setOrder] = useState({})
  const orders = useSelector(state=>state.order.orders)
  const navigate = useNavigate()
  
  const getOrderById = ()=>{
    let order = orders.find(order => order.id === id)

    if(order){
      setOrder(order)
    }else{
      navigate('/admin/orders')
    }
  }

  useEffect(()=>{
      if(!id){
        navigate('/admin/order')
      }
      getOrderById()
  },[id])
  return (
 
      <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Order View</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="#">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">order view</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title fw-bold">#Order Id - {order.id}</h4>
              <Link to="/admin/order" className="btn btn-primary">Back</Link>
            </div>
            </div>
             <div className='card-body'>
                <div>
                  <h5>Order Summary</h5>
                  <hr/>
                  <p>Sub-Total : ${order.subTotal}</p>
                  <hr/>
                  <p>Tax : ${order.tax}</p>
                  <hr/>
                  <p>Grand-Total : ${order.grandTotal}</p>
                  <hr/>

                </div>
             </div>
             <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Total</th>
                </tr>
              </thead>
              <tbody>
               {order.items?.length > 0 && order.items?.map((item,index) =>{
              return <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td className="py-5"><img src={item.image} alt={item.name} height={'50px'}/></td>
                        <td className="py-5">{item.name}</td>
                        <td className="py-5">${item.price}</td>
                        <td className="py-5">{item.purchaseQuantity}</td>
                        <td className="py-5">${+item.price * item.purchaseQuantity}</td>
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

export default OrdersView