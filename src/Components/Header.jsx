import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import { HiExclamation } from "react-icons/hi";
import { useGifState } from "../context/Gify"; // Changed import statement
import GifSearch from "./GifSearch";

const Header = () => {
  const { gf, giphy, setFavorites, setFilter, setGiphy, filter, favorites } = useGifState(); // Using useGifState hook instead
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([])

  const handleToggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const GiphyFetchCategories = async () =>{
    const {data} = await gf.categories()
    console.log(data);
    
    setCategories(data)
   
  }

  useEffect(()=>{
    GiphyFetchCategories()
  },[])

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src={logo} className="w-8" alt="logo"/>
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer"> GIPHY</h1>
        </Link>
        <div className="font-bold text-md flex gap-4 items-center">


        {categories?.slice(0,5)?.map((category) => {
          return (
            <Link key={category.name_encoded} className="px-4 py-1 hover:gradient border-b-4 hidden lg:block">
              {category.name}
            </Link>
          );
        })}

   
          <Link to='' className="px-4 py-1 hover:gradient border-b-4 hidden lg:block">
            Reactions
          </Link>
          {favorites.length>0 && (
            <div className="h-9  bg-gray-700 py-2 px-2 cursor-pointer rounded">
            <Link to="/favorites">
            Favorites Gify
            </Link>
                      </div>

          )}
         
          <button onClick={handleToggleCategories}>
            <HiExclamation size={35} className={`py-0.5 transition ease-in-out hover:gradient duration-1000 ${showCategories ? "gradient" : ""} border-b-4 cursor-pointer hidden lg:block`}/>
          </button>
          {showCategories && (
            <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
              <span className="  font-bold antialiased text-3xl">
                Categories
                <hr className=" bg-slate-100 opacity-50 my-5"/>
                <div className="  text-sm  grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
                {categories?.map((category) => {
                  return(
                    <Link key={category.name} to={`${category.name_encoded}`} className="font-bold">
                    {category.name}
                    </Link>
                  )
                })}
                </div>
                <Link to="/favorites" className="font-bold"> Reactions </Link>
              </span>
            </div>
          )}
        </div>
      </div>
      <GifSearch filter={filter} setFilter={setFilter} />
    </nav>
  );
};

export default Header;
