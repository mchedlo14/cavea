import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/0')
  },[])
  return (
    <>
    </>
  )
}

export default App