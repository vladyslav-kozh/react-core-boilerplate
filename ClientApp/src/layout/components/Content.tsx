import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

const Content: React.FC = ({ children }) => {
  const location = useLocation()
  useEffect(() => {
  }, [location])

  return (
    <div >
      {children}
    </div>
  )
}

export { Content }
