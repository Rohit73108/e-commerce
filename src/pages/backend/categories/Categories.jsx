import React, { useEffect } from 'react'
import { Link} from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryStart, getCategoryStart } from '../../../redux/action/category.action'

function Categories() {
  const categories = useSelector(state=>state.category.categories)
  const dispatch = useDispatch();

  const handleDelete = (categoryDelete)=>{
    dispatch(deleteCategoryStart(categoryDelete));
    dispatch(getCategoryStart())
  }
 useEffect(()=>{
     dispatch(getCategoryStart())
  },[categories.length])
  return (
    <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Categories</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="#">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">Categories</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title fw-bold">Categories</h4>
              <Link to="create" className="btn btn-primary">Add Category</Link>
            </div>
            </div>
             
             <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                 {categories.length > 0 && categories.map((category,index)=>{
                 return <tr key={index}>
                  <th scope="row">{index +1}</th>
                  <td><img src={category.image} alt={category.name} height={"80px"}/></td>
                  <td>{category.name}</td>
                  <td>{category.status == 1? 'Active' : 'Inactive'}</td>
                  <td>
                    <Link to={`/admin/category/edit/${category.id}`} className='btn btn-warning '>Edit</Link>
                    <button  onClick={()=>{handleDelete(category)}} className='btn btn-danger mx-1'>Delete</button>
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

export default Categories