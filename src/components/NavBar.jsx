import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar p-5">
            <div>
                
            </div>
            <li className="navbar__item">
                <NavLink className="text-gray-600 hover:text-gray-700" to={"/discussion/topics"}>Discussion Boards</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-gray-600 hover:text-gray-700" to={"/"}>Marketplace</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-gray-600 hover:text-gray-700" to={"/"}>My Profile</NavLink>
            </li>
            {
                (localStorage.getItem("token") !== null) ?
                    <li className="navbar__item">
                        <button className="text-gray-600 hover:text-gray-700"
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <NavLink className="text-gray-600 hover:text-gray-700" to={"/login"}>Login</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink className="text-gray-600 hover:text-gray-700" to={"/register"}>Register</NavLink>
                        </li>
                    </>
            }        </ul>
    )
}