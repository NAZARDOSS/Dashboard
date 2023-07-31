import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Follow() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm();
  
      const onSubmit = (data) => {
        // POST request using fetch with error handling
        let token = localStorage.getItem("token")
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json", 'x-access-token': token  },
          body: JSON.stringify({
            username: data.username,
          }),
        };
        fetch("http://65.109.13.139:9191/follow", requestOptions)
          .then(async (response) => {
            const isJson = response.headers
              .get("content-type")
              ?.includes("application/json");
            const data = isJson && (await response.json());
            console.log(data);
  
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      };
  
      const [username, setUsername] = useState("");
  
      function HandleUsername(e) {
        setUsername(e.target.value);
      }
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="input"
            {...register("username", {
              required: "username is required",
              minLength: { value: 4, message: "username is min 4 symbols" },
              value: username,
              onChange: (e) => {
                HandleUsername(e);
              },
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <button className="btn">Subscribe</button>
        </form>
      );
}

export default Follow;