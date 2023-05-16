import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllUserDetailsAPI } from '../../api/common';
import { getDoctorsAPI } from '../../api/doctor';
import { getAllAppointedDoctors, getAllAppointments, getDiagnosis, getDiagnosisData } from '../../api/patient';
import DoctorProfile from "../../components/DoctorCard";
import { updateUser } from '../../redux/actions/user';
import { verifyAuthentication } from '../../utils/verifyAuth';


export const getServerSideProps = async(ctx) => {
    const auth = verifyAuthentication(ctx.req);
    let appointedDoctors = [];
    const id = ctx.query.id;
    if (!auth.state) {
        return {
          redirect : {
            destination : '/'
          }
        }
      }
      const userData = await getAllUserDetailsAPI(auth.decodedData.uuid);
      auth.decodedData = userData.data;
      if (auth.decodedData.isNew) return {redirect : {destination : '/new'}}
    if (auth.decodedData.role!=='patient') {
        return {
          notFound : true
        }
    }
    try {
        const diagnosis = await getDiagnosisData(id);
        let results = await getAllAppointments(auth.decodedData.additionalData.uuid);
        const doctorsFound = await getDoctorsAPI(JSON.stringify(diagnosis.data), 0);
        appointedDoctors = results.data;
        return {
            props : {diagnosis : diagnosis.data, user : auth.decodedData, appointedDoctors, doctorsFound : doctorsFound.data.doctorsFiltered}
        }
    }catch(err) {
        console.log(err);
        return {
            notFound  :true
        }
    }
}

const Diagnose = ({diagnosis, user,appointedDoctors, doctorsFound}) => {
    console.log(diagnosis);
    const dispatch= useDispatch();
    useEffect(()=>{
      dispatch(updateUser(user));
      
    }, [])
    console.log(doctorsFound)
  return (
    <div className='mt-12 flex justify-between px-10'>
        <div>
        <div className='text-xl font-semibold'style={{color:"#1D8AAD",fontSize:30}}>Diagnosis Report</div>

        <div className='mt-8'>
            <div className='font-semibold'style={{marginTop:20,fontSize:25,color:"#009999"}}>Diagnosis</div>
            <div className='mt-2 text-sm'>
            <div style={{marginTop:20,fontSize:20}}><span className='font-medium' style={{color:"#009999"}}>Predicted Disease : </span>{diagnosis.disease}</div>
                <div style={{marginTop:20,fontSize:20}}><span className='font-medium' style={{color:"#009999"}}>Accuracy : </span>{diagnosis.accuracy}</div>
               
            </div>
        </div>

        <div className='mt-8'>
            <div className='font-semibold'style={{fontSize:25,color:"#009999",marginTop:50}}>Patient Details</div>
            <div className='mt-2 text-sm'>
                <div style={{marginTop:20,fontSize:20}}><span className='font-medium' style={{color:"#009999"}}>Name : </span>{diagnosis.patient.user.fullName}</div>
                <div style={{marginTop:20,fontSize:20}}><span className='font-medium'style={{color:"#009999"}}>Age : </span>22</div>
                
            </div>
        </div>
        <div className='mt-8'>
            <div className='font-semibold' style={{fontSize:25,color:"#009999",marginTop:50}}>Symptoms</div>
            <div className='mt-2 text-sm'style={{marginTop:20,fontSize:20}} >
                {diagnosis.symptoms.split(',').map((s,idx)=>{
                    return <div>{idx+1}.  {" "} {s}<br></br></div>
                })}
            </div>
        </div>
        </div>
        <div className='w-[600px] '>
            <div className=' text-lg font-semibold'style={{fontSize:25,color:"#009999",marginBottom:20,marginTop:60}}>Recommended Doctors</div>
            <div className='text-xs'>{doctorsFound?.length} Doctors Found</div>
            {doctorsFound.length>0&&<div className='mt-4 space-y-5 h-[400px] overflow-y-auto'>
              {doctorsFound.map(d=><DoctorProfile appointedDoctors={appointedDoctors} doctor={d} role={user.role} patientId={user.additionalData.uuid} />)}
            </div>}
        </div>
       
    </div>
  )
}

export default Diagnose