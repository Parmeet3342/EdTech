import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authApi";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function ForgotPassword(){

    const [email,setEmail] = useState("");
    const [emailSent,setEmailSent] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
    return(
        <div className="grid place-items-center min-h-[calc(100vh-3.5rem)]">
            { 
                loading ? (
                    <div className="spinner"></div>
                    ):(
                        <div className="max-w-[550px] p-4 lg:p-8">
                            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                                {
                                    !emailSent ?"Reset your password":"Check email"
                                }
                            </h1>
                            <p className=" my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                                {
                                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":
                                                 `We have sent the reset email to ${email}`
                                }
                            </p>

                            <form onSubmit={handleOnSubmit}>
                                {!emailSent && (
                                    <label>
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Email Address <sup>*</sup>
                                        </p>
                                        <input
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email address"
                                        className='w-full rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px]  text-richblack-5 outline-none'
                                        style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }}
                                        />
                                    </label>
                                )}

                                <button type="submit"
                                className="w-full bg-yellow-50 rounded-md my-4 py-2"
                                >
                                    {
                                        !emailSent ? "Reset password":"Resend Email"
                                    }
                                </button>
                            </form>

                            <Link to='/login'>
                                <p className="text-richblack-5 flex gap-3 items-center">
                                    <BiArrowBack/> Back to Login
                                </p>
                            </Link>
                        </div>
                    )
            }
        </div>
    )
}

export default ForgotPassword;