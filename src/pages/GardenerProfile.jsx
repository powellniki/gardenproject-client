import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGardenerById } from "../data/gardeners.jsx"
import { getPostByGardenerId } from "../data/posts.jsx"
import { PostListObject } from "../components/PostListObject.jsx"


export const GardenerProfile = () => {
    const [currentUser, setCurrentUser] = useState("")
    const [gardenerInfo, setGardenerInfo] = useState({})
    const [posts, setPosts] = useState([])
    const { gardenerId } = useParams()

    useEffect(() => {
        const localUser = localStorage.getItem("garden_token")
        const localUserObject = JSON.parse(localUser)
        setCurrentUser(localUserObject)
    }, [])

    const getGardener = () => {
        getGardenerById(gardenerId).then(gardenerData => {
            setGardenerInfo(gardenerData)
        })}

    const getPosts = () => {
        getPostByGardenerId(gardenerId).then(postData => {
            setPosts(postData)
        })}

    useEffect(() => {
         getGardener()
         getPosts()
    }, [])


    return (
        <section className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
            <div className="flex flex-col items-center">

                <div className="flex flex-col items-center space-y-4 mb-8">
                    <div className="text-2xl font-bold text-gray-800">
                        <>@{gardenerInfo.username}</>
                    </div>
                    <div className="text-sm text-gray-500">
                        {gardenerInfo.location}
                    </div>
                    <div className="w-3/4 text-base text-gray-700 text-center">
                        {gardenerInfo.bio}
                    </div>
                    {currentUser.id == gardenerId ? 
                        <button className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition duration-300">
                            EDIT PROFILE
                        </button> : "" }
                </div>

                <div className="w-full flex justify-around bg-gray-100 py-4 rounded-lg shadow-inner mb-8">
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-gray-800">{posts.length}</div>
                        <p className="text-gray-600">posts</p>
                    </div>
                </div>

                <div className="w-full">
                    <div className="space-y-6">
                        {posts.map(post => {
                            return <PostListObject post={post} key={post.id}/>
                        })}
                    </div>
                </div>

            </div>
        </section>
    )
}