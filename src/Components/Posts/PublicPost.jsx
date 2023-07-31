import React, { useState } from "react";
import { useForm } from "react-hook-form";

function PublicPost(props) {
    
        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm();
        
        const onSubmit = (data) => {
            let token = localStorage.getItem("token")
          // POST request using fetch with error handling
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",'x-access-token': token  },
            body: JSON.stringify({
              title: data.title,
              description: data.description,
              status: data.status,
              image: data.image,
              video: data.video,
            }),
          };
          fetch("http://65.109.13.139:9191/post", requestOptions)
            .then(async (response) => {
              const isJson = response.headers
                .get("content-type")
                ?.includes("application/json");
              const data = isJson && (await response.json());
              localStorage.setItem("post_id",data.id) // НУЖНО ДЛЯ ПРОВЕРКИ
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
    
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [status, setStatus] = useState("");
        const [image, setImage] = useState("");
        const [video, setVideo] = useState("");
    
        function HandleTitle(e) {
            setTitle(e.target.value);
        }
        function HandleDescription(e) {
            setDescription(e.target.value);
        }
        function HandleImage(e) {
            setImage(e.target.value);
        }
        function HandleStatus(e) {
            setStatus(e.target.value);
        }
        function HandleVideo(e) {
            setVideo(e.target.value);
        }
    
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="title"
              placeholder="title"
              className="input"
              {...register("title", {
                required: "title is required",
                value: title,
                onChange: (e) => {
                    HandleTitle(e);
                },
              })}
            />
            {errors.title && <p>{errors.title.message}</p>}
            <input
              type="text"
              name="description"
              placeholder="description"
              className="input"
              {...register("description", {
                value: description,
                onChange: (e) => {
                  HandleDescription(e);
                },
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
            
            <textarea
              name="status"
              placeholder="your status"
              className="textArea"
              {...register("status", {
                maxLength: {
                    value: 25,
                    message: "status cannot exceed 25 characters",
                  },
                value: status,
                onChange: (e) => {
                  HandleStatus(e);
                },
              })}
            />
            {errors.status && <p>{errors.status.message}</p>}

            <textarea
              name="image"
              placeholder="your image"
              className="textArea"
              {...register("image", {
                required: "image is required",
                value: image,
                onChange: (e) => {
                  HandleImage(e);
                },
              })}
            />
            {errors.image && <p>{errors.image.message}</p>}
    
            <textarea
              name="video"
              placeholder="your video"
              className="textArea"
              {...register("video", {
                value: video,
                onChange: (e) => {
                    HandleVideo(e);
                },
              })}
            />
            {errors.video && <p>{errors.video.message}</p>}
            
    
            <button className="btn">Public</button>
          </form>
        );
      }

export default PublicPost;