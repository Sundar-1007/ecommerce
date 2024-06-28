import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../Slices/ProductDetailSlice';

const ProductDetails = () => {

  const { productid } = useParams();
  const dispatch = useDispatch();
  const { ProductDetailData, isLoading, error } = useSelector(state => state.productDetail)




  useEffect(() => {
    dispatch(getProductDetails(productid))
  }, [productid])

  useEffect(() => {
    console.log(ProductDetailData);
  }, [ProductDetailData])


  if (isLoading) {
    return <div className='loader'></div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (ProductDetailData) {
    return (
      <>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-5">
              <img src={ProductDetailData.image.mainImg} alt={ProductDetailData.image.mainImg} />
            </div>
            <div className="col-md-7">
              <p className='fs-5'>{ProductDetailData.productName}</p>
              <p className='lead'>{ProductDetailData.categoryType}</p>
              {ProductDetailData.offerPrice ? 
              <p><span className="text-decoration-line-through">{ProductDetailData.price}</span> {ProductDetailData.offerPrice}</p>
               : <p>{ProductDetailData.price}</p>}
               <p>{ProductDetailData.description}</p>
               <button className="btn btn-outline-success">Add to cart</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ProductDetails