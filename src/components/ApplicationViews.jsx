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
import { EditDiscussionForm } from '../pages/EditDiscussionForm.jsx'
import { GardenerProfile } from '../pages/GardenerProfile.jsx'
import { EditGardenerProfile } from '../pages/EditGardenerProfile.jsx'


export const ApplicationViews = () => {


    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="posts">
                    <Route path=":postId" element={<PostDetails />} />
                    <Route path="new" element={<NewDiscussionForm />} />
                    <Route path=":postId/edit" element={<EditDiscussionForm />} />
                </Route>
                <Route path="discussion">
                    <Route path="topics" element={<DiscussionTopics />} />
                    <Route path="topics/:topicId" element={<DiscussionBoard />} />
                </Route>
                <Route path="profile">
                    <Route path=":gardenerId" element={<GardenerProfile />}/>
                    <Route path=":gardenerId/edit" element={<EditGardenerProfile />}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}