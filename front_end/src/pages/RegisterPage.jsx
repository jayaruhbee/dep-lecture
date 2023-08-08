import { useState, useEffect, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("username", userName);
    console.log("password", password);
  }, [userName, password]);
  // prevent default, is stopping the default behaviour of our browser. --> the default oneis the post method and it tries to send a post to that url

  const signUp = async (e) => {
    e.preventDefault();
    // http://127.0.0.1:8000/api/
    let response = await api.post("users/register/", {
      email: userName,
      password: password,
    });
    console.log("response:", response);
    // expected response: {"user": {"email": user.email}, "token": token.key}, status=HTTP_201_CREATED
    let user = response.data.user;
    let token = response.data.token;
    setUser(user);
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    navigate("home");
  };

  return (
    <form onSubmit={(e) => signUp(e)}>
      <h5>Sign Up</h5>
      <input
        type="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};
