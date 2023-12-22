import {createHashRouter, RouteObject, RouterProvider} from "react-router-dom";
import {Search} from "../pages/Search/Search";
import {RepositoryDetails} from "../pages/RepositoryDetails/RepositoryDetails";

const routes: RouteObject[] = [
    {
        element: <Search/>,
        path: '/',
    },
    {
        element: <RepositoryDetails/>,
        path: '/:id/:name',
    },

]
const router = createHashRouter([...routes])

export const Router = () => {
    return <RouterProvider router={router}/>
}