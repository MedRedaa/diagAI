import cls from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import { MdHome, MdPhone } from "react-icons/md";
import { useRouter } from "next/router";
import { createAppointmentAPI } from "../api/common";
import AppointDoctorModal from "./AppointDoctorModal";

const sortFunc = function(a, b) {
  var keyA = new Date(a.createdAt),
    keyB = new Date(b.createdAt);
  // Compare the 2 dates
  if (keyA < keyB) return 1;
  if (keyA > keyB) return -1;
  return 0;
}

const Tag = ({ title }) => {
    return (
      <span className="text-[0.6rem] px-2 py-1 dark:bg-darkElevation-800 dark:text-gray-400 bg-gray-300 rounded-lg">
        {title}
      </span>
    );
  };
  const DoctorProfile = ({doctor, handleAppoint, role,patientId, appointedDoctors}) => {
    const [show,setShow] = useState(false);
    console.log(doctor)
    const [appointmentState, setAppointmentState] = useState(false);
    const handleClick = async ()=>{
      try {
        const res=  await createAppointmentAPI(patientId, doctor.uuid);
        console.log(res);
        setAppointmentState('pending')
      }catch(err) {
        console.log(err.response.data.message)
      }
    }

   

    

    useEffect(()=>{
      let isAppointed = false;
      isAppointed = appointedDoctors?.filter(app=>{
        if (app.doctor.uuid===doctor.uuid) return app;
      });
      if (isAppointed.length>0) {
        isAppointed.sort(sortFunc);
        const state = isAppointed[0].state;
        console.log(`${state} ${doctor.uuid}`);
        setAppointmentState(state);
      }
    }, [])

    return (
      <>
      <AppointDoctorModal show={show} onClose={()=>setShow(false)} patientId={patientId} doctorId={doctor.uuid}/>
      <div className="flex items-center rounded-md w-full p-2 px-2 bg-slate-50 dark:bg-darkElevation-500 dark:border-none  border-[1px]  border-gray-400">
        <div className="flex space-x-5 items-center w-full">
          <div className="pt-1 rounded-md">
            <Image
              className="rounded-lg"
              src={doctor.user.img}
              height={160}
              width={160}
            />
          </div>
          <div className="flex justify-between w-full">
            <div>
              <div className="text-sm font-semibold">Doctor {doctor.user.fullName}</div>
              <div className="text-[0.7rem] text-gray-500 mt-1">
               {doctor.medicalExperience} years of Experience | {doctor.degree} | {doctor.university}
                {/* {doctor.uuid} */}
              </div>
              <hr className="border-gray-400 my-2 dark:border-gray-600" />
              <div className="flex space-x-3 ">
                {doctor.specialities.map(s=>(
                  <Tag title={s.title} id={s.id}/>
                ))}
              </div>
              <div className="mt-4 flex space-x-3 items-center">
         
                <Link  href={`/doctors/${doctor.uuid}`}>
                  <div className="text-[0.7rem] cursor-pointer dark:border-darkPrimary border-primary border-[1px] text-primary dark:text-darkPrimary bg-opacity-90 hover:bg-opacity-100 w-fit p-1  rounded-md px-2" style={{color:"#009999",border:"2px solid black"}}>
                  View Profile
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <div className="w-[190px] space-y-2 px-3">
                <div className="flex space-x-2">
                  <MdHome className="text-primary" style={{color:"#009999"}} />
                  <div className="text-[0.7rem] dark:text-gray-300">
                    {doctor.address}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MdPhone className="text-primary" size={15} style={{color:"#009999"}} />
                  <div className="text-[0.7rem] dark:text-gray-300">{doctor.user.contact}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  };

  export default DoctorProfile;