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
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow mt-8">
            <h1 className="text-4xl font-semibold mb-6 text-center">Edit Profile</h1>

            <fieldset className="mb-4">
                <div>
                    <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={usernameInput}
                        onChange={e => setUsernameInput(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
            </fieldset>

            <fieldset className="mb-4">
                <div>
                    <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-2">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={locationInput}
                        onChange={e => setLocationInput(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
            </fieldset>

            <fieldset className="mb-6">
                <div>
                    <label htmlFor="bio" className="block text-lg font-medium text-gray-700 mb-2">Bio:</label>
                    <textarea
                        type="text"
                        id="bio"
                        name="bio"
                        value={bioInput}
                        onChange={e => setBioInput(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded h-32"
                        required
                    />
                </div>
            </fieldset>

            <fieldset className="flex justify-end">
                <button 
                    type="submit"
                    className="text-green-950 text-sm mt-4 px-8 py-2 border border-green-950 hover:bg-opacity-70 hover:bg-green-950 hover:border-transparent hover:text-white transition duration-300"
                >
                    Fertilize Changes
                </button>
            </fieldset>
        </form>
    )
}