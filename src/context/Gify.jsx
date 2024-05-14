import { GiphyFetch } from '@giphy/js-fetch-api'
import { useState, useContext, createContext, useEffect } from 'react'

const GifContext = createContext()

// eslint-disable-next-line react/prop-types
export const GifProvider = ({ children }) => {
    const [giphy, setGiphy] = useState([])
    const [filter, setFilter] = useState("gifs")
    const [favorites, setFavorites] = useState([])
    const gf = new GiphyFetch(import.meta.env.VITE_API_KEY)

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
        setFavorites(favorites);
      }, []);

      const addToFavorites =( id) =>{
        if(favorites.includes(id)){
             // If the item is already in favorites, remove it
const updateFavorites = favorites.filter((itemId) => itemId !== id)
localStorage.setItem("favoriteGIFs",JSON.stringify(updateFavorites))
setFavorites(updateFavorites)
} else {
    const updateFavorites = [...favorites]
    updateFavorites.push(id)
    localStorage.setItem("favortieGif",JSON.stringify(updateFavorites))
    setFavorites(updateFavorites)
}

      }
    return (
        <GifContext.Provider value={{ gf, giphy, addToFavorites, setFavorites, setFilter, setGiphy, filter, favorites }}>
            {children}
        </GifContext.Provider>
    )
}

export const useGifState = () => {
    return useContext(GifContext)
}
