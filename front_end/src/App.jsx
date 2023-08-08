import { useState} from "react";
import "./App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { createContext, useEffect } from "react";
import {api } from "./utilities.jsx"

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)},[user])

    // function to check if user exists 
    const whoAmI = async() => {
      let token = localStorage.getItem("token")
      if (token) {
        // creating a new key called auth and giving it a value
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        let response = await api.get("users/")
        // because inside of the data of response, it will have our user object.
        setUser(response.data)
        navigate("home")
      } else {
        setUser(null)
        navigate("login")
      }
    }
  
    useEffect (() => {
      whoAmI()
    }, [])

    const logOut = async() => {
      let response = await api.post("users/logout/") 
      if (response.status === 204) {
        localStorage.removeItem("token")
        setUser(null)
        delete api.defaults.headers.common["Authorization"];
        navigate("/login/")
      }

    }




  return (
    <div id="app">
      <header>
        <nav>
          {user?
          
          <>
              <Link to="/home">Home</Link>
              <Link to="/lists">Lists</Link>
              <button onClick={()=>setUser(null)}>Log out</button>
              </>
              :
              <>
              <Link to="/">Register</Link>
              <Link to="/login">Log In</Link>
            </>
          }
        </nav>
          
      </header>
      <userContext.Provider value={{ user, setUser }}>
        <Outlet />
      </userContext.Provider>
    </div>
  );
}

export default App;
