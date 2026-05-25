import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { apiGetAllHazardReports } from "../services/api";
import { HazardReport } from "../types/hazardreport";


const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

// Ghana center
const DEFAULT_CENTER: [number, number] = [-0.187, 5.6037];
const DEFAULT_ZOOM = 7;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [hazards, setHazards] = useState<HazardReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch hazard reports
  useEffect(() => {
    const fetchHazards = async () => {
      try {
        const res = await apiGetAllHazardReports();
        const data = Array.isArray(res.data) ? res.data : (res.data as any).hazardReports ?? [];
        setHazards(data);
      } catch (err) {
        console.error("Failed to fetch hazard reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHazards();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [TILE_URL],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new maplibregl.FullscreenControl(), "top-right");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Add heatmap + markers when hazards load
  useEffect(() => {
    const map = mapRef.current;
    if (!map || hazards.length === 0) return;

    const addLayers = () => {
      // Build GeoJSON from hazard data
      const geojson: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: hazards
          .filter((h) => h.latitude && h.longitude)
          .map((h) => ({
            type: "Feature" as const,
            geometry: {
              type: "Point" as const,
              coordinates: [h.longitude, h.latitude],
            },
            properties: {
              id: h._id,
              title: h.title,
              description: h.description,
              hazardtype: h.hazardtype,
              upvotes: h.upvotes ?? 0,
              city: h.city ?? "",
              country: h.country ?? "",
              userName: h.user?.userName ?? "Anonymous",
              createdAt: h.createdAt,
            },
          })),
      };

      // Remove existing sources/layers if re-rendering
      if (map.getSource("hazards")) {
        if (map.getLayer("hazard-heat")) map.removeLayer("hazard-heat");
        if (map.getLayer("hazard-points")) map.removeLayer("hazard-points");
        map.removeSource("hazards");
      }

      map.addSource("hazards", {
        type: "geojson",
        data: geojson,
      });

      // Heatmap layer — visible at lower zoom levels
      map.addLayer({
        id: "hazard-heat",
        type: "heatmap",
        source: "hazards",
        maxzoom: 15,
        paint: {
          // Weight by upvotes (more upvotes = more intense)
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "upvotes"],
            0, 0.3,
            10, 1,
          ],
          // Increase intensity as zoom level increases
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 1,
            15, 3,
          ],
          // Color gradient from cool to hot
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(0,0,0,0)",
            0.1, "rgba(65,182,196,0.6)",
            0.3, "rgba(127,205,187,0.7)",
            0.5, "rgba(199,233,180,0.8)",
            0.7, "rgba(255,237,160,0.85)",
            0.85, "rgba(254,178,76,0.9)",
            1, "rgba(240,59,32,0.95)",
          ],
          // Radius grows with zoom
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 15,
            15, 30,
          ],
          // Fade out heatmap at high zoom to reveal points
          "heatmap-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12, 0.8,
            15, 0,
          ],
        },
      });

      // Circle layer — visible at higher zoom levels (individual points)
      map.addLayer({
        id: "hazard-points",
        type: "circle",
        source: "hazards",
        minzoom: 10,
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10, 4,
            16, 10,
          ],
          "circle-color": [
            "match",
            ["get", "hazardtype"],
            "environmental", "#10b981",
            "noise", "#f59e0b",
            "accident", "#ef4444",
            "flood", "#3b82f6",
            "#6b7280", // default gray
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
          "circle-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10, 0,
            12, 1,
          ],
        },
      });

      // Popup on click
      map.on("click", "hazard-points", (e) => {
        const feature = e.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;

        const coords = feature.geometry.coordinates.slice() as [number, number];
        const props = feature.properties;

        new maplibregl.Popup({ offset: 10, maxWidth: "280px" })
          .setLngLat(coords)
          .setHTML(
            `<div style="font-family: system-ui, sans-serif;">
              <h3 style="margin:0 0 4px; font-size:14px; font-weight:600; color:#1f2937;">
                ${props.title}
              </h3>
              <span style="display:inline-block; padding:1px 8px; border-radius:9999px; font-size:11px; font-weight:500; background:#fee2e2; color:#b91c1c; margin-bottom:6px;">
                ${props.hazardtype}
              </span>
              <p style="margin:4px 0; font-size:12px; color:#4b5563; line-height:1.4;">
                ${props.description?.slice(0, 120)}${props.description?.length > 120 ? "…" : ""}
              </p>
              <p style="margin:4px 0 0; font-size:11px; color:#9ca3af;">
                📍 ${props.city}${props.country ? ", " + props.country : ""} · 
                👤 ${props.userName} · 
                👍 ${props.upvotes}
              </p>
            </div>`
          )
          .addTo(map);
      });

      // Cursor pointer on hover
      map.on("mouseenter", "hazard-points", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "hazard-points", () => {
        map.getCanvas().style.cursor = "";
      });

      // Fit map to show all hazard points
      if (geojson.features.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        geojson.features.forEach((f) => {
          if (f.geometry.type === "Point") {
            bounds.extend(f.geometry.coordinates as [number, number]);
          }
        });
        map.fitBounds(bounds, { padding: 60, maxZoom: 14 });
      }
    };

    if (map.loaded()) {
      addLayers();
    } else {
      map.on("load", addLayers);
    }
  }, [hazards]);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
            <span className="text-sm text-gray-500">Loading hazard data…</span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">Hazard Types</p>
        <div className="space-y-1">
          {[
            { color: "#ef4444", label: "Accident" },
            { color: "#3b82f6", label: "Flood" },
            { color: "#10b981", label: "Environmental" },
            { color: "#f59e0b", label: "Noise" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
