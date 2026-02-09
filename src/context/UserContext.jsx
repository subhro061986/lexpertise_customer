import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";
import Config from "../config/config.json"
import axios from "axios";
import { useAuth } from "./AuthContext";
const UserContext = createContext();


const UserProvider = ({ children }) => {

  
  
  const {authData} = useAuth()
  const [getAll, setGetAll] = useState([])
  
      

  useEffect(() => {
    getAllData()
    if(authData===''){
      console.log("NO TOKEN AVAILABLE")
    }
    else{
      
    }
    
  }, [authData]);

  

 
 const getAllData=async()=>{
   try {
     const response = await axios.get(Config.API_URL + GET_USER, {
       headers: {
         'Authorization': `Bearer ${authData}`
       }
     });
     setGetAll(response.data);
     return response.data;
   } catch (error) {
     console.error("Error fetching user data:", error);
     return { status: 'error', message: 'Failed to fetch user data' };
   }
 }



  return (
    <UserContext.Provider
      value={{
        getAll
      }}
    >
      {children}
      
    </UserContext.Provider>
  )
}

function UserProfile() {
  const context = useContext(UserContext)

  return context
}
export { UserContext, UserProvider, UserProfile }
