import { WindIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { apiGetAirQuality } from "../services/api";

interface AirQualityResponse {
  aqi?: number;
  city?: string;
};


export default function AirQuality() {
  const [aqi, setAqi] = useState<number | null>(null);
  const [locationLabel, setLocationLabel] = useState<string>("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAqiBadgeClass = (value: number | null) => {
    if (value === null) return "bg-gray-300 text-black";
    if (value <= 50) return "bg-green-400 text-black";
    if (value <= 100) return "bg-yellow-300 text-black";
    if (value <= 150) return "bg-orange-300 text-black";
    if (value <= 200) return "bg-red-300 text-black";
    return "bg-red-500 text-white";
  };

  const fetchAirQuality = async (latitude: number, longitude: number) => {
    try {
      setError(null);

      const response = (await apiGetAirQuality(latitude, longitude)) as unknown as {
        data: AirQualityResponse;
      };

      const airQualityValue =
        response.data?.aqi ?? null;
      const cityName = response.data?.city ?? "Unknown Location";

      setAqi(airQualityValue);
      setLocationLabel(cityName);
    } catch (err) {
      console.error("Error fetching air quality:", err);
      setError("Unable to load air quality.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationByIP = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
      const data = await response.json();
      console.log("IP Geolocation:", data);
      fetchAirQuality(data.latitude, data.longitude);
    } catch (err) {
      console.error("IP geolocation error:", err);
      setError("Unable to determine location.");
      setLoading(false);
    }
  };

  // const getCurrentLocation = () => {
    // if (!navigator.geolocation) {
  //     console.log("Geolocation not supported, using IP-based geolocation.");
  //     fetchLocationByIP();
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;

  //       console.log("GPS Geolocation: Valid Ghana coordinates");
  //       fetchAirQuality(latitude, longitude);
  //     },
  //     (err) => {
  //       console.error("GPS error:", err);
  //       console.log("Falling back to IP geolocation.");
  //       fetchLocationByIP();
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 10000,
  //       maximumAge: 0,
  //     }
  //   );
  // };

  useEffect(() => {
    fetchLocationByIP();
  }, []);

  return (
    <div>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex">
          <div className="border-2 border-[#3edb00] w-1/5"></div>
          <div className="border-2 border-[#a1f77e] w-1/5"></div>
          <div className="border-2 border-[#ffe02f] w-1/5"></div>
          <div className="border-2 border-[#ffb3b2] w-1/5"></div>
          <div className="border-2 border-[#f84343] w-1/5"></div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <WindIcon className="size-6" />
            <div className="flex flex-col">
              <h2 className="font-semibold text-md">Air Quality</h2>
              <div className="flex items-center gap-1">
                <CiLocationOn className="size-4" />
                <span className="text-xs text-gray-500">
                  {locationLabel}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2
              className={`p-2 rounded-md font-extrabold text-3xl min-w-[60px] text-center ${getAqiBadgeClass(
                aqi
              )}`}
            >
              {loading ? "..." : error ? "--" : aqi ?? "--"}
            </h2>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!error && !loading && aqi !== null && (
          <p className="text-xs text-gray-500">
            {aqi <= 50
              ? "Good air quality"
              : aqi <= 100
                ? "Moderate air quality"
                : aqi <= 150
                  ? "Unhealthy for sensitive groups"
                  : aqi <= 200
                    ? "Unhealthy"
                    : "Very unhealthy"}
          </p>
        )}

        <div className="flex justify-center items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
        </div>
      </div>
    </div>
  );
}