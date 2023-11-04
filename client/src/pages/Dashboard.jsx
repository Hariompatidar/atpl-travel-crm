import React from 'react'
import Search from '../components/common/Search'
import CTAButton from '../components/common/CTAButton'
import {MdNotificationsNone} from 'react-icons/md'
import { Link } from 'react-router-dom'
import AnaCountSmallCard from '../components/common/AnaCountSmallCard';

const AnaCountSmallCardData=[
  {
    id:1,
    heading:"Total Leads",
    number:"214613",
    btntxt:"+14.06%",
    btncolor:"bg-green-500",
  },
  {
    id:2,
    heading:"30 Days Revenue",
    number:"1528790",
    btntxt:"-5.89%",
    btncolor:"bg-red-500",
  },
  {
    id:3,
    heading:"Today's Leads",
    number:"143",
    btntxt:"+7.69%",
    btncolor:"bg-green-500",
  },
  {
    id:4,
    heading:"Today's Leads",
    number:"143",
    btntxt:"+7.69%",
    btncolor:"bg-green-500",
  },
]

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-2 p-2'>
      {/* div for the top search and other things */}
      <div className='flex gap-2 justify-end'>
        <Search/>
        <CTAButton link={'/newLead'} text={'New Lead'}/>
        <Link className="blurfull rounded-full p-2" to={'/notification'}>
        <MdNotificationsNone className="w-5 h-5"/>
        </Link>
      </div>

      {/* div for the blurcards  */}
      <div className='flex gap-2 flex-wrap'>
            {
              AnaCountSmallCardData.map(data=>(
                <AnaCountSmallCard key={data.id} heading={data.heading} number={data.number} btntxt={data.btntxt} btncolor={data.btncolor}/>
              ))
            }
          </div>

      <div className='w-full flex'>
        <div className='flex flex-col w-[70%] h-[500px] border'>
          
        </div>
        <div className='flex flex-col gap-2 w-[30%] h-[500px] border'>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard