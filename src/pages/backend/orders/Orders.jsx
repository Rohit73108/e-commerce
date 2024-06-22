import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layouts/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderStart } from '../../../redux/action/order.action'


function Orders() {
  const [orders , setOrders] = useState([])
  const currentUser = useSelector(state=>state.user.currentUser)
 const orderState = useSelector(state=>state.order.orders)
 const dispatch = useDispatch()

const getOrderById = ()=>{
  let serachOrder = orderState.filter(ord=> ord.customer.id === currentUser.id)
  setOrders(serachOrder)
}


 useEffect(()=>{
   dispatch(getOrderStart())
   if(currentUser.role !== '1'){
     getOrderById()
  }else{
   setOrders(orderState)
  }
 },[orderState.length])
  return (
    <> 
     <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Orders</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">Orders</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title fw-bold">Orders</h4>
            </div>
            </div>
             
             <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  {/* <th scope="col">Image</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Sub total</th>
                  <th scope="col">Tax</th>
                  <th scope='col'>Grand Total</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
              {orders.length > 0 && orders.map((order,index)=>{
                 return <tr key={index}>
                  <th scope="row">{index +1}</th>
                  {/* <td><img src={order.items[index].image} alt={order.items[index].name} height={"80px"}/></td> */}
                  <td>{order.customer.name}</td>
                  <td>{order.subTotal}</td>
                  <td>{order.tax}</td>
                  <td>{order.grandTotal}</td>
                  <td>
                    <Link to={`/admin/order/view/${order.id}`}  className='btn btn-info me-2 '>View</Link>
                  </td>
                </tr>
                 })}
              </tbody>
            </table>
          </div>
            </div>
           </div>
         
    </>
    </>
  )
}

export default Orders