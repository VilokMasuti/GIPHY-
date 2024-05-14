import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gif from "../Components/Gif";
import FollowOn from "../Components/Followon";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
import { useGifState } from "../context/Gify";

const contentType = ["gifs", "stickers", "texts"];

const Single = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [embedCode, setEmbedCode] = useState("");
  const [error, setError] = useState(null);

  const { gf, addToFavorites, favorites } = useGifState();

  useEffect(() => {
    if (!contentType.includes(type)) {
      setError("Invalid Content Type");
      return;
    }
    const fetchGif = async () => {
      try {
        const gifId = slug.split("-").pop();
        const { data } = await gf.gif(gifId);
        const { data: related } = await gf.related(gifId, { limit: 10 });
        setGif(data);
        setRelatedGifs(related);
        setEmbedCode(`<iframe src="${data.embed_url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGif();
  }, [type, slug, gf]);

  const shareGif = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const toggleEmbed = () => {
    setShowEmbed(!showEmbed);
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    alert("Embed code copied to clipboard!");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider" />
        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />
            {/* -- Mobile UI -- */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
            {/* -- Mobile UI -- */}
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${favorites.includes(gif.id) ? "text-red-500" : ""}`}
              />
              Favorite
            </button>
            <button onClick={shareGif} className="flex gap-6 items-center font-bold text-lg">
              <FaPaperPlane size={25} />
              Share
            </button>
            <button onClick={toggleEmbed} className="flex gap-5 items-center font-bold text-lg">
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>
        {showEmbed && (
          <div className="mt-4 p-4 border rounded text-black bg-gray-100">
            <textarea
              value={embedCode}
              readOnly
              rows="4"
              className="w-full p-2 border rounded"
            />
            <button onClick={copyEmbedCode} className="mt-2 p-2 bg-blue-500 text-white rounded">
              Copy Embed Code
            </button>
          </div>
        )}
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
