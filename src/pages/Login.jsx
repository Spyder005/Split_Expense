import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './min.css'
import {toast,ToastContainer} from "react-toastify"
import {Link,NavLink} from 'react-router-dom'

const Login = () => {
    const [passShow, setPassShow] = useState(false); //for password hide and show
  const navigate = useNavigate();

  const [inputvalue, setInputValue] = useState({
    email: "",
    password: "",
   
  });

  //set the input fileds
  const setVal = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };
 
  //on submit
  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inputvalue;

    if (email === "") {
      toast.error("email is required!");
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!");
    } else if (password === "") {
      toast.error("password is required!");
    } else if (password.length < 6) {
      toast.error("password must be 6 char!");
    } else {
      //  const data = new FormData(); //logic to enter take the data for backend
      //  data.append("email",email)
      //  data.append("password",password)

    //   const data = {
    //     email,
    //     password,
    //   };

    //   const config = {
    //     "Content-Type": "application/json",
    //   };
      const response =await fetch("http://localhost:5001/api/loginuser",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:email,password:password})
      })

      if (response.status === 200) {//this is for if any filed is empty and reload the page all filed should be empty
        
        toast.success("Login Sucessfully !");
        //  console.log(JSON.stringify(response.result.token));
        localStorage.setItem(
          "userdatatoken",
          JSON.stringify(response.data.result.token)
        );
        toast.success("Login Sucessfully !");
        navigate("/");
        setInputValue({
          ...inputvalue,
          email: "",
          password: "",
        });
      } else {
        toast.error("Enter correct Credentials !");
      }

    }}



  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad are back. Please Login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={inputvalue.email}
                onChange={setVal}
                placeholder="Enter your email address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"} //flase == password ,true == text
                  name="password"
                  id="password"
                  value={inputvalue.password}
                  onChange={setVal}
                  placeholder="Enter your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
            </p>
            <p>
              <NavLink to="/password-reset">Forgot Password</NavLink>
            </p>
          </form>
          <ToastContainer position="top-center" />
        </div>
      </section>
    </>
  );
}

export default Login
