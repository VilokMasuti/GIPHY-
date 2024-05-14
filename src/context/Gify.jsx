import { GiphyFetch } from '@giphy/js-fetch-api'
import { useState, useContext, createContext } from 'react'

const GifContext = createContext()

// eslint-disable-next-line react/prop-types
export const GifProvider = ({ children }) => {
    const [giphy, setGiphy] = useState([])
    const [filter, setFilter] = useState("gifs")
    const [favorites, setFavorites] = useState([])
    const gf = new GiphyFetch(import.meta.env.VITE_API_KEY)
    console.log(gf);

    return (
        <GifContext.Provider value={{ gf, giphy, setFavorites, setFilter, setGiphy, filter, favorites }}>
            {children}
        </GifContext.Provider>
    )
}

export const useGifState = () => {
    return useContext(GifContext)
}
