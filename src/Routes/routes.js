import Products from "../Pages/Admin-Panel/Products/Products"
import Orders from "../Pages/Admin-Panel/Orders/Orders"
import Users from "../Pages/Admin-Panel/Users/Users"
import Comments from "../Pages/Admin-Panel/Comments/Comments"
import Offs from "../Pages/Admin-Panel/Offs/Offs"
import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register"
import PrivateRoutes from "../Components/Private/PrivateRoutes"
import AdminPanel from "../Pages/Admin-Panel/AdminPanel"
import Index from "../Pages/Admin-Panel/Index/Index"

const routes = [
    // {path: "/" , element: <Index />},
    // {path: "/products" , element: <Products />},
    // {path: "/orders" , element: <Orders />},
    // {path: "/users" , element: <Users />},
    // {path: "/comments" , element: <Comments />},
    // {path: "/offs" , element: <Offs />},
    {path: "/login" , element: <Login />},
    {path: "/register" , element: <Register />},

    {
        path: "/p-admin/*",
        element: <PrivateRoutes>
            <AdminPanel />
        </PrivateRoutes>,
        children: [
            { path: "", element: <Index />  },
            { path: "products", element: <Products /> },
            { path: "orders", element: <Orders /> },
            { path: "users", element: <Users /> },
            { path: "comments", element: <Comments /> },
            { path: "offs", element: <Offs /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ]
    }


];



export default routes;