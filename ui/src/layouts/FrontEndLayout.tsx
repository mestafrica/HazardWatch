import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const FrontEndLayout: React.FC = () => {
  const [onRefresh, setOnRefresh] = useState<(() => Promise<void>) | undefined>(
    undefined
  );

  useEffect(() => {
    // Listen for refresh function from DashboardHomePage
    const checkRefresh = setInterval(() => {
      if ((window as any).__dashboardRefresh) {
        setOnRefresh(() => (window as any).__dashboardRefresh);
      }
    }, 100);

    return () => clearInterval(checkRefresh);
  }, []);

  return (
    <div className="w-full">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col md:ml-[15%]">
        <div className="w-full">
          <Navbar onRefresh={onRefresh} />
        </div>

        <div className=" bg-[#f6f6f6]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FrontEndLayout;
