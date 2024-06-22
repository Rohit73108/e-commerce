import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addCartStart } from '../../redux/action/cart.action'
import useCart from '../../hooks/useCart'

function Details() {
    const {id} = useParams()
     const currentCart = useSelector(state => state.cart.currentCart)
     const categories = useSelector(state => state.category.categories)
    const item = currentCart.items.find(item => item.id === id)
  const [product,setProduct] = useState({})
 
  const products = useSelector(state=>state.product.products)
 
 const currentUser = useSelector(state=>state.user.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addCart,updateCart,] = useCart()
 
    const [quantities, setQuantities] = useState(item.purchaseQuantity)
    
   
 

 const getProductById =()=>{
  
    
  let product = products.find((product)=>product.id === id)
  if(product){
    setProduct(product)

    let item = currentCart.items.find(item => item.id === product.id)
    if(item){
        setQuantities(item.purchaseQuantity)

    }
  }else{
    navigate('/')
    
  }
  
}
 
const handleClickIncrease = () => {
    // const updatedQuantities = [...quantities[index]];
    // updatedQuantities[index]++;
     setQuantities(quantities+1);
  let data =   updateCart({...currentCart} , item , quantities +1)
  dispatch(addCartStart(data)) 
}

const handleClickDecrease = () => {
    if (quantities > 1) {
    //   const updatedQuantities = [...quantities[index]];
    //   updatedQuantities[index]--;
       setQuantities(quantities-1);
    let data =   updateCart({...currentCart} , item , quantities -1)
    dispatch(addCartStart(data)) 
    }
}  

const addToCart = (event)=>{
    if(!currentUser.name){
        navigate('/login')
   }event.preventDefault()
     let data = addCart({...currentCart} , product , currentUser , quantities )
     dispatch(addCartStart(data))
}

useEffect(()=>{
      
if(!currentUser.name){
    navigate('/login') }
if(id){ 
    getProductById()
  } 
},[id,products.length , currentUser.name , currentCart.items.length])
   
  return ( <div> 
    <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Product Detail</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                <li className="breadcrumb-item active text-white">Product Detail</li>
            </ol>
        </div>
        <div className="container-fluid py-5 mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4" >
                            <div className="col-lg-6">
                                <div className="border rounded">
                                    <a href="#">
                                        <img src={product.image} className="img-fluid rounded" alt=""/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h4 className="fw-bold mb-3">{product.name}</h4>
                                <p className="mb-3">Category: {product.category}</p>
                                <h5 className="fw-bold mb-3">${product.price}</h5>
                                <div className="d-flex mb-4">
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <p className="mb-4">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p>
                                <p className="mb-4">Susp endisse ultricies nisi vel quam suscipit. Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish</p>
                                <div className="input-group quantity mt-4" style={{width: "100px"}}>
                                        <div className="input-group-btn">
                                            <button onClick={()=>{handleClickDecrease()}}   className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input disabled  onChange={()=>{}}  type="number" className="bg-white form-control form-control-sm text-center border-0" value={quantities}/>
                                        <div className="input-group-btn">
                                            <button onClick={()=>{handleClickIncrease()}} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                <button onClick={addToCart} className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</button>
                            </div>
                            <div className="col-lg-12">
                                <nav>
                                    <div className="nav nav-tabs mb-3">
                                        <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                            id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                            aria-controls="nav-about" aria-selected="true">{product.description}</button>
                                        <button className="nav-link border-white border-bottom-0" type="button" role="tab"
                                            id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                            aria-controls="nav-mission" aria-selected="false">Reviews</button>
                                    </div>
                                </nav>
                                <div className="tab-content mb-5">
                                    <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                        <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc. 
                                            Susp endisse ultricies nisi vel quam suscipit </p>
                                        <p>Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish filefish Antarctic 
                                            icefish goldeye aholehole trumpetfish pilot fish airbreathing catfish, electric ray sweeper.</p>
                                        <div className="px-2">
                                            <div className="row g-4">
                                                <div className="col-6">
                                                    <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Weight</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">1 kg</p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Country of Origin</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">Agro Farm</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Quality</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">Organic</p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Сheck</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">Healthy</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Min Weight</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">250 Kg</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                                        <div className="d-flex">
                                            <img src="img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{width: "100px", height: "100px"}} alt=""/>
                                            <div className="">
                                                <p className="mb-2" style={{fontSize : "14px"}}>April 12, 2024</p>
                                                <div className="d-flex justify-content-between">
                                                    <h5>Jason Smith</h5>
                                                    <div className="d-flex mb-3">
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic 
                                                    words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <img src="img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{width: "100px", height: "100px"}} alt=""/>
                                            <div className="">
                                                <p className="mb-2" style={{fontSize : "14px"}}>April 12, 2024</p>
                                                <div className="d-flex justify-content-between">
                                                    <h5>Sam Peters</h5>
                                                    <div className="d-flex mb-3">
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <p className="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic 
                                                    words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="nav-vision" role="tabpanel">
                                        <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                                            amet diam et eos labore. 3</p>
                                        <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                            Clita erat ipsum et lorem et sit</p>
                                    </div>
                                </div>
                            </div>
                            <form action="#">
                                <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="border-bottom rounded">
                                            <input type="text" className="form-control border-0 me-4" placeholder="Yur Name *"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="border-bottom rounded">
                                            <input type="email" className="form-control border-0" placeholder="Your Email *"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="border-bottom rounded my-4">
                                            <textarea name="" id="" className="form-control border-0" cols="30" rows="8" placeholder="Your Review *" spellCheck="false"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="d-flex justify-content-between py-3 mb-5">
                                            <div className="d-flex align-items-center">
                                                <p className="mb-0 me-3">Please rate:</p>
                                                <div className="d-flex align-items-center" style={{fontSize: "12px"}}>
                                                    <i className="fa fa-star text-muted"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <a href="#" className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <div className="col-lg-12">
                                <div className="input-group w-100 mx-auto d-flex mb-4">
                                    <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1"/>
                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                </div>
                                <div className="mb-4">
                                    <h4>Categories</h4>
                                    <ul className="list-unstyled fruite-categorie">
                                    {categories.length > 0 && categories.map((category,index)=>{
                                        return   <li key={index}>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="/admin/product"><i className="fas fa-apple-alt me-2"></i>{category.name}</a>
                                                <span>(3)</span>
                                            </div>
                                        </li>
                                    })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <h4 className="mb-4">Featured products</h4>
                                {products.length > 0 && products.map((item,index) =>{
                                      return<div className="d-flex align-items-center justify-content-start" key={index}>
                                    <div className="rounded m-2" style={{width: "50px", height: "50px"}}>
                                        <img src={item.image} className="img-fluid rounded" alt={item.name}/>
                                    </div>
                                    <div>
                                        <h6 className="mb-2">{item.name}</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">${item.price}</h5>
                                            <h5 className="text-danger text-decoration-line-through">${item.price + ( item.price/2)}</h5>
                                        </div>
                                    </div>
                                </div>
                                    })}
  
                            </div>
                            <div className="col-lg-12">
                                <div className="position-relative">
                                    <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt=""/>
                                    <div className="position-absolute" style={{top: "50%", right: "10px", transform: "translateY(-50%)"}}>
                                        <h3 className="text-secondary fw-bold">Fresh <br/> Fruits <br/> Banner</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="fw-bold mb-0">Related products</h1>
                <div className="vesitable">
                    <div className="owl-carousel vegetable-carousel justify-content-center">
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Banana</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Bell Papper</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Potatoes</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Potatoes</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-Productping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
    )
}

export default Details