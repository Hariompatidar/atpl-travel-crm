import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({text,link}) => {
  return (
    <Link to={link} className='blurbg py-2 px-8'>{text}</Link>
  )
}

export default CTAButton