import React, { useState } from "react";
import Image from "next/image";
import FillImage from "../public/fill.png";
import { BsPlusCircleDotted } from "react-icons/bs";
import InputField from "./Input";
import InputAdvance from "./InputAdvance";


const PatientDetails = ()=>{
    return (
        <>
         <div className="text-[#5A5482] font-bold text-xl">
          Complete your profile
        </div>
        <div className="mt-6">
          <div className="flex space-x-4 items-center">
            <InputField width="150px" label="AGE *" />
            <InputField width="300px" label="Medical History *" />
            <InputField width="250px" label="Blood Group *" />
          </div>
          <div className="mt-4 space-y-4">
            <InputAdvance label="Symptoms" />
            <InputAdvance
              label="Medications"
              placeholder=" Eg : Crosin / 3 in a day / ongoing "
            />
          </div>
          <div className="mt-10">
            <div className="text-[#5A5482] font-bold text-xl">
              Add Medical Records
            </div>
            <div className="text-gray-500 text-xs mt-2">
              These Medical Records will be shown to the doctor for better
              accessment.
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 grid-flow-row">
              {/* <MedicalRecord />
              <MedicalRecord /> */}
              <div className="w-full hover:border-[#6757E5] transition-all ease-in-out group border-gray-400 flex flex-col items-center justify-center h-full border-2 border-dashed rounded-md">
                <div>
                  <BsPlusCircleDotted
                    size={40}
                    className="text-gray-300 group-hover:text-[#6757E5] transition-all ease-linear"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

const AdditionalDetails = () => {
  return (
    <div className="h-[100vh] overflow-hidden bg-white w-full flex">
      <div className="h-full overflow-y-auto scrollbar w-[60vw] px-20 pt-16 pb-8">
          <PatientDetails/>

        <div className="mt-8 flex space-x-3 justify-end">
          
            <button disabled={true} className="bg-[#009999] disabled:bg-opacity-70 text-white text-sm px-2 py-2 rounded-md">Save and Continue</button>
        </div>
      </div>
      <div className="h-full flex items-center bg-[#F5F7FB] w-[40vw]">
        <Image src={FillImage} />
      </div>
    </div>
  );
};

export default AdditionalDetails;
