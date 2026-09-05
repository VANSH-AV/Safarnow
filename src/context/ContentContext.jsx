import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { destinations as staticDestinations } from '../data/destinations';
import { packages as staticPackages } from '../data/packages';
import { hotels as staticHotels } from '../data/hotels';
import { fetchContentTables } from '../lib/backend';

const ContentContext = createContext(null);

function mergeById(base, extra) {
  const map = new Map(base.map((x) => [x.id, x]));
  extra.forEach((x) => {
    if (x && x.id) map.set(x.id, x);
  });
  return Array.from(map.values());
}

export function ContentProvider({ children }) {
  const [extra, setExtra] = useState({ destinations: [], packages: [], hotels: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchContentTables().then((tables) => {
      if (alive) {
        setExtra(tables);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo(() => {
    const destinations = mergeById(staticDestinations, extra.destinations);
    const packages = mergeById(staticPackages, extra.packages);
    const hotels = mergeById(staticHotels, extra.hotels);

    const getDestinationById = (id) => destinations.find((d) => d.id === id);
    const getPackageById = (id) => packages.find((p) => p.id === id);
    const getHotelById = (id) => hotels.find((h) => h.id === id);
    const getPackagesByDestination = (destId) => packages.filter((p) => p.destination === destId);
    const getHotelsByDestination = (destId) => hotels.filter((h) => h.destination === destId);

    return {
      destinations,
      packages,
      hotels,
      loading,
      getDestinationById,
      getPackageById,
      getHotelById,
      getPackagesByDestination,
      getHotelsByDestination,
    };
  }, [extra, loading]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);