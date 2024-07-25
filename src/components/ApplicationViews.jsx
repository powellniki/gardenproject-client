import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import { PostDetails } from '../pages/PostDetails.jsx'
import { DiscussionTopics } from '../pages/DiscussionTopics.jsx'
import { DiscussionBoard } from '../pages/DiscussionBoard.jsx'
import { NewDiscussionForm } from '../pages/NewDiscussionForm.jsx'


export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localUser = localStorage.getItem("token") 
        const localUserObject = JSON.parse(localUser)
        setCurrentUser(localUserObject)
    }, [])


    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="posts">
                    <Route path=":postId" element={<PostDetails />} />
                </Route>
                <Route path="discussion">
                    <Route path="topics" element={<DiscussionTopics />} />
                    <Route path="topics/:topicId" element={<DiscussionBoard />} />
                    <Route path="new" element={<NewDiscussionForm currentUser={currentUser}/>} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}