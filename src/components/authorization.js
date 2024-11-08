import axios from 'axios'
import React, { useState } from 'react'


function Loginpage() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [isloggedIn,setIsloggedIn]=useState(false)
    const [error,setError]=useState("")
    const [dashboardmessage,setDashboardmessage]=useState("")

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const Response=await axios.post("http://localhost:1300/login",{
              username,
              password,  
            })

            localStorage.setItem("token",Response.data.token)
            setIsloggedIn(true)
            setError("");
        } catch(err){
             
          setError("invalid credentials");
        }
      };
        const fetchDashboard= async ()=>{
          try{
            const token =localStorage.getItem("token")
             const response=await axios.get("http://localhost:1300/dashboard",{
              headers:{
                Authorization:token,
              },
            });
            setDashboardmessage(response.data.message);
          } catch(err){
            setDashboardmessage("error fetching dashboard")
          }
        }
        
    

  return (
    <div>
      {!isloggedIn?(
          <form onSubmit={handleLogin}>
            <div>
              <label>username</label>
              <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>  

            <div>
              <label>password</label>
              <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type='submit'>Login</button>
            {error && <p style={{color:"red"}}>{error}</p>}
          </form>
      ) : (
          <div>
            <h2>welcome,{username}!</h2>
            <button onClick={fetchDashboard}>go to dashboard</button>
            {dashboardmessage && <p>{dashboardmessage}</p>}
            </div>
      )}
      
  </div>
  );
};

export default Loginpage;