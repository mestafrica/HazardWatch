import Map from "../components/Map";

export default function MapPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-3">Hazard Map</h1>
          <div className="h-[calc(100%-3rem)]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}
