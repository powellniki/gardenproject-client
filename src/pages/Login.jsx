import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../assets/greenhouse.jpg'
import "./Login.css"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const existDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch(`https://gardenapi-app-8s8tg.ondigitalocean.app/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.valid) {
                    localStorage.setItem("garden_token", JSON.stringify(authInfo))
                    navigate("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    const loginStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <main style={loginStyle} className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section className="flex flex-col bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="text-5xl mt-7 mb-3 font-arsenal text-center text-green-900">the Greenhouse Society</h1>
                    <h2 className="text-sm mb-10 text-center text-gray-700">please sign in</h2>
                    <fieldset className="mb-4">
                        <label htmlFor="inputUsername" className="block text-gray-700"></label>
                        <input type="username" id="inputUsername"
                            value={username}
                            onChange={evt => setUsername(evt.target.value)}
                            className="form-control w-full p-5 border border-gray-300 rounded mt-2"
                            placeholder="username"
                            required autoFocus
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword" className="block text-gray-700"></label>
                        <input type="password" id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control w-full p-5 border border-gray-300 rounded mt-2"
                            placeholder="password"
                        />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="w-full p-2 mt-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition duration-300">
                            Sign in
                        </button>
                    </fieldset>
                </form>
                <div className="loginLinks text-center mt-6">
                    <section className="link--register">
                        <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/register">not a member yet?</Link>
                    </section>
                </div>
            </section>
        </main>
    )
}
