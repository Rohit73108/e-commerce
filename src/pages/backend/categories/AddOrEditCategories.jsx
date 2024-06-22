import React, { useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryStart, updateCategoryStart } from '../../../redux/action/category.action'
import { useFormData } from '../../../hooks/formData'
const initialState = {
    name: '',
    image : '',
    status : 0,
  }
  function AddOrEditCategories() {
  let {id} = useParams();
  const categories = useSelector(state=>state.category.categories)
  const dispatch = useDispatch()
  const [handleChange,
    formData, 
    buttonState,
    uploadFiles,setFormData] = useFormData(initialState,'category')

  const navigate = useNavigate()
 const {name,status,image} = formData

    const submit = (event)=>{
    event.preventDefault()
  if(id){
    dispatch(updateCategoryStart(formData))
  }else{
    dispatch(addCategoryStart(formData))
  }
    setTimeout(()=>{
    navigate('/admin/category')
      },800)
    }

const getCategoryById =()=>{
  let category = categories.find((category)=>category.id === id)
  if(category){
    setFormData(category)
  }else{
    navigate('/admin/category')
  }
  
}

  useEffect(()=>{
    if(id){
      getCategoryById()
    }
  },[id])
  return (
    <> 
     <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">{id ? 'Edit' : 'Add'} Category</h1>
            <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link href="#">Home</Link></li>
                <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
                <li className="breadcrumb-item active text-white">{id ? 'Edit' : 'Add'} Category</li>
            </ul>
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card col-9">
            <div className="card-body">
            <div className='card-header d-flex justify-content-between'>
              <h4 className="card-title fw-bold">{id ? 'Add category':'Edit Category'}</h4>
              <Link to="/admin/category" className='btn btn-primary text-white button'>Back</Link>
            </div>
            </div>
            <form onSubmit={submit} action="" method="POST" encType="multipart/form-data">
        <div className=" "/>
         
    <label htmlFor='name' className="form-label ">Category Name</label>
    <input onChange={handleChange} type="name" name="name" value={name} className="form-control  " id="name" placeholder="Name"/> 
        
  <label className="form-label">Category Status</label>
   <select  value={status} onChange={handleChange} name="status" id="status" className="form-control">
    <option value="" hidden>Select Status</option>
    <option value="1">Active</option>
    <option value="0">Inactive</option>
   </select>
 
    <label htmlFor='image'  className="form-label"> Category Image</label>
    <input type="file" name="image" onChange={uploadFiles} className="form-control" id="image"/>
    {image && <img src={image} className='mt-2' height={'80px'} width={'80px'}/>}
    

    <div className="row mt-3 mb-2">
        <div className="col-sm-6 d-grid">
            <button type='submit' disabled={buttonState} className="btn btn-primary">{id ? 'UPDATE':'Add'}</button>
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

export default AddOrEditCategories