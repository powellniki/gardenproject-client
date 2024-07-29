import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGardenerById } from "../data/gardeners.jsx"


export const GardenerProfile = () => {
    const [gardenerInfo, setGardenerInfo] = useState({})
    const { gardenerId } = useParams()

    const getGardener = () => {
        getGardenerById(gardenerId).then(gardenerData => {
            setGardenerInfo(gardenerData)
        })
    }

    useEffect(() => {
         getGardener()
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