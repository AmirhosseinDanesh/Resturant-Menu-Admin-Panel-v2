import Main from "../Pages/Main/Main"
import Products from "../Pages/Products/Products"
import Orders from "../Pages/Orders/Orders"
import Users from "../Pages/Users/Users"
import Comments from "../Pages/Comments/Comments"
import Offs from "../Pages/Offs/Offs"
import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register"

const routes = [
    {path: "/" , element: <Main />},
    {path: "/products" , element: <Products />},
    {path: "/orders" , element: <Orders />},
    {path: "/users" , element: <Users />},
    {path: "/comments" , element: <Comments />},
    {path: "/offs" , element: <Offs />},
    {path: "/login" , element: <Login />},
    {path: "/register" , element: <Register />},
];

export default routes;