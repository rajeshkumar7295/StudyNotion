import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import OTPInput from 'react-otp-input'
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendotp,signup } from '../services/operations/authApi';
const VerifyEmail = () => {
    const [otp,setOtp]=useState("");
    const {signupData,loading}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
       if(!signupData){
         navigate("/signup");
       }
    },[]);
    function handleOnSubmit(e){
       e.preventDefault();
     const {firstName,lastName,email,password,confirmPassword,accountType}=signupData;
     dispatch(signup(
        accountType,firstName,lastName,email,password,confirmPassword,otp,navigate
     ));
    }
  return (
    <div className='min-h-[calc(100vh-3.5rem)] bg-richblack-900 grid place-items-center'>
     {
        loading ? (<div className='spinner'></div>):(<div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify email</h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100"> A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button type='submit'  className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                Verify email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
           <Link to={"/signup"}>
            <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack/> Back To signup
            </p>
           </Link>
           <button className="flex items-center text-blue-100 gap-x-2" onClick={()=>dispatch(sendotp(signupData.email))}>
            <RxCountdownTimer/>
            Resend it
           </button>
          </div>
        </div>)
     }
    </div>
  )
}

export default VerifyEmail
