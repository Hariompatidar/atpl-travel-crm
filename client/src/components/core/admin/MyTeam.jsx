import React from 'react'
import CTAButton from '../../common/CTAButton'

const MyTeam = () => {
  return (
    <div className=''>
    <h1>My Team</h1>
    <CTAButton link={'/signup'} text={"+ Add New Member"} />
    </div>
  )
}

export default MyTeam