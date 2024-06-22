import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useFormData } from '../../../hooks/formData'
import { addProductStart, updateProductStart } from '../../../redux/action/products.action'
import { useDispatch, useSelector } from 'react-redux'


const initialState = {
    name : '',
    image : '',
    status : 0,
    description : '',
    category : '',
    price : 0,
    slug : '',
    quantity : 0,
  }
  function AddOrEditProducts() {
    const products = useSelector(state => state.product.products)
    const categories = useSelector(state => state.category.categories)
    const navigate = useNavigate()
    const {id} = useParams()
   const dispatch = useDispatch()
    const [
      handleChange,
      formData,
      setFormData,
      buttonState,
      uploadFiles] = useFormData(initialState ,'product')

      let {
      name,
      image,
      status,
      description ,
      category ,
      price  ,
      slug,
      quantity} = formData
   
      const getProductById =()=>{
        let product = products.find((product)=>product.id === id)
        if(product){
          setFormData(product)
        }else{
          navigate('/admin/product')
        }
        
      }

    const submit = (event)=>{
    event.preventDefault()
    if(id){
     dispatch(updateProductStart(formData))
    }else{
      dispatch(addProductStart(formData))
    }
     setTimeout(() => {
      navigate('/admin/product')
     }, 800);
    }
    useEffect(()=>{
      if(id){
        getProductById()
      }
    },[id])
  return (
    <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">{id ? 'Edit' : 'Add' }Products</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">Add Product</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className='card-header d-flex justify-content-between'>
              <h4 className="card-title fw-bold">{id ? 'Edit' : 'Add' }Products</h4>
              <Link to="/admin/product" className='btn btn-primary text-white button'>Back</Link>
            </div>
            </div>
            <form onSubmit={submit} action="" method="POST" encType="multipart/form-data">
        <div className=" "/>
         
    <label htmlFor='name' className="form-label">Product Name</label>
    <input type="text" onChange={handleChange} name="name" value={name} className="form-control  " id="name" placeholder="Name"/> 

    <label htmlFor='slug' className="form-label mt-3">Slug Name</label>
    <input type="text" name="slug" onChange={handleChange} value={slug} className="form-control  " id="slug" placeholder="Slug"/>

    <label htmlFor='image'  className="form-label mt-3"> Product Image</label>
    <input type="file" name="image" onChange={uploadFiles} className="form-control" id="image"/>
    {image && <img src={image}  className='mt-2 mb-2' height={'80px'} width={'80px'}/>}
<br></br>

    <label htmlFor='description' className="form-label mt-3">Description</label>
    <textarea type="text" name="description" rows={10} value={description} className="form-control" onChange={handleChange} id="description" placeholder="Description"/> 

    <label htmlFor='price'  className="form-label mt-3">Price</label>
    <input type="number" step='any' onChange={handleChange} name="price" value={price} className="form-control  " id="price" placeholder="Price"/>

    <label htmlFor='quantity' className="form-label mt-3">Quantity</label>
    <input type="number" onChange={handleChange} step='any' name="quantity" value={quantity} className="form-control" id="quantity" placeholder="Quantity"/>

    <label htmlFor='category' className="form-label mt-3">Product Category</label>
   <select  value={category} onChange={handleChange}  name="category" id="category" className="form-control">
   <option value="" hidden>Select Category</option>
   {categories.length > 0 && categories.map((category,index) =>{
    if(category.status === '1'){
      return <option value={category.name} key={index}>{category.name}</option>
    }
   })}
   </select>
        
  <label className="form-label mt-3">Select Status</label>
   <select  value={status} onChange={handleChange}  name="status" id="status" className="form-control">
    
    <option value="1">Active</option>
    <option value="0">Inactive</option>
   </select>
 
    <div className="row mt-3 mb-2">
        <div className="col-sm-6 d-grid">
            <button type='submit' className="btn btn-primary">{id ? 'Update' : 'Add' }</button>
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

export default AddOrEditProducts