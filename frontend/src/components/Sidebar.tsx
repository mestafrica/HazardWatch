
import { Link } from "react-router-dom";
import overviewIcon from "../assets/images/overviewIcon.png";
import homeIcon from "../assets/images/homeIcon.png";
import mapIconIcon from "../assets/images/mapIcon.png";
import SettingsIcon from "../assets/images/settingsIcon.png";
import LogOutIcon from "../assets/images/logOutIcon.png";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[239px] bg-[#FFFFFF] h-[1259px] text-xs p-4">
      <nav className="space-y-4">
        
        <h1 className="w-[109px] h-[43px] pt-[8px] ml-[24px] mt-[20px]">
          <span className="font-bold">GH-HAZARD</span>{" "}
          <span className="text-[0.7rem]">Report</span>
        </h1>

    
        <Link
          to="home"
          className="text-gray-700 flex items-center w-[191px] h-[35px] pt-[8px] hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-[4px] gap-[8px]"
        >
          <img src={homeIcon} alt="Home Icon" className="w-[16px] h-[16px]" />
          Home
        </Link>
        <Link
          to="overview"
          className="text-gray-700 flex items-center w-[191px] h-[35px] pt-[8px] hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-[4px] gap-[8px]"
        >
          <img
            src={overviewIcon}
            alt="Overview Icon"
            className="w-[16px] h-[16px]"
          />
          Overview
        </Link>

        <div className="grid grid-cols-1 mt-1 mb-">
          <h1 className="text-[0.7rem] h-[10px] text-gray-400">
            Others
          </h1>
          <div>
            <div className="w-[50px] h-[2px] mb-[-150%] bg-gray-300 ml-9 mt-[-1%]"></div>
          </div>
        </div>

        <Link
          to="map"
          className="text-gray-700 flex items-center w-[191px] h-[35px] pt-[8px] hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-[4px] gap-[8px]"
        >
          <img src={mapIconIcon} alt="Map Icon" className="w-[16px] h-[16px]" />
          Map
        </Link>

      
        <Link
          to="overview"
          className="text-gray-700 flex items-center w-[191px] h-[35px] pt-[8px] hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-[4px] gap-[8px]"
        >
          <img
            src={overviewIcon}
            alt="Overview Icon"
            className="w-[16px] h-[16px]"
          />
          Overview
        </Link>
        <Link
          to="overview"
          className="text-gray-700 flex items-center w-[191px] h-[35px] pt-[8px] hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-[4px] gap-[8px]"
        >
          <img
            src={overviewIcon}
            alt="Home Icon"
            className="w-[16px] h-[16px]"
          />
          Overview
        </Link>
        <Link
          to="overview"
          className="text-gray-700 flex items-center w-[191px] h-[35px] pt-[8px] hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-[4px] gap-[8px]"
        >
          <img
            src={overviewIcon}
            alt="Home Icon"
            className="w-[16px] h-[16px]"
          />
          Overview
        </Link>

  
        <div className="pt-[50px] space-y-4">
          <Link
            to="settings"
            className="text-gray-700 flex items-center w-[191px] h-[35px] pt-[8px] hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-[4px] gap-[8px]"
          >
            <img
              src={SettingsIcon}
              alt="Settings Icon"
              className="w-[16px] h-[16px]"
            />
            <span className="ml-1">Settings</span>
          </Link>
          <Link
            to="/login"
            className="text-gray-700 flex items-center w-[191px] h-[35px] pt-[8px] hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-[4px] gap-[8px]"
          >
            <img
              src={LogOutIcon}
              alt="LogOut Icon"
              className="w-[16px] h-[16px]"
            />
            <span className="ml-1">Logout</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
