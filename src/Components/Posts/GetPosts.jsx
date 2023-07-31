import React from 'react';

function GetPosts() {
    const onSubmit = (data) => {
        // POST request using fetch with error handling
        let token = localStorage.getItem("token")
        let user_id = localStorage.getItem("user_id")

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token, 'user_id': user_id}
    };
    fetch('http://65.109.13.139:9191/posts', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            
            console.log(data)

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
        
      };
        
    return(
        <button onClick={onSubmit} className="btn">Get Posts</button>
    )
}

export default GetPosts;