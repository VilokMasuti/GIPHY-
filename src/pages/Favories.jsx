import {useEffect, useState} from "react";
import Gif from "../Components/Gif";

import { useGifState } from "../context/Gify";
const Favories = () => {
  const {gf, favorites} = useGifState();
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const feachFavortieGIFs = async () => {
    const {data:gifs} = await gf.gifs(favorites)
    setFavoriteGIFs(gifs)
  }
  useEffect(() => {
   feachFavortieGIFs();
  }, []);
  return (
    <div className="mt-2">
    <span className="faded-text ">My Favorites</span>
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
      {favoriteGIFs.map((gif) => (
        <Gif gif={gif} key={gif.id} />
      ))}
    </div>
  </div>
  )
}

export default Favories