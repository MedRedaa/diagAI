import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user";
import {BsFillSunFill} from 'react-icons/bs'
import {
  MdHome,
  MdAccessAlarms,
  MdLogout,
  MdDarkMode,
} from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import {BsChatDots} from "react-icons/bs";
import { useRouter } from "next/dist/client/router";



const SideBarIcon = ({ icon, text = "tooltip 💡", link, onClick }) => {
  const router = useRouter();
  const handleClick = ()=>router.push(link)
  const isActive = router.pathname===link;
  return (
    <div onClick={link?handleClick:onClick} className={`sidebar-icon group ${isActive?'activeIcon':''}`}>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

const Sidebar = ({setDarkMode, darkMode}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = ()=>{

    dispatch(logoutUser(router))
  }
  return (
    <div className="fixed top-0 rounded-tr-2xl rounded-br-2xl scale-0 sm:scale-100 left-0 h-screen w-24 m-0 flex flex-col pt-36 dark:bg-darkElevation-100 text-white shadow-lg" style={{ backgroundColor: '#009999' }}>
      <SideBarIcon
        link="/"
        icon={<MdHome size="28" />}
        text="Dashboard🏥"
      />
      <SideBarIcon
        link="/doctors"
        icon={<MdSearch size="27" />}
        text="Search 🔎"
      />
      <SideBarIcon icon={<FaRobot size="23" />} link="/diagnosis" text="AI Diagnosis 🤖" />
      <SideBarIcon icon={<BsChatDots size="26" />} link="/chatbot" text="Appointments🕛" />
      
      <div className="logout-icon group" onClick={handleLogout}>
        <MdLogout></MdLogout>
        <span className="sidebar-tooltip group-hover:scale-100" >Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
