import React from 'react';
import Autocomplete from 'react-google-autocomplete';

const MyAutocomplete: React.FC = () => {
  return (
    <Autocomplete
    apiKey={import.meta.env.REACT_GOOGLE_API_KEY}
      className="h-[50px]  w-80 focus:outline-none rounded-xl border border-[#008476] font-normal px-4 text-[15px]"
      onPlaceSelected={(place) => {
        console.log(place);
      }}
      options={{
        types: ["(regions)"],
        componentRestrictions: { country: "gh" },
      }}
      defaultValue="Ghana"
    />
  );
};

export default MyAutocomplete;
