import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MainProoduct } from '../../components/Products/MainProoduct';

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
        <MainProoduct products={data} />
      </div>
    </div >
  )
}

export default Home