import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { authEndpoints } from "../apis";
import { setToken } from "../../slices/authSlice";
import resetCart from "../../slices/cartSlice"

const  {
    LOGIN_API,
    SendOTP_API,
    SignUp_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = authEndpoints

export function login(email,password,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST",LOGIN_API,{email,password});

            console.log("Login Response",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successfull");
            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");
        }
        catch(error){
            console.log("Login Api Error",error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
    }
}

export function sendOTP(email,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",SendOTP_API,{email});

            console.log("OTP response ...",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email");
        }
        catch(error){
            console.log("SENDOTP error...",error);
            toast.error("Could not send otp");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(firstName,lastName,email,password,confirmPassword,otp,accountType,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",SignUp_API,{firstName,lastName,email,password,confirmPassword,otp,accountType});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("SignUp Successfull");
            navigate("/login");
        }       
        catch(error){
            console.log("SignUp_API error...",error);
            toast.error("SignUp Failed");
            navigate("signUp");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email});

            console.log("Token Response....",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Email sent successfully");
            setEmailSent(true);
        }          
        catch(error){
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {
          password,
          confirmPassword,
          token,
        })
  
        console.log("RESETPASSWORD RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Successfully")
        navigate("/login")
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error("Failed To Reset Password")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out..")
      navigate("/")
    }
  }