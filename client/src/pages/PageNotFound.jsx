import React from 'react'
import CTAButton from '../components/common/CTAButton'

const PageNotFound = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5'>
    <h1 className='text-4xl font-semibold'>This page is not Found</h1>
    <CTAButton link={"/"} text={"Back to Home page"}/>
    </div>
  )
}

export default PageNotFound