import React from "react";
import { CodeBlock } from "../components";

interface TablesDemoProps {
  showDetails?: boolean;
}

export function TablesDemo({ showDetails = false }: TablesDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">
        <span className="componentNumber">06</span>
        Data Tables
      </div>
      
      {showDetails && (
        <p className="componentDescription">
          Data table components with sorting, filtering, and pagination. Perfect for displaying large datasets.
        </p>
      )}
      
      <div className="row">
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table className="premiumTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td><span className="statusBadge active">Active</span></td>
                <td>$1,234.56</td>
                <td>2024-01-15</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td><span className="statusBadge pending">Pending</span></td>
                <td>$2,345.67</td>
                <td>2024-01-16</td>
              </tr>
              <tr>
                <td>Bob Johnson</td>
                <td><span className="statusBadge active">Active</span></td>
                <td>$3,456.78</td>
                <td>2024-01-17</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showDetails && (
        <>
          <div className="componentCode">
            <h4 className="demoSubtitle">Code Example</h4>
            <CodeBlock
              title="Data Tables Usage"
              code={`import { SlimTable } from "@slimkhemiri/react-design-system";

function DataView() {
  return (
    <SlimTable
      columns={columns}
      data={tableData}
      sortable
      filterable
      pagination
    />
  );
}`}
              language="tsx"
            />
          </div>

          <div className="componentProps">
            <h4 className="demoSubtitle">Props</h4>
            <ul className="propsList">
              <li><code>columns</code> - Column definitions array</li>
              <li><code>data</code> - Table data array</li>
              <li><code>sortable</code> - boolean (enable column sorting)</li>
              <li><code>filterable</code> - boolean (enable filtering)</li>
              <li><code>pagination</code> - boolean (enable pagination)</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
