import { apiConnector } from "../apiconnector";
import { contactusEndpoint } from "../apis";
import toast from "react-hot-toast";

 

const {
    CONTACT_US_API
} = contactusEndpoint;

export function contactUs(data,setLoading){
    return async(dispatch) => {
        const {firstname , lastname,email,message} = data;
        setLoading(true);
        console.log("Data...",data);
        try{

            const response = await apiConnector("POST",CONTACT_US_API,{firstname,lastname,email,message});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("Response...",response)

            toast.success("Message sent successfully")
        }
        catch(error){
            console.log("ERROR MESSAGE - ", error.message)
            toast.error("Can,t send message");
        }
        setLoading(false);
    }
}