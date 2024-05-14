import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
const GifSearch = () => {
 const [query, setQuery] = useState("")
 const navigate = useNavigate();
const Search = () => {
      if(query.trim() === ""){
            return
      }
      navigate(`/search/${query}`)
}
const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        Search();
      }
    };

      // useEffect hook to add the event listener for key presses
  useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [])
  
  return (
<div className=" flex relative">
<input
type="text"
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="Search all the GIFs and Stickers"
className=" w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl  rounded-bl border border-gray-300 outline-none"

/>
{query && (
      <button onClick={() => setQuery("")} className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6">
      <HiMiniXMark size={25} />
      </button>
)}

<button onClick={Search} onMouseEnter={Search} className="bg-gradient-to-tr from-slate-950  to-red-500 text-white px-4 py-2 rounded-tr rounded-br">

<CiSearch ize={35} className="-scale-x-100"  />
</button>

</div>
  )
}

export default GifSearch