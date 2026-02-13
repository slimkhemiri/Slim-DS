import React from "react";
import {
  SlimInput,
  SlimSelect,
  SlimTextarea,
  SlimCheckbox,
  SlimSwitch,
} from "@slimkhemiri/react-design-system";
import { CodeBlock } from "../components";

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
  showDetails?: boolean;
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
  showDetails = false,
}: InputsDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">
        <span className="componentNumber">02</span>
        Inputs & Forms
      </div>
      
      {showDetails && (
        <div className="componentHeader">
          <p className="componentDescription">
            Complete form controls including text inputs, selects, textareas, checkboxes, and switches.
            All components support validation, hints, error messages, and custom styling for building robust forms.
          </p>
        </div>
      )}
      
      {!showDetails && (
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
      )}

      {showDetails && (
        <div className="componentVariants">
            {/* Text Input */}
          <div className="variantSection">
            <div className="variantHeader">
              <h4 className="variantTitle">Text Input</h4>
              <span className="variantBadge">Core Component</span>
            </div>
            <p className="variantDescription">
              Standard text input with support for labels, hints, placeholders, validation, and error messages. Perfect for collecting user text data.
            </p>
            <div className="variantDemo">
              <div style={{ width: '100%', maxWidth: '400px' }}>
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
              </div>
            </div>
            <CodeBlock
              title="Text Input"
              code={`<SlimInput
  label="Account nickname"
  hint="Shown on statements and transfers"
  value={name}
  placeholder="Enter your account nickname"
  onSlimChange={(e) => setName(e.detail)}
  error={name.length < 3 ? "Must be at least 3 characters" : undefined}
/>`}
              language="tsx"
              defaultExpanded={true}
            />
          </div>

          {/* Select */}
          <div className="variantSection">
            <div className="variantHeader">
              <h4 className="variantTitle">Select</h4>
              <span className="variantBadge">Dropdown</span>
            </div>
            <p className="variantDescription">
              Dropdown selector for choosing from a predefined list of options. Ideal for country selection, categories, or any fixed set of choices.
            </p>
            <div className="variantDemo">
              <div style={{ width: '100%', maxWidth: '400px' }}>
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
              </div>
            </div>
            <CodeBlock
              title="Select"
              code={`<SlimSelect
  label="Country"
  value={country}
  options={[
    { value: "fr", label: "France" },
    { value: "be", label: "Belgium" },
    { value: "de", label: "Germany" }
  ]}
  onSlimChange={(e) => setCountry(e.detail)}
/>`}
              language="tsx"
              defaultExpanded={true}
            />
          </div>

          {/* Textarea */}
          <div className="variantSection">
            <div className="variantHeader">
              <h4 className="variantTitle">Textarea</h4>
              <span className="variantBadge">Multi-line</span>
            </div>
            <p className="variantDescription">
              Multi-line text input for longer content like comments, descriptions, or notes. Automatically resizable for user convenience.
            </p>
            <div className="variantDemo">
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <SlimTextarea
                  label="Notes"
                  hint="Optional internal note"
                  value={notes}
                  onSlimChange={(e: CustomEvent<string>) => setNotes(e.detail)}
                />
              </div>
            </div>
            <CodeBlock
              title="Textarea"
              code={`<SlimTextarea
  label="Notes"
  hint="Optional internal note"
  value={notes}
  onSlimChange={(e) => setNotes(e.detail)}
/>`}
              language="tsx"
              defaultExpanded={true}
            />
          </div>

          {/* Checkbox */}
          <div className="variantSection">
            <div className="variantHeader">
              <h4 className="variantTitle">Checkbox</h4>
              <span className="variantBadge">Boolean</span>
            </div>
            <p className="variantDescription">
              Binary choice control for opt-ins, agreements, or toggles. Use for situations where the user needs to explicitly check or uncheck an option.
            </p>
            <div className="variantDemo">
              <SlimCheckbox
                label="I agree to receive marketing emails"
                checked={marketing}
                onSlimChange={(e: CustomEvent<boolean>) => setMarketing(e.detail)}
              />
            </div>
            <CodeBlock
              title="Checkbox"
              code={`<SlimCheckbox
  label="I agree to receive marketing emails"
  checked={marketing}
  onSlimChange={(e) => setMarketing(e.detail)}
/>`}
              language="tsx"
              defaultExpanded={true}
            />
          </div>

          {/* Switch */}
          <div className="variantSection">
            <div className="variantHeader">
              <h4 className="variantTitle">Switch</h4>
              <span className="variantBadge">Toggle</span>
            </div>
            <p className="variantDescription">
              Modern toggle switch for on/off states. Best for settings and features that take effect immediately, like enabling or disabling a service.
            </p>
            <div className="variantDemo">
              <SlimSwitch
                label="Freeze card"
                hint="Temporarily disable payments"
                checked={cardFrozen}
                onSlimChange={(e: CustomEvent<boolean>) => setCardFrozen(e.detail)}
              />
            </div>
            <CodeBlock
              title="Switch"
              code={`<SlimSwitch
  label="Freeze card"
  hint="Temporarily disable payments"
  checked={cardFrozen}
  onSlimChange={(e) => setCardFrozen(e.detail)}
/>`}
              language="tsx"
              defaultExpanded={true}
            />
          </div>

          {/* Props Documentation */}
          <div className="componentProps">
            <h4 className="demoSubtitle">Common Props</h4>
            <div className="propsGrid">
              <div className="propItem">
                <code className="propName">label</code>
                <span className="propType">string</span>
                <p className="propDescription">Field label displayed above input</p>
              </div>
              <div className="propItem">
                <code className="propName">hint</code>
                <span className="propType">string</span>
                <p className="propDescription">Helper text shown below input</p>
              </div>
              <div className="propItem">
                <code className="propName">error</code>
                <span className="propType">string</span>
                <p className="propDescription">Error message for validation</p>
              </div>
              <div className="propItem">
                <code className="propName">disabled</code>
                <span className="propType">boolean</span>
                <p className="propDescription">Disables user interaction</p>
              </div>
              <div className="propItem">
                <code className="propName">value</code>
                <span className="propType">string</span>
                <p className="propDescription">Current input value (controlled)</p>
              </div>
              <div className="propItem">
                <code className="propName">onSlimChange</code>
                <span className="propType">CustomEvent handler</span>
                <p className="propDescription">Callback when value changes</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
