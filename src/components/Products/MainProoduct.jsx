import React from 'react'
import { Link } from 'react-router-dom'

export const MainProoduct = ({products}) => {
    return (
        <>
            {
                products.map((product, key) => (
                    <div className="col-md-4" key={key}>
                        <div className="card h-100">

                            <Link to={`/ProductDetails/${product.id}`}>
                                <img src={product.image.mainImg} className="card-img-top w-50 mx-auto py-5" alt={product.image.mainImg} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                                <p className='fs-6 text-secondary'>{product.descriptionName}</p>
                                <p className="card-text">{product.description}</p>
                                <Link href="#" className="btn btn-primary">$ {product.price}</Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
