import toast from "react-hot-toast";
import { endpoints } from "../apis"
import { apiConnector } from "../apiconnector";
import { setLoading } from "../../slices/authSlice";

const {CREATE_NEW_LEAD} = endpoints;

// create new leads 
export function newLead(name, email, number, startDate, endDate, destination,ticketBooked, adult, kid, setLeadCreated) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", CREATE_NEW_LEAD, {name, email, number, startDate, endDate, destination,ticketBooked, adult, kid})
  
        console.log("New Lead response data", response);
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Thanks for connecting with us, our executive will contact you soon");
        setLeadCreated(true);
      }
      catch(error) {
        console.log("Error in creating new lead", error);
        toast.error("Failed to create new lead");
      }
      dispatch(setLoading(false));
    }
  }