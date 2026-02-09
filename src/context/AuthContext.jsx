import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef
} from "react";
import axios from "axios";
import Config from "../config/config.json"


//enablePromise(true)

const AuthContext = createContext();

const AuthProvider = ({ children}) => {
  const [authData, setAuthData] = useState('');
  
  
  useEffect(() => {
    //setAsyncStorage()
    }, [authData])

  
  
   
  const logIn = async (arg) => {
    try {
        const response = await axios.post( Config.API_URL + Config.LOGIN_API, arg, 
        {
        headers: {
          'Content-Type': 'application/json'
        },
        
      })
      
      if(response.data.status==='success'){
        //console.log("LOGIN CONTEXT RESPONSE",JSON.stringify(response.data.data.userlocation.location))
        setAuthData(response.data.data.UserId)
        
      }
      else{
        setAuthData('')
      }
      return response.data

    } catch (error) {
        setAuthData('')
        console.log("LOGIN CONTEXT ERROR",error)
        return {status:'error',message:'Network Error'}
    }
    
  }

  
  
 
  
  return (
    <AuthContext.Provider
      value={{
        logIn,
        authData,
      }}
    >
      {children}
      
    </AuthContext.Provider>
  )
}
function useAuth() {
  const context = useContext(AuthContext)

  // if (!context) {
  //   throw new Error('userProfile must be used within an userProvider')
  // }

  return context
}
export { AuthContext, AuthProvider, useAuth }


