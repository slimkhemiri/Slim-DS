import React, { useState, useRef, useEffect } from "react";
import { SlimButton, SlimInput, SlimAlert } from "@slimkhemiri/react-design-system";
import { ConfirmationResult } from "firebase/auth";
import ReactCountryFlag from "react-country-flag";
import { useAuth } from "../../contexts/AuthContext";
import { countries, getCountryByCode, type Country } from "../../constants/countries";
import "./PhoneAuth.css";

interface PhoneAuthProps {
  onSuccess: () => void;
  mode: "login" | "signup";
}

export function PhoneAuth({ onSuccess, mode }: PhoneAuthProps) {
  const { loginWithPhone, verifyPhoneCode, signupWithPhone } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<Country>(getCountryByCode("FR") || countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countryButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node) &&
        countryButtonRef.current &&
        !countryButtonRef.current.contains(e.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
        setCountrySearchQuery("");
      }
    };

    if (isCountryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isCountryDropdownOpen]);

  // Filter countries based on search
  const filteredCountries = countrySearchQuery
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
          country.dialCode.includes(countrySearchQuery) ||
          country.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
      )
    : countries;

  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setCountrySearchQuery("");
    setError(null);
  };

  const handleSendCode = async () => {
    const digits = phoneNumber.replace(/\D/g, "");
    if (!phoneNumber || digits.length < 8) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fullPhoneNumber = `${selectedCountry.dialCode}${digits}`;
      const result = mode === "login" 
        ? await loginWithPhone(fullPhoneNumber)
        : await signupWithPhone(fullPhoneNumber);
      setConfirmationResult(result);
      setIsCodeSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    if (!confirmationResult) {
      setError("No verification code sent. Please send code first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifyPhoneCode(confirmationResult, verificationCode);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="phoneAuth">
      <div id="recaptcha-container"></div>
      
      {!isCodeSent ? (
        <div className="phoneAuthForm">
          <div className="phoneAuthInputGroup">
            <div className="phoneAuthCountryWrapper">
              <label className="phoneAuthInputLabel">Country</label>
              <button
                ref={countryButtonRef}
                type="button"
                className={`phoneAuthCountryButton ${isCountryDropdownOpen ? "open" : ""}`}
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                disabled={isLoading}
                aria-label="Select country"
                aria-expanded={isCountryDropdownOpen}
              >
                <div className="phoneAuthCountryButtonContent">
                  <ReactCountryFlag
                    countryCode={selectedCountry.code}
                    svg
                    style={{
                      width: '20px',
                      height: '20px',
                    }}
                    className="phoneAuthCountryFlag"
                  />
                  <span className="phoneAuthCountryDialCode">{selectedCountry.dialCode}</span>
                </div>
                <svg
                  className={`phoneAuthCountryArrow ${isCountryDropdownOpen ? "open" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isCountryDropdownOpen && (
                <div ref={countryDropdownRef} className="phoneAuthCountryDropdown">
                  <div className="phoneAuthCountrySearch">
                    <svg
                      className="phoneAuthSearchIcon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      type="text"
                      className="phoneAuthSearchInput"
                      placeholder="Search country..."
                      value={countrySearchQuery}
                      onChange={(e) => setCountrySearchQuery(e.target.value)}
                      autoFocus
                    />
                    {countrySearchQuery && (
                      <button
                        type="button"
                        className="phoneAuthSearchClear"
                        onClick={() => setCountrySearchQuery("")}
                        aria-label="Clear search"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="phoneAuthCountryList">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          className={`phoneAuthCountryItem ${
                            selectedCountry.code === country.code ? "selected" : ""
                          }`}
                          onClick={() => handleCountrySelect(country)}
                        >
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{
                              width: '22px',
                              height: '22px',
                            }}
                            className="phoneAuthCountryItemFlag"
                          />
                          <span className="phoneAuthCountryItemCode">{country.code}</span>
                          <span className="phoneAuthCountryItemDialCode">{country.dialCode}</span>
                          {selectedCountry.code === country.code && (
                            <svg
                              className="phoneAuthCountryItemCheck"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="phoneAuthCountryEmpty">
                        <p>No countries found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="phoneAuthNumberWrapper">
              <SlimInput
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                placeholder="6 12 34 56 78"
                onSlimChange={(e) => {
                  const formatted = formatPhoneNumber(e.detail);
                  setPhoneNumber(formatted);
                  setError(null);
                }}
                error={error && error.includes("phone") ? error : undefined}
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <SlimButton
            type="button"
            variant="primary"
            size="lg"
            style={{ width: "100%", marginTop: "24px" }}
            onClick={handleSendCode}
            disabled={isLoading || !phoneNumber}
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </SlimButton>
        </div>
      ) : (
        <div className="phoneAuthForm">
          <SlimAlert variant="success" style={{ marginBottom: "24px" }}>
            Verification code sent to {selectedCountry.dialCode} {phoneNumber}
          </SlimAlert>
          <SlimInput
            label="Verification Code"
            type="text"
            value={verificationCode}
            placeholder="Enter 6-digit code"
            onSlimChange={(e) => {
              const digits = e.detail.replace(/\D/g, "").slice(0, 6);
              setVerificationCode(digits);
              setError(null);
            }}
            error={error && error.includes("code") ? error : undefined}
            disabled={isLoading}
            required
          />
          <div className="phoneAuthActions">
            <SlimButton
              type="button"
              variant="secondary"
              size="lg"
              style={{ flex: 1 }}
              onClick={() => {
                setIsCodeSent(false);
                setVerificationCode("");
                setConfirmationResult(null);
              }}
              disabled={isLoading}
            >
              Change Number
            </SlimButton>
            <SlimButton
              type="button"
              variant="primary"
              size="lg"
              style={{ flex: 1 }}
              onClick={handleVerifyCode}
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </SlimButton>
          </div>
        </div>
      )}

      {error && !error.includes("phone") && !error.includes("code") && (
        <SlimAlert variant="danger" style={{ marginTop: "16px" }}>
          {error}
        </SlimAlert>
      )}
    </div>
  );
}
