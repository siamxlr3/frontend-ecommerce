import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Shope from "../pages/shope.jsx";
import CategoryPage from "../pages/category-page.jsx";
import Error from "../component/error/error.jsx";
import LoginPage from "../pages/login-page.jsx";
import RegisterPage from "../pages/register-page.jsx";
import ProductdetailPage from "../pages/Productdetail-page.jsx";
import PaymentsuccessPage from "../pages/Paymentsuccess-page.jsx";
import Dashboard from "../dashboard.jsx";
import PrivateRoute from "./privateRoute.jsx";
import UserHome from "../userdashboard/userhome/userHome.jsx";
import UserOrder from "../userdashboard/userorder/userOrder.jsx";
import UserPayment from "../userdashboard/userpayment/userPayment.jsx";
import UserProfile from "../userdashboard/userprofile/userProfile.jsx";
import UserReview from "../userdashboard/userreview/userReview.jsx";
import Orderdetail from "../userdashboard/userorder/orderdetail.jsx";
import Adminhome from "../admindashboard/adminhome/adminhome.jsx";
import UserManage from "../admindashboard/usermanage/userManage.jsx";
import Manageorder from "../admindashboard/manageorder/manageorder.jsx";
import AddProducts from "../admindashboard/add-product/add-procuts.jsx";
import Manageproduct from "../admindashboard/manageproduct/manageproduct.jsx";
import Updateproduct from "../admindashboard/manageproduct/updateproduct.jsx";


const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<Error/>,
        children:[
            {
                path:'/',
                element:<Home/>,
            },
            {
                path:'/shope',
                element:<Shope/>
            },
            {
                path:'/shope/:id',
                element:<ProductdetailPage/>
            },
            {
                path:'/categories/:category',
                element:<CategoryPage/>
            },
            {
                path:'/success',
                element:<PaymentsuccessPage/>
            },
            {
                path:'/order/:orderId',
                element: <PrivateRoute><Orderdetail/></PrivateRoute>
            }
        ]
    },
    {
        path:'/login',
        element:<LoginPage/>,
    },
    {
        path:'/register',
        element:<RegisterPage/>
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children:[
            //user route
            {
                path: 'user',
                element:<UserHome/>
            },
            {
                path:'order',
                element: <UserOrder/>
            },
            {
                path:'payment',
                element:<UserPayment/>
            },
            {
                path:'profile',
                element:<UserProfile/>
            },
            {
                path:'review',
                element:<UserReview/>
            },

            // admin route
            {
                path:'admin',
                element:<PrivateRoute role="admin"><Adminhome/></PrivateRoute>
            },
            {
                path:'add-product',
                element:<PrivateRoute role="admin"><AddProducts/></PrivateRoute>
            },
            {
                path:'manage-product',
                element:<PrivateRoute role="admin"><Manageproduct/></PrivateRoute>
            },
            {
                path:'update-product/:id',
                element:<PrivateRoute role="admin"><Updateproduct/></PrivateRoute>
            },
            {
                path:'user-manage',
                element:<PrivateRoute role="admin"><UserManage/></PrivateRoute>
            },
            {
                path:'manage-order',
                element:<PrivateRoute role="admin"><Manageorder/></PrivateRoute>
            }
        ]
    }
]);
export default router;