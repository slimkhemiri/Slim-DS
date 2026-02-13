import React from "react";
import { SlimButton } from "@slimkhemiri/react-design-system";

export function ButtonsDemo() {
  return (
    <section className="card">
      <div className="cardTitle">Buttons</div>
      <div className="row">
        <SlimButton variant="primary">Pay now</SlimButton>
        <SlimButton variant="secondary">Cancel</SlimButton>
        <SlimButton variant="danger">Freeze card</SlimButton>
        <SlimButton variant="ghost">Learn more</SlimButton>
        <SlimButton loading>Loading</SlimButton>
      </div>
    </section>
  );
}
