import SingleServiceContainer from "@/app/components/SingleServiceContainer";
import React from "react";

export default function ServiceType({ params }) {
  const serviceId = params.serviceType;
  return (
    <div>
      <SingleServiceContainer id={serviceId} />
    </div>
  );
}
