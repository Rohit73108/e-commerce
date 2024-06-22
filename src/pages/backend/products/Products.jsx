import React, { useEffect } from 'react'
import { Link} from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductStart, getProductStart } from '../../../redux/action/products.action';
 
function Products() {
  const products = useSelector(state=>state.product.products)
  const dispatch = useDispatch();

  const handleDelete = (productDelete)=>{
    dispatch(deleteProductStart(productDelete));
    dispatch(getProductStart())
  }
 useEffect(()=>{
     dispatch(getProductStart())   
  },[products.length])
  return (
    <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Products</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">Products</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title fw-bold">Products</h4>
              <Link to="create" className="btn btn-primary">Add Product</Link>
            </div>
            </div>
             
             <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope='col'>Category</th>
                  <th scope="col">Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
              {products.length > 0 && products.map((product,index)=>{
                 return <tr key={index}>
                  <th scope="row">{index +1}</th>
                  <td><img src={product.image} alt={product.name} height={"80px"}/></td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.status == 1? 'Active' : 'Inactive'}</td>
                  <td>
                    <Link to={`/admin/product/edit/${product.id}`} className='btn btn-warning '>Edit</Link>
                    <button  onClick={()=>{handleDelete(product)}} className='btn btn-danger mx-1'>Delete</button>
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

export default Products