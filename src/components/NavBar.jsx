import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar p-5">
            <div>
                
            </div>
            <li className="navbar__item">
                <NavLink className="text-green-300 hover:text-green-100" to={"/discussion/topics"}>Discussion Boards</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-green-300 hover:text-green-100" to={"/"}>All Posts</NavLink>
            </li>
            {/* <li className="navbar__item">
                <NavLink className="text-green-300 hover:text-green-100" to={"/"}>My Profile</NavLink>
            </li> */}
            {
                (localStorage.getItem("token") !== null) ?
                    <li className="navbar__item">
                        <button className="text-green-300 hover:text-green-100"
                            onClick={() => {
                                localStorage.removeItem("token")
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