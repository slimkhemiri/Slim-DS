import React from "react";
import { SlimAlert } from "@slimkhemiri/react-design-system";

export function AlertsDemo() {
  return (
    <section className="card">
      <div className="cardTitle">Alerts</div>
      <div className="stack">
        <SlimAlert variant="info" heading="Security tip">
          Never share your one-time code with anyone.
        </SlimAlert>
        <SlimAlert variant="success" heading="Payment scheduled">
          Your transfer will run on the next business day.
        </SlimAlert>
        <SlimAlert variant="warning" heading="Unusual activity">
          We noticed a new device. Review recent logins.
        </SlimAlert>
        <SlimAlert variant="danger" heading="Action required">
          Your session is about to expire. Save your work.
        </SlimAlert>
      </div>
    </section>
  );
}
