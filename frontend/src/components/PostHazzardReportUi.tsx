import React, { FormEvent, useState } from "react";
import profilePic from "../assets/images/postHazzardReportUi/profilePic.png";
import imageIcon from "../assets/images/postHazzardReportUi/video-image-audio.png";
import map from "../assets/images/postHazzardReportUi/map-and-location.png";
import paperClip from "../assets/images/postHazzardReportUi/paperclip.png";
import emotions from "../assets/images/postHazzardReportUi/emotions.png";
import { apiPostHazzardReport } from "../pages/services/hazzards";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Swal from "sweetalert2";

const PostHazzardReportUi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      event.preventDefault(); // Prevent page reload
      const formData = new FormData(event.currentTarget);
      await apiPostHazzardReport(formData);
    } catch (error) {
      Swal.fire({
        title: "Oops!... Post failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };



   

  return (
    <section
      id="post-hazzard"
      className="lg:w-[45vw] md:w-[45vw] w-[100vw] lg:h-[16vh] flex-grow bg-[#dddddd] mx-auto"
    >
      <div
        id="alignment-container"
        className="w-[90%] h-[100%] mx-auto flex justify-between py-[20px]"
      >
        <div
          id="avatar-side"
          className="lg:w-[7%] h-[100%] flex items-start justify-end"
        >
          <div className="w-[50px] h-[50px] rounded-[50px] overflow-hidden">
            <img
              src={profilePic}
              alt="profile picture"
              className="h-[100%] w-[100%]"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          id="post-side"
          className="w-[91%] h-[100%] flex flex-col gap-y-[1rem] justify-between"
        >
          <div id="post-side-top" className="h-[47%] w-[100%] ">
            <input
              type="text"
              className="lg:h-[100%] h-auto w-[100%] text-[1.2rem] px-[25px] rounded-[50px] bg-[#F2F2F2]"
              placeholder="Type here"
              multiple
              onFocus={() => setIsOpen(true)}
            />
          </div>
          <div
            id="post-side-bottom"
            className="h-[47%] w-[100%] flex lg:flex-row items-center lg:justify-between md:justify-between flex-col gap-y-[1rem]"
          >
            <div id="icons" className="flex gap-x-[1.5rem]">
              <img
                src={imageIcon}
                alt="image upload icon"
                className="w-[25px]"
              />
              <img src={map} alt="map icon" className="w-[25px]" />
              <img
                src={paperClip}
                alt="attach file icon"
                className="w-[25px]"
              />
              <img src={emotions} alt="emotion icon" className="w-[25px]" />
            </div>
            <div id="btn">
              <button
                type="submit"
                className="py-[10px] px-[30px] rounded-[10px] bg-black text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel className="max-w-[60vw] flex flex-col gap-y-[1.5rem] space-y-4 bg-white p-12 rounded-[10px]">
              <div>
                <DialogTitle className="text-[1.4rem] font-bold">
                  Report Environmental Hazzards
                </DialogTitle>
                <Description className="text-[#9B9B9B]">
                  Submit report on pollution by providing details, photos, and
                  location to help us track and address environmental concerns{" "}
                </Description>
              </div>
              <div className="w-[100%]">
                <form action="" className="flex flex-col gap-y-[1rem]">
                  <div className="flex flex-col gap-y-[0.5rem]">
                    <label htmlFor="hazard-type">Select Hazzard Type</label>
                    <select
                      name="hazard-type"
                      id="hazard-type"
                      className="border-[2px] border-[solid] rounded-[10px] h-[45px] lg:w-[60%] md:w-[100%] w-[100%] px-[20px]"
                    >
                      <option
                        value=""
                        className="bg-[white] "
                        disabled
                        selected
                      >
                        Select from the list
                      </option>
                      <option value="" className="bg-[white]">
                        Air Quality
                      </option>
                      <option value="" className="bg-[white]">
                        Water Contamination
                      </option>
                      <option value="" className="bg-[white]">
                        Noise Levels
                      </option>
                    </select>
                  </div>
                  <div className="h-[100%] flex lg:flex-row md:flex-col flex-col md:gap-y-[1.5rem] gap-y-[1.5`rem] items-end justify-between">
                    <div
                      id="description-field"
                      className="lg:w-[59%] md:w-[100%] w-[100%] flex flex-col gap-y-[0.5rem]"
                    >
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        className="border-[2px] border-[solid] rounded-[10px] h-[200px]"
                      ></textarea>
                    </div>
                    <div
                      id="upload-file"
                      className="lg:w-[39%] md:w-[100%] w-[100%] flex flex-col gap-y-[0.5rem]"
                    >
                      <label htmlFor="file-upload">Upload images</label>
                      <label
                        htmlFor="file-upload"
                        className="upload-box w-[100%] h-[200px] border-dashed border-2 bg-[#efeeee] border-gray-400 flex flex-col items-center justify-center cursor-pointer"
                      >
                        <span className="text-gray-500 w-[40px] text-[rem] h-[40px] align-middle rounded-[40px] bg-[#d8d8d8] flex items-center justify-center">
                          +
                        </span>
                        {/* <span className="text-gray-500 text-sm">
                          Upload images
                        </span> */}
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={() => setIsOpen(false)}
                    className="bg-black w-[120px] text-white py-[8px] rounded-[10px]"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </section>
  );
};

export default PostHazzardReportUi;
