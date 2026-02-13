import React from "react";
import {
  SlimInput,
  SlimSelect,
  SlimTextarea,
  SlimCheckbox,
  SlimSwitch,
} from "@slimkhemiri/react-design-system";

interface InputsDemoProps {
  name: string;
  setName: (value: string) => void;
  error: string | undefined;
  setError: (value: string | undefined) => void;
  country: string;
  setCountry: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  marketing: boolean;
  setMarketing: (value: boolean) => void;
  cardFrozen: boolean;
  setCardFrozen: (value: boolean) => void;
}

export function InputsDemo({
  name,
  setName,
  error,
  setError,
  country,
  setCountry,
  notes,
  setNotes,
  marketing,
  setMarketing,
  cardFrozen,
  setCardFrozen,
}: InputsDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">Inputs</div>
      <div className="stack">
        <SlimInput
          label="Account nickname"
          hint="Shown on statements and transfers"
          value={name}
          placeholder="Enter your account nickname"
          onSlimChange={(e: CustomEvent<string>) => {
            const v = e.detail;
            setName(v);
            setError(v.trim().length < 3 ? "Must be at least 3 characters" : undefined);
          }}
          error={error}
        />
        <SlimSelect
          label="Country"
          value={country}
          options={[
            { value: "fr", label: "France" },
            { value: "be", label: "Belgium" },
            { value: "de", label: "Germany" },
          ]}
          onSlimChange={(e: CustomEvent<string>) => setCountry(e.detail)}
        />

        <SlimTextarea
          label="Notes"
          hint="Optional internal note"
          value={notes}
          onSlimChange={(e: CustomEvent<string>) => setNotes(e.detail)}
        />

        <SlimCheckbox
          label="I agree to receive marketing emails"
          checked={marketing}
          onSlimChange={(e: CustomEvent<boolean>) => setMarketing(e.detail)}
        />

        <SlimSwitch
          label="Freeze card"
          hint="Temporarily disable payments"
          checked={cardFrozen}
          onSlimChange={(e: CustomEvent<boolean>) => setCardFrozen(e.detail)}
        />
      </div>
    </section>
  );
}
