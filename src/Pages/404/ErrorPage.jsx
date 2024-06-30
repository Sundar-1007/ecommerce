import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <>
            <section className="py-5 errPage">
                <div
                    className="d-flex justify-content-center 
              align-items-center flex-column 
              text-center w-100"
                >
                    <div className="bg_img w-50"></div>
                    <div>
                        <p className="display-4">Looks Like You're Lost</p>
                        <p>The page you are looking for not available...</p>
                        <Link
                            to="/"
                            className="text-white text-decoration-none px-4 py-3 
                    bg-success d-inline-block mt-2 rounded"
                        >
                            Go to Home
                        </Link>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ErrorPage