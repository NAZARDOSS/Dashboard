import React from 'react';

function Delete(props) {

             const onSubmit = (data) => {
            // POST request using fetch with error handling
            let token = localStorage.getItem("token")
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        };
        fetch('http://65.109.13.139:9191/me', requestOptions)
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
            <button onClick={onSubmit} className="btn">Delete</button>
        )

    
}

export default Delete;