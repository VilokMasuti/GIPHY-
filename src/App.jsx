import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "../src/pages/Home";
import Categories from "../src/pages/Categories";
import Favories from "../src/pages/Favories";


import { GifProvider } from "./context/Gify";

import Search from "./pages/Search";
import Single from "./pages/Single";



// DEFING  THE ROUTES FOR THE WEBSITE

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Categories />,
      },
      {
        path: "/:types/:slug",
        element: <Single />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/favorites",
        element: <Favories />,
      },
    ],
  },
]);

const App = () => {
  return  <GifProvider>
  <RouterProvider router={router} />
  </GifProvider> 
  

};

export default App;
