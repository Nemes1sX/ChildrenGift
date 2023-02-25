import AddEditChild  from "./components/AddEditChild";
import AddEditGift  from "./components/AddEditGift";
import { Children } from "./components/Children";
import { NotFound } from "./components/NotFound";

const AppRoutes = [
  {
        index: true,
        element: <Children />
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
