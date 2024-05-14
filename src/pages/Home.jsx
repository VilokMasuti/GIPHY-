import  { useEffect, useState } from 'react';
import { useGifState } from '../context/Gify';
import banner from '../assets/banner.gif';
import Gif from '../Components/Gif';

import Loading from './Loading';
import FilterGif from '../Components/FilterGif';

const Home = () => {
  const { gf, giphy, setGiphy, filter } = useGifState();
  const [loading, setLoading] = useState(true);

  const GiphyFetchTranding = async () => {
    try {
      const { data } = await gf.trending({
        limit: 20,
        type: filter,
        rating: 'g',
      });
      setGiphy(data);
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    GiphyFetchTranding();
  }, [filter]);

  return (
    <div>
      <img src={banner} alt="logo" className="mt-2 rounded w-full" />
      <FilterGif showTrending />

      {loading ? (
       <Loading/> // Render loading indicator
      ) : (
        <div className="gap-2 columns-2 md:columns-3 lg:columns-4 xl:columns-5">
          {giphy.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
