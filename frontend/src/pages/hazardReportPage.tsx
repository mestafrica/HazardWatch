import MyAutocomplete from "../components/cordinate-location";
import { useState } from "react";

const HazardReportPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-20">
      <div className="h-[324px] mb-4 w-3/4 rounded-xl bg-[#D9D9D9]"></div>

      {/* Form Section */}
      <div className="flex flex-col h-[60rem] p-10 font-medium text-[21px] items-center w-3/4 rounded-xl bg-[#E6FCF9]">
        <p>Environmental Hazard Reporting</p>

        <div className="p-10 w-[90%]">
          <form className="flex flex-col items-center">
            <div>
              <select
                id="options"
                name="options"
                className="h-[50px] focus:outline-none rounded-xl border border-[#008476] font-normal px-32 text-[15px]"
              >
                <option>Water Contamination</option>
                <option>Air Pollution</option>
                <option>Deforestation</option>
              </select>
            </div>

            <div className="py-10 w-full">
              <div className="px-20">
                <p className="font-medium text-[15px]">Description</p>
              </div>
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                className="text-[14px] w-[100%] h-[250px] p-5 rounded-xl font-thin border border-[#008476] focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <button className="h-[50px] bg-[#008476] focus:outline-none rounded-xl w-80 border-[#008476] font-normal text-white px-32 text-[15px]">
                Edit
              </button>
            </div>

            <div className="px-40 mb-6 w-full">
              <p className="font-medium text-[15px]">Location</p>
              <MyAutocomplete />
            </div>

            <div className="px-40 mb-6 w-full">
              <label className="h-[50px] bg-[#008476] focus:outline-none rounded-xl w-80 border-[#008476] font-normal text-white px-32 text-[15px] flex justify-center items-center cursor-pointer">
                Add Photos
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="px-40 w-full">
              <button className="h-[50px] bg-[#008476] focus:outline-none rounded-xl w-80 border-[#008476] font-normal text-white px-32 text-[15px]">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HazardReportPage;
