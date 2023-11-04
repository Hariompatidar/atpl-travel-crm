import React from 'react'
import { Link } from 'react-router-dom';
import Graphpng from "../../assets/Graph.png"


const AnaCountSmallCard = ({heading,number,btntxt,btncolor}) => {
  return (
    <Link to={"/analytics"} className='relative blurcard flex flex-col gap-1 p-3 w-[calc(25%-8px)]'>
       <p className='text-[1.5vmax] font-medium'>{heading}</p>
        <p className='text-[3vmax] font-semibold'>{number}</p>
        <div className={`${btncolor} p-2 rounded-md max-w-max`}>{btntxt}</div>
        <img src={Graphpng} alt='graph' loading='lazy' width={80} className='absolute right-3 bottom-3'/>
    </Link>
  )
}

export default AnaCountSmallCard