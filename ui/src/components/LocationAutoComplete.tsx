// LocationAutocomplete.tsx  — no API key needed
import { useState, useRef, useEffect } from "react";

type Suggestion = {
    display_name: string;
    address: {
        city?: string;
        town?: string;
        county?: string;
        country?: string;
    };
    lat: string;
    lon: string;
};

type Props = {
    defaultValue?: string;
    onPlaceSelected: (data: {
        location: string;
        city: string;
        country: string;
        latitude: string;
        longitude: string;
    }) => void;
};

export function LocationAutocomplete({ defaultValue = "", onPlaceSelected }: Props) {
    const [query, setQuery] = useState(defaultValue);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [open, setOpen] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (query.length < 3) { setSuggestions([]); return; }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
                    { headers: { "Accept-Language": "en", "User-Agent": "hazard-reporter/1.0" } }
                );
                const data: Suggestion[] = await res.json();
                setSuggestions(data);
                setOpen(true);
            } catch { /* network error — stay silent */ }
        }, 400); // debounce to respect Nominatim's 1 req/sec limit
    }, [query]);

    const select = (s: Suggestion) => {
        const city = s.address.city || s.address.town || s.address.county || "";
        setQuery(s.display_name);
        setSuggestions([]);
        setOpen(false);
        onPlaceSelected({
            location: s.display_name,
            city,
            country: s.address.country || "",
            latitude: s.lat,
            longitude: s.lon,
        });
    };

    return (
        <div style={{ position: "relative" }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a location"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {open && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((s, i) => (
                        <li
                            key={i}
                            onClick={() => select(s)}
                            className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                        >
                            {s.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}