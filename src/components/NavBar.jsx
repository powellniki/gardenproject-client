import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react"

export const NavBar = () => {
    const [currentUser, setCurrentUser] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const localUser = localStorage.getItem("garden_token")
        const localUserObject = JSON.parse(localUser)
        setCurrentUser(localUserObject)
    }, [])


    return (
        <ul className="navbar p-5">
            <div>
                
            </div>
            <li className="navbar__item">
                <NavLink className="text-green-300 hover:text-green-100" to={"/"}>All Posts</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-green-300 hover:text-green-100" to={"/discussion/topics"}>Discussion Boards</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-green-300 hover:text-green-100" to={`/profile/${currentUser.id}`}>My Profile</NavLink>
            </li>
            {
                (localStorage.getItem("garden_token") !== null) ?
                    <li className="navbar__item">
                        <button className="text-green-300 hover:text-green-100"
                            onClick={() => {
                                localStorage.removeItem("garden_token")
                                /* update state */
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <NavLink className="text-green-300 hover:text-green-100" to={"/login"}>Login</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink className="text-green-300 hover:text-green-100" to={"/register"}>Register</NavLink>
                        </li>
                    </>
            }        </ul>
    )
}