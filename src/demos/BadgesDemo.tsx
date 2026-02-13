import React from "react";
import { SlimBadge } from "@slimkhemiri/react-design-system";

export function BadgesDemo() {
  return (
    <section className="card">
      <div className="cardTitle">Badges</div>
      <div className="row">
        <SlimBadge variant="neutral">Standard</SlimBadge>
        <SlimBadge variant="primary">BPCE</SlimBadge>
        <SlimBadge variant="success">Verified</SlimBadge>
        <SlimBadge variant="warning">Pending</SlimBadge>
        <SlimBadge variant="danger">Blocked</SlimBadge>
        <SlimBadge size="sm" variant="primary">
          New
        </SlimBadge>
      </div>
    </section>
  );
}
