import React from "react";
import { SlimButton, SlimTooltip } from "@slimkhemiri/react-design-system";

export function TooltipsDemo() {
  return (
    <section className="card">
      <div className="cardTitle">Tooltips</div>
      <div className="row">
        <SlimTooltip text="Top tooltip" placement="top">
          <SlimButton slot="trigger" variant="secondary">
            Hover (top)
          </SlimButton>
        </SlimTooltip>
        <SlimTooltip text="Right tooltip" placement="right">
          <SlimButton slot="trigger" variant="secondary">
            Hover (right)
          </SlimButton>
        </SlimTooltip>
        <SlimTooltip text="Bottom tooltip" placement="bottom">
          <SlimButton slot="trigger" variant="secondary">
            Hover (bottom)
          </SlimButton>
        </SlimTooltip>
        <SlimTooltip placement="left">
          <SlimButton slot="trigger" variant="secondary">
            Hover (left)
          </SlimButton>
          Left Tooltip
        </SlimTooltip>
      </div>
    </section>
  );
}
