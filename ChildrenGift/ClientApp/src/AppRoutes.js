import { AddEditChild } from "./components/AddEditChild";
import { Children } from "./components/Children";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

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
    }
];

export default AppRoutes;
