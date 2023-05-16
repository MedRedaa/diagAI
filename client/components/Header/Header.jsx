import React from 'react';
import {MdSearch} from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Header = ({profile}) => {
  const user = useSelector((state)=>state.user.data);
  const router = useRouter();
    const page = ''
    let black=profile.image;
  return (
  <div className="flex pt-8 " style={{marginLeft:1280}}>
      
      {page!=='profile'&&<div className='flex items-center space-x-6'>
      <div className="flex flex-col text-right">
              <div className='font-medium text-[0.9rem]'>{user?.fullName || 'None'}</div>
              <div className="text-gray-600 text-[0.9rem] cursor-pointer hover:underline hover:text-primary" onClick={()=>router.push('/edit')}>Edit Profile</div>
          </div>
          <div className={`rounded-full w-12 hover:scale-110 transition-all cursor-pointer border-2 border-primary h-12 bg-black)`} style={{background : `url(${user?.img || profile.image}) center center/cover`}}></div>
      </div>}
  </div>);
};

Header.defaultProps = {
    profile : {
    name : 'oussakel',
    image : 'https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png'
    }
}


export default Header;
