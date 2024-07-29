import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGardenerById } from "../data/gardeners.jsx"
import { getPostByGardenerId } from "../data/posts.jsx"


export const GardenerProfile = () => {
    const [gardenerInfo, setGardenerInfo] = useState({})
    const [posts, setPosts] = useState([])
    const { gardenerId } = useParams()

    const getGardener = () => {
        getGardenerById(gardenerId).then(gardenerData => {
            setGardenerInfo(gardenerData)
        })
    }

    const getPosts = () => {
        getPostByGardenerId(gardenerId).then(postData => {
            setPosts(postData)
        })
    }

    useEffect(() => {
         getGardener()
         getPosts()
    }, [])


    return (
        <section>
            <div>
                <div>
                    <div>
                        {gardenerInfo.username}
                    </div>
                    <div>
                        {gardenerInfo.location}
                    </div>
                    <div>
                        {gardenerInfo.bio}
                    </div>
                </div>

            </div>
        </section>
    )
}