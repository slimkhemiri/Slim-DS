import React from "react";
import { SEO, Footer } from "../../components";
import "./LicensePage.css";

export function LicensePage() {
  return (
    <>
      <SEO
        title="MIT License"
        description="MIT License for Slim Design System"
        keywords="license, MIT, open source, legal"
      />
      <div className="licensePage">
        <div className="licenseContainer">
          <div className="licenseHeader">
            <h1 className="licenseTitle">MIT License</h1>
            <p className="licenseSubtitle">Slim Design System</p>
          </div>

          <div className="licenseContent">
            <div className="licenseSection">
              <p className="licenseText">
                Copyright (c) 2024 slimkhemiri
              </p>
            </div>

            <div className="licenseSection">
              <p className="licenseText">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
            </div>

            <div className="licenseSection">
              <p className="licenseText">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>
            </div>

            <div className="licenseSection">
              <p className="licenseText">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
