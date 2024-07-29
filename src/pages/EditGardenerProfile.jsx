import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editProfile, getGardenerById } from "../data/gardeners.jsx"


export const EditGardenerProfile = () => {
    const [currentUser, setCurrentUser] = useState("")
    const [profileData, setProfileData] = useState({})
    const [usernameInput, setUsernameInput] = useState("")
    const [locationInput, setLocationInput] = useState("")
    const [bioInput, setBioInput] = useState("")
    const { gardenerId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const localUser = localStorage.getItem("garden_token")
        const localUserObject = JSON.parse(localUser)
        setCurrentUser(localUserObject)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const profileDetails = await getGardenerById(gardenerId)
            setProfileData(profileDetails)
            setUsernameInput(profileDetails.username)
            setLocationInput(profileDetails.location)
            setBioInput(profileDetails.bio)
        }
        fetchData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!currentUser || !currentUser.id) {
            console.error("Current user is not defined!")
            return
        }
        const formData = new FormData()
        formData.append('username', usernameInput)
        formData.append('location', locationInput)
        formData.append('bio', bioInput)

        console.log("Form Data:", formData);  // Log FormData entries
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1])
        }

        editProfile(formData, gardenerId).then(() => {
             navigate(`/profile/${gardenerId}`)
        }).catch(err => console.error("Failed to update profile", err))
    }

    return (
        <form>
            <h1>Edit Profile</h1>

            <fieldset>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={usernameInput}
                        onChange={e => setUsernameInput(e.target.value)}
                        required
                    />
                </div>
            </fieldset>


            <fieldset>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={locationInput}
                        onChange={e => setLocationInput(e.target.value)}
                        required
                    />
                </div>
            </fieldset>


            <fieldset>
                <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        type="text"
                        id="bio"
                        name="bio"
                        value={bioInput}
                        onChange={e => setBioInput(e.target.value)}
                        required
                    />
                </div>
            </fieldset>

            <fieldset>
                <button onClick={handleSubmit}>
                    Fertilize Changes
                </button>
            </fieldset>
        </form>
    )
}