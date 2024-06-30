import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProducts } from '../../Slices/UserDetailSlice';
import { Link } from 'react-router-dom';
import { MainProoduct } from '../../components/Products/MainProoduct';

const Cart = () => {
  const { userData, isLoading, cartProducts } = useSelector(state => state.UserDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div className="loader"></div>
  }

  if (!cartProducts.length > 0) {
    return <div className='container'>No Product is there in Cart</div>
  }

  return (
    <>
      <div className="container text-center py-3">
        <div className="row g-3">
          <MainProoduct products={cartProducts}/>
        </div>
      </div>
    </>
  )
}

export default Cart