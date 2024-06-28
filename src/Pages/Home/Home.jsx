import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {

  const { data, isLoading, err } = useSelector((state) => state.products);

  if (isLoading) {
    return <div className='loader'></div>;
  }

  if (err) {
    return <div>{err}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className='container text-center py-3'>
      <div className="row g-3">
        {
          data.map((product, key) => (
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
      </div>
    </div >
  )
}

export default Home