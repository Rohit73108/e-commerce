import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { addCartStart} from '../redux/action/cart.action'

export default function ProductItem({product}) {
    const  currentCart = useSelector(state => state.cart.currentCart)
    const currentUser = useSelector(state => state.user.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addCart] = useCart()
 
    const addToCart = (event)=>{
        if(!currentUser.name){
            navigate('/login')
       }event.preventDefault()
         let data = addCart({...currentCart} , product , currentUser )
         dispatch(addCartStart(data))
    }

    const toProductDetailsPage = (id)=>{
         navigate(`/details/${id}`)
    }
    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="rounded position-relative fruite-item">
                <div className="fruite-img">
                    <img onClick={()=>toProductDetailsPage(product.id)} src={product.image} className="img-fluid w-100 rounded-top" alt={product.name} />
                </div>
                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>Fruits</div>
                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                    <h4 onClick={()=>toProductDetailsPage(product.id)}>{product.category}</h4>
                    <p>{product.shortDescription}</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                        <Link  onClick={addToCart} className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
