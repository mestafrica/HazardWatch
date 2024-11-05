import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layouts/dashBoardLayout";
import Home from "./components/Home";
import Events from "./components/Events";
import Inbox from "./components/Inbox";
import Broadcasts from "./components/Broadcasts";
import Settings from "./components/Settings";
import Sidebar from "./components/SideBar";








function App() {
    const router = createBrowserRouter([
        {
            path: "/sidebar",
            element: <Sidebar/>
       },
       
       {
        path: "/admin-dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                index: true,
                element: <Home />,

            },
            {
                path: "admin-dashboard/events",
                element: <Events />,

            },
            {
                path: "admin-dashboard/inbox",
                element: <Inbox />,

            },
            {
                path: "admin-dashboard/broadcasts",
                element: <Broadcasts />,

            },
            {
                path: "admin-dashboard/settings",
                element: <Settings />,

            },


            ],
        }
        
       




    ]);

    return <RouterProvider router={router} />;
};

export default App;