import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';

export default function Home() {
    const [tab, setTab] = useState('tab-1')
    const categories = useSelector(state => state.category.categories);
    const products = useSelector(state => state.product.products);

    console.log(tab);

    useEffect(() => {

    }, [categories.length])

    return (
        <>
            <div className="container-fluid py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
                            <h1 className="mb-5 display-3 text-primary">Organic Veggies & Fruits Foods</h1>
                            <div className="position-relative mx-auto">
                                <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search" />
                                <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{
                                    top: 0, right: "25%"
                                }}>Submit Now</button>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active rounded">
                                        <img src="img/hero-img-1.png" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                        <Link href="#" className="btn px-4 py-2 text-white rounded">Fruites</Link>
                                    </div>
                                    <div className="carousel-item rounded">
                                        <img src="img/hero-img-2.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <Link href="#" className="btn px-4 py-2 text-white rounded">Vesitables</Link>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1>Our Organic Products</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item">
                                        <Link className={tab === 'tab-1' ? `d-flex m-2 py-2 bg-light rounded-pill active` : 'd-flex m-2 py-2 bg-light rounded-pill'}
                                            data-bs-toggle="pill" href="#tab-1" onClick={() => setTab(`tab-1`)}>
                                            <span className="text-dark" style={{ width: "130px" }}>All Products</span>
                                        </Link>
                                    </li>
                                    {
                                        categories.length > 0 && categories.map((category, index) => (
                                            <li className="nav-item" key={index}>
                                                <a className={tab === `tab-${index + 2}` ? `d-flex m-2 py-2 bg-light rounded-pill active` : 'd-flex m-2 py-2 bg-light rounded-pill'}
                                                    data-bs-toggle="pill" href={`tab-${index + 2}`} onClick={() => setTab(`tab-${index + 2}`)}>
                                                    <span className="text-dark" style={{ width: "130px" }}>{category.name}</span>
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div id="tab-1" className={tab === 'tab-1' ? `tab-pane fade show p-0 active` : 'tab-pane fade show p-0'}>
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {
                                                products.length > 0 && products.map((product, index) => (
                                                    <ProductItem product={product} key={index} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                categories.length > 0 && categories.map((category, index) => (
                                    <div id="tab-2" className={tab === `tab-${index + 2}` ? `tab-pane fade show p-0 active` : 'tab-pane fade show p-0'} key={index}>
                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="row g-4">
                                                    {
                                                        products.length > 0 && products.map(product=> {
                                                            if(product.category === category.name) {
                                                                return (
                                                                    <ProductItem product={product} key={product.id}/>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
