import Products from "../Pages/Admin-Panel/Products/Products"
import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register"
import PrivateRoutes from "../Components/Private/PrivateRoutes"
import AdminPanel from "../Pages/Admin-Panel/AdminPanel"
import Index from "../Pages/Admin-Panel/Index/Index"
import Category from "../Pages/Admin-Panel/Category/Category"

const routes = [
    // {path: "/" , element: <Index />},
    // {path: "/products" , element: <Products />},
    // {path: "/orders" , element: <Orders />},
    // {path: "/users" , element: <Users />},
    // {path: "/comments" , element: <Comments />},
    // {path: "/offs" , element: <Offs />},
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    {
        path: "/p-admin/*",
        element: (
            <PrivateRoutes>
                <AdminPanel />
            </PrivateRoutes>
        ),
        children: [
            { path: "", element: <Index /> },
            { path: "products", element: <Products /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "category", element: <Category /> },
        ]
    }


];




export default routes;