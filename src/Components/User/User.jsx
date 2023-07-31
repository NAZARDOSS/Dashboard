import React from 'react';
import DeletePost from '../Posts/DeletePost';
import GetOnePost from '../Posts/getOnePost';
import GetPosts from '../Posts/GetPosts';
import PublicPost from '../Posts/PublicPost';
import Delete from './MyData/Delete';
import GetFollowers from './MyData/GetFollowers';
import GetFollowings from './MyData/GetFollowings';
import GetMe from './MyData/GetMe';
import PutMe from './MyData/PutMe';
import Follow from './UsersData/Follow';
import GetUsers from './UsersData/GetUsers';


function User() {
    return (
        <div>
            <GetMe />
            <hr />
            <br />
            <PutMe />
            <hr />
            <br /> 
            <Delete />
            <hr />
            <br />
            <GetUsers />
            <hr />
            <br />
            <Follow />
            <hr />
            <br />
            <GetFollowers />
            <hr />
            <br />
            <GetFollowings />
            <hr />
            <br />
            <GetPosts />
            <hr />
            <br />
            <PublicPost />
            <hr />
            <br />
            <GetOnePost />
            <hr />
            <br />
            <DeletePost />
        </div>
    );
}

export default User;