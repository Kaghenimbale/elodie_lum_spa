"use client";

import React from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

const Location = () => {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <div className="w-[90vw] lg:w-[40vw] h-[40vh]">
          <Map defaultCenter={position} defaultZoom={9} mapId="DEMO_MAP_ID">
            <AdvancedMarker position={position} />
          </Map>
        </div>
      </APIProvider>
    </>
  );
};

export default Location;
