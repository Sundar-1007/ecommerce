import React, { useEffect, useState } from 'react'

const AddCart = ({ ProductDetailData }) => {
    const [userData, setUserData] = useState();
    useEffect(() => {
        setUserData(userData);
    }, [ProductDetailData]);

    const handleCartAdd = () => {
         
    }

    return (
        <>
            <button className="btn btn-outline-success" onClick={handleCartAdd}>Add to cart</button>
        </>
    )
}

export default AddCart