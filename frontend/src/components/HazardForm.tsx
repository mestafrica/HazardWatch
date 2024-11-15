import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { apiNewHazardReporter } from "../services/auth";
import newHazard from "../assets/images/newHazard.jpg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HazardForm({ onAddHazard }: { onAddHazard: any }) {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [hazardType, setHazardType] = useState("environmental");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await apiNewHazardReporter(formData);
      console.log(response);

      Swal.fire({
        icon: "success",
        title: "Hazard Reported Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to Report Hazard",
        text: "Something went wrong!",
      });
    }

    const newHazard = {
      title,
      images,
      country,
      city,
      longitude,
      latitude,
      hazardType,
      description,
    };
    onAddHazard(newHazard);
    setTitle("");
    setImages([]);
    setCountry("");
    setCity("");
    setLongitude("");
    setLatitude("");
    setHazardType("environmental");
  };

  return (
    <div className="flex items-center  justify-center min-h-[500px] bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <div className="max-h-[550px] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold mb-6 text-blue-700">
                Report a Hazard
              </h2>

              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>
              <input
                type="file"
                multiple
                className="mt-1 block w-full px-8 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Longitute
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Hazard Type
              </label>
              <select
                className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={hazardType}
                onChange={(e) => setHazardType(e.target.value)}
              >
                <option value="environmental">Environmental</option>
                <option value="noise">Noise</option>
                <option value="accident">Accident</option>
                <option value="flood">Flood</option>
                {/* Add more options as needed */}
              </select>

              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                placeholder="describe hazard here"
                className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-[#E6FCF9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Hazard
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 ">
          <img
            src={newHazard}
            alt="new hazard"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
}
