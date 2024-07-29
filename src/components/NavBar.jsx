import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react"

export const NavBar = () => {
    const [currentUser, setCurrentUser] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const localUser = localStorage.getItem("garden_token")
        const localUserObject = JSON.parse(localUser)
        setCurrentUser(localUserObject)
    }, [])

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }


    return (
        <nav className="navbar flex justify-between items-center p-4 mr-8">
            <div>
                <p className="font-arsenal text-4xl text-green-100">the Greenhouse Society</p>
            </div>
            <ul className="flex space-x-20 font-arsenal text-2xl">
                <li className="navbar__item top-level">
                    <NavLink className="text-green-200" to={"/"}>home</NavLink>
                </li>
                <li className="navbar__item top-level">
                    <NavLink className="text-green-200" to={"/discussion/topics"}>boards</NavLink>
                </li>
                <li className="navbar__item relative top-level">
                    <button
                        className="text-green-200"
                        onClick={toggleDropdown}
                    >
                        user
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 w-44 px-2 py-2 bg-white text-gray-800 rounded-sm shadow-lg z-20">
                            <NavLink
                                to={`/profile/${currentUser.id}`}
                                className="block w-full hover:bg-gray-100 no-underline"
                                onClick={() => setDropdownOpen(false)}
                            >
                                profile
                            </NavLink>
                            <NavLink
                                to={`/profile/${currentUser.id}/edit`}
                                className="block w-full hover:bg-gray-100 no-underline"
                                onClick={() => setDropdownOpen(false)}
                            >
                                edit profile
                            </NavLink>
                        </div>
                    )}
                </li>
                {
                    (localStorage.getItem("garden_token") !== null) ?
                        <li className="navbar__item top-level">
                            <button className="text-green-200"
                                onClick={() => {
                                    localStorage.removeItem("garden_token")
                                    navigate('/login')
                                }}
                            >logout</button>
                        </li> :
                        <>
                            <li className="navbar__item top-level">
                                <NavLink className="text-green-200" to={"/login"}>Login</NavLink>
                            </li>
                            <li className="navbar__item top-level">
                                <NavLink className="text-green-200" to={"/register"}>Register</NavLink>
                            </li>
                        </>
                }
            </ul>
        </nav>
    )
}