import AddEditChild  from "./components/AddEditChild";
import AddEditGift  from "./components/AddEditGift";
import { Children } from "./components/Children";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
   },
  {
      path: '/children',
      element: <Children/>
   },
   {
       path: '/children/add',
       element: <AddEditChild/>
    },
    {
        path: '/children/edit',
        element: <AddEditChild />
    },
    {
        path: '/gift/add',
        element: <AddEditGift/>
    },
    {
        path: '/gift/edit',
        element: <AddEditGift/>
    },
    {
        path: '/404',
        element: <NotFound/>
    }
];

export default AppRoutes;
