import React, { useState, useEffect } from 'react'
import '../../index.css';
import PuffLoader from 'react-spinners/PuffLoader'
const Loader = ({ movieData }) => {
    const [loadin, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        if (movieData.length > 0) {
            setLoading(false)
        }
    }, [])

    return (
        <div className='loader__wrapper'>
            <PuffLoader color="#36d7b7" />
        </div>
    )
}

export default Loader