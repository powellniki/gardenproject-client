import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getGardenerById } from "../data/gardeners.jsx"
import { getPostByGardenerId } from "../data/posts.jsx"
import { PostListObject } from "../components/PostListObject.jsx"
import backgroundImage from '../assets/greenhouse.jpg'


export const GardenerProfile = () => {
    const [currentUser, setCurrentUser] = useState("")
    const [gardenerInfo, setGardenerInfo] = useState({})
    const [posts, setPosts] = useState([])
    const { gardenerId } = useParams()
    const navigate = useNavigate()

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
        <section className="mx-auto shadow-md rounded-lg">
            <div
                className="relative flex flex-col items-center justify-center text-white"
                style={{
                    height: '4in',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
            }}>
            </div>
            <div className="relative flex justify-start items-center mt-12 ml-12">
                <div className="absolute -top-40 w-40 h-40 border-4 border-white rounded-full overflow-hidden">
                    <img alt="Profile" className="w-full h-full object-cover" src={gardenerInfo.image}/>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8 ml-16 mt-4">
                <div className="flex flex-col items-start space-y-4">
                    <div className="text-2xl font-bold text-gray-800">
                        <>@{gardenerInfo.username}</>
                    </div>
                    <div className="text-sm text-gray-500">
                        {gardenerInfo.location}
                    </div>
                    <div className="w-3/4 text-sm text-gray-700">
                        {gardenerInfo.bio}
                    </div>
                    {currentUser.id === gardenerInfo.userId ? 
                        <Link to={`/profile/${currentUser.id}/edit`}>
                            <button className="text-green-950 text-sm mt-4 px-8 py-2 border border-green-950 hover:bg-opacity-70 hover:bg-green-950 hover:border-transparent hover:text-white transition duration-300">
                                EDIT PROFILE
                            </button> 
                        </Link>
                        : "" }
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-100 py-4 px-6 mr-24 rounded-lg shadow-inner">
                    <div className="text-3xl font-semibold text-gray-800">{posts.length}</div>
                    <p className="text-gray-600">posts</p>
                </div>
            </div>

            <div className="space-y-6 pl-8 pr-8">
                {posts.map(post => {
                    return <PostListObject post={post} key={post.id}/>
                })}
            </div>
        </section>
    )
}