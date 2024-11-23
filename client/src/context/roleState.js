import React,{useState,useEffect} from "react";
import Context from "./roleContext.js"

function RoleState(props){
    const [userType,setUserType]=useState('');
    const [userEmail,setUserEmail] = useState();
    const user=localStorage.getItem('user')
    
    useEffect(async() => {
        try {
          // Convert string to JSON
          const userObject = JSON.parse(user);
          await setUserType(userObject.role); 
          await setUserEmail(userObject.userEmail);
          console.log("role",userType)
          console.log("Parsed JSON Object:", userObject);
        } catch (error) {
          console.error("Error parsing JSON string:", error);
        }
      }, []);

    console.log("user",user)
    return(<Context.Provider value={{userType,userEmail,setUserType}}>
        {props.children}
    </Context.Provider>)
}
export default RoleState;