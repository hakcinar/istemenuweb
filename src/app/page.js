"use client"
import { getRestaurantList } from "@/utils/firestore"
import { useEffect, useState } from "react"
import Restaurant from "@/components/Restaurant"
import Loader from "@/components/loader"
const page = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getRestaurants()
  }, [])
  const getRestaurants = async () => {
    const data = await getRestaurantList()
    setRestaurants(data)
    setLoading(false)
  }


  return (
    <div className='flex flex-col flex-1 bg-black text-white px-4'>
      {loading ? <Loader /> : (
        restaurants.map((restaurant, index) => (
          <div key={index}>
            <Restaurant restaurant={restaurant} />
          </div>
        ))
      )}

    </div>
  )
}

export default page