import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Courses from "./pages/Courses.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Categories from "./pages/Categories.tsx";

const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/courses", element: <Courses/>},
    {path: "/login", element: <Login/>},
    {path: "/signup", element: <Signup/>},
    {path: "/categories", element: <Categories/>},
    {path: "/categories/:categoryId", element: <Categories/>},
    
]);

export default function App() {
    return <RouterProvider router={router}/>;
}
