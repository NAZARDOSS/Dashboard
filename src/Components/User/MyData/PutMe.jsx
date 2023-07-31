import React, { useState } from "react";
import { useForm } from "react-hook-form";

function PutMe() {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      // POST request using fetch with error handling
      let token = localStorage.getItem("token")
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", 'x-access-token': token },
        body: JSON.stringify({
          username: data.username,
          avatar: data.avatar,
          age: data.age,
          bio: data.bio,
          fullname: data.fullname,
        }),
      };
      fetch("http://65.109.13.139:9191/me", requestOptions)
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
    const [avatar, setAvatar] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [fullname, setFullname] = useState("");

    function HandleUsername(e) {
      setUsername(e.target.value);
    }
    function HandleAvatar(e) {
      setAvatar(e.target.value);
    }
    function HandleAge(e) {
      setAge(e.target.value);
    }
    function HandleBio(e) {
      setBio(e.target.value);
    }

    function HandleFullname(e) {
      setFullname(e.target.value);
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
        <input
          type="text"
          name="avatar"
          placeholder="avatar"
          className="input"
          {...register("avatar", {
            value: avatar,
            onChange: (e) => {
              HandleAvatar(e);
            },
          })}
        />
        <input
          type="number"
          name="age"
          placeholder="your age"
          className="input"
          {...register("age", {
            required: "age is required",
            min: {
              value: 12,
              message: "age must be greater than 11",
            },
            value: age,
            onChange: (e) => {
              HandleAge(e);
            },
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}
        <textarea
          name="bio"
          placeholder="your bio"
          className="input"
          {...register("bio", {
            maxLength: {
                value: 40,
                message: "description cannot exceed 40 characters",
              },
            value: bio,
            onChange: (e) => {
              HandleBio(e);
            },
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}

        <input
          type="text"
          name="fullname"
          placeholder="fullname"
          className="input"
          {...register("fullname", {
            minLength: { value: 4, message: "fullname is min 4 symbols" },
            value: username,
            onChange: (e) => {
              HandleUsername(e);
            },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        

        <button className="btn">Edit</button>
      </form>
    );
  }

export default PutMe;
