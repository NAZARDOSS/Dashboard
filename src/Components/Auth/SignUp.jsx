import React, { useState } from "react";
import { useForm } from 'react-hook-form';

export default function SignUp() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({ mode: "onChange" });

      const onSubmit = (data) => {
        // POST request using fetch with error handling
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {username: data.userName, password: data.password, confirm_password: data.confirm_password})
    };
    fetch('http://65.109.13.139:9191/signup', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.log(data)
            localStorage.setItem("token", data.jwt)
            localStorage.setItem("user_id", data.id)
            

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        console.log("User credentials", data);
        
      };
    
      const [password, setPassword] = useState("");
      const [userName, setUserName] = useState("");
    
      function _password(e) {
        setPassword(e.target.value);
      }
      function _userName(e) {
        setUserName(e.target.value);
      }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
      
        <input
          name="username"
          placeholder="Enter username"
          className="input"
          {...register("userName", {
            required: "Username is required",
            minLength: { value: 3, message: "Enter more than 2 symbols" },
          })}
        />

      <div className="error-container">
        {errors.userName && <p> {errors.userName.message}</p>}
      </div>
       
        <input
          name="password"
          type={"password"}
          className="input"
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Enter more than 5 symbols" },
          })}
        />
      

      <div className="error-container">
        {errors.password && <p> {errors.password.message}</p>}
      </div>

      
        <input
          name="confirm_password"
          type={"password"}
          className="input"
          placeholder="confirm_password"
          {...register("confirm_password", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
              message: ""
          })}
        />
     
      
      <div className="error-container">
        {errors.confirm_password && <p> {errors.confirm_password.message}</p>}
      </div>

      <button name="submit">Submit</button>

    </form>
    )
}