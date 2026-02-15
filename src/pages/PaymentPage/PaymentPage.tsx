import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SlimButton, SlimInput, SlimAlert, SlimBadge } from "@slimkhemiri/react-design-system";
import ReactCountryFlag from "react-country-flag";
import { SEO, Footer } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { countries, getCountryByCode, type Country } from "../../constants/countries";
import "./PaymentPage.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

interface Plan {
    id: string;
    name: string;
    price: number;
    priceId: string;
    interval: "month" | "year";
}

interface PaymentFormProps {
    plan: Plan;
    email: string;
    onSuccess: () => void;
}

function PaymentForm({ plan, email, onSuccess }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [saveCard, setSaveCard] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
    const [cardNumberComplete, setCardNumberComplete] = useState(false);
    const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
    const [cardCvcComplete, setCardCvcComplete] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: email || user?.email || "",
        phone: user?.phone || "",
        address: "",
        city: "",
        postalCode: "",
        country: "US",
    });

    const [phoneCountry, setPhoneCountry] = useState<Country>(getCountryByCode("FR") || countries[0]);
    const [isPhoneCountryDropdownOpen, setIsPhoneCountryDropdownOpen] = useState(false);
    const [phoneCountrySearchQuery, setPhoneCountrySearchQuery] = useState("");
    const phoneCountryDropdownRef = useRef<HTMLDivElement>(null);
    const phoneCountryButtonRef = useRef<HTMLButtonElement>(null);

    const [isBillingCountryDropdownOpen, setIsBillingCountryDropdownOpen] = useState(false);
    const [billingCountrySearchQuery, setBillingCountrySearchQuery] = useState("");
    const billingCountryDropdownRef = useRef<HTMLDivElement>(null);
    const billingCountryButtonRef = useRef<HTMLButtonElement>(null);

    const selectedCountry = getCountryByCode(formData.country) || countries[0];

    // Filter countries based on search
    const filteredPhoneCountries = phoneCountrySearchQuery
        ? countries.filter(
            (country) =>
                country.name.toLowerCase().includes(phoneCountrySearchQuery.toLowerCase()) ||
                country.dialCode.includes(phoneCountrySearchQuery) ||
                country.code.toLowerCase().includes(phoneCountrySearchQuery.toLowerCase())
        )
        : countries;

    const filteredBillingCountries = billingCountrySearchQuery
        ? countries.filter(
            (country) =>
                country.name.toLowerCase().includes(billingCountrySearchQuery.toLowerCase()) ||
                country.dialCode.includes(billingCountrySearchQuery) ||
                country.code.toLowerCase().includes(billingCountrySearchQuery.toLowerCase())
        )
        : countries;

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: email || user.email || prev.email,
                phone: user.phone || prev.phone,
            }));

            // Try to detect country from phone number
            if (user.phone) {
                const dialCode = user.phone.match(/^\+\d+/)?.[0];
                if (dialCode) {
                    const country = countries.find(c => c.dialCode === dialCode);
                    if (country) {
                        setPhoneCountry(country);
                    }
                }
            }
        }
    }, [user, email]);

    // Calculate prices (assuming 20% tax rate)
    const priceHT = plan.price;
    const taxRate = 0.20;
    const taxAmount = priceHT * taxRate;
    const priceTTC = priceHT + taxAmount;

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError(null);
    };

    const handlePhoneCountrySelect = (country: Country) => {
        setPhoneCountry(country);
        setIsPhoneCountryDropdownOpen(false);
        setPhoneCountrySearchQuery("");
    };

    const handleBillingCountrySelect = (country: Country) => {
        setFormData(prev => ({ ...prev, country: country.code }));
        setIsBillingCountryDropdownOpen(false);
        setBillingCountrySearchQuery("");
    };

    // Close phone country dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                phoneCountryDropdownRef.current &&
                !phoneCountryDropdownRef.current.contains(e.target as Node) &&
                phoneCountryButtonRef.current &&
                !phoneCountryButtonRef.current.contains(e.target as Node)
            ) {
                setIsPhoneCountryDropdownOpen(false);
                setPhoneCountrySearchQuery("");
            }
        };

        if (isPhoneCountryDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isPhoneCountryDropdownOpen]);

    // Close billing country dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                billingCountryDropdownRef.current &&
                !billingCountryDropdownRef.current.contains(e.target as Node) &&
                billingCountryButtonRef.current &&
                !billingCountryButtonRef.current.contains(e.target as Node)
            ) {
                setIsBillingCountryDropdownOpen(false);
                setBillingCountrySearchQuery("");
            }
        };

        if (isBillingCountryDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isBillingCountryDropdownOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsProcessing(true);
        setError(null);

        try {
            if (paymentMethod === "paypal") {
                // Handle PayPal payment
                const response = await fetch("/api/checkout/create-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        priceId: plan.priceId,
                        email,
                        userId: user?.id,
                        planId: plan.id,
                        paymentMethod: "paypal",
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to create PayPal session");
                }

                const { sessionId } = await response.json();
                const stripe: any = await stripePromise;

                if (!stripe) {
                    throw new Error("Stripe failed to load");
                }

                const { error: stripeError } = await stripe.redirectToCheckout({
                    sessionId,
                });

                if (stripeError) {
                    throw new Error(stripeError.message);
                }
            } else {
                // Handle card payment
                if (!stripe || !elements) {
                    throw new Error("Stripe not loaded");
                }

                const cardNumberElement = elements.getElement(CardNumberElement);
                if (!cardNumberElement) {
                    throw new Error("Card element not found");
                }

                // Create checkout session
                const response = await fetch("/api/checkout/create-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        priceId: plan.priceId,
                        email,
                        userId: user?.id,
                        planId: plan.id,
                        saveCard,
                        billingAddress: {
                            name: formData.name,
                            address: formData.address,
                            city: formData.city,
                            postalCode: formData.postalCode,
                            country: formData.country,
                        },
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to create checkout session");
                }

                const { sessionId } = await response.json();

                // Redirect to Stripe Checkout
                const { error: stripeError } = await (stripe as any).redirectToCheckout({
                    sessionId,
                });

                if (stripeError) {
                    throw new Error(stripeError.message);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setIsProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "var(--sl-text, #1a1a1a)",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: "500",
                "::placeholder": {
                    color: "var(--sl-text-secondary, #999999)",
                    opacity: 0.7,
                },
            },
            invalid: {
                color: "#fa5252",
                iconColor: "#fa5252",
            },
        },
    };

    const handleCardElementChange = (elementType: "number" | "expiry" | "cvc", complete: boolean, error?: any) => {
        let newCardNumberComplete = cardNumberComplete;
        let newCardExpiryComplete = cardExpiryComplete;
        let newCardCvcComplete = cardCvcComplete;

        if (elementType === "number") {
            newCardNumberComplete = complete;
            setCardNumberComplete(complete);
        }
        if (elementType === "expiry") {
            newCardExpiryComplete = complete;
            setCardExpiryComplete(complete);
        }
        if (elementType === "cvc") {
            newCardCvcComplete = complete;
            setCardCvcComplete(complete);
        }

        if (error) {
            setError(error.message);
        } else {
            setError(null);
        }

        const allComplete = newCardNumberComplete && newCardExpiryComplete && newCardCvcComplete;
        setCardComplete(allComplete);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.paymentCountrySelectContainer') && !target.closest('.paymentPhoneInput')) {
                setIsPhoneCountryDropdownOpen(false);
                setIsBillingCountryDropdownOpen(false);
            }
        };

        if (isPhoneCountryDropdownOpen || isBillingCountryDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isPhoneCountryDropdownOpen, isBillingCountryDropdownOpen]);

    return (
        <form onSubmit={handleSubmit} className="paymentForm">
            <div className="paymentSection">
                <h3 className="paymentSectionTitle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px", verticalAlign: "middle" }}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Contact Information
                </h3>
                <div className="paymentFormGrid">
                    <SlimInput
                        label="Full Name"
                        type="text"
                        value={formData.name}
                        placeholder="John Doe"
                        onSlimChange={(e) => handleInputChange("name", e.detail)}
                        required
                    />
                    <SlimInput
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        placeholder="john@example.com"
                        onSlimChange={(e) => handleInputChange("email", e.detail)}
                        required
                    />
                    <div className="paymentPhoneContainer">
                        <div className="paymentPhoneInputGroup">
                            <div className="paymentPhoneCountryWrapper">
                                <label className="paymentPhoneInputLabel">Country</label>
                                <button
                                    ref={phoneCountryButtonRef}
                                    type="button"
                                    className={`paymentPhoneCountryButton ${isPhoneCountryDropdownOpen ? "open" : ""}`}
                                    onClick={() => setIsPhoneCountryDropdownOpen(!isPhoneCountryDropdownOpen)}
                                    aria-label="Select country"
                                    aria-expanded={isPhoneCountryDropdownOpen}
                                >
                                    <div className="paymentPhoneCountryButtonContent">
                                        <ReactCountryFlag
                                            countryCode={phoneCountry.code}
                                            svg
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                            }}
                                            className="paymentPhoneCountryFlag"
                                        />
                                        <span className="paymentPhoneCountryDialCode">{phoneCountry.dialCode}</span>
                                    </div>
                                    <svg
                                        className={`paymentPhoneCountryArrow ${isPhoneCountryDropdownOpen ? "open" : ""}`}
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
                                {isPhoneCountryDropdownOpen && (
                                    <div ref={phoneCountryDropdownRef} className="paymentPhoneCountryDropdown">
                                        <div className="paymentPhoneCountrySearch">
                                            <svg
                                                className="paymentPhoneSearchIcon"
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
                                                className="paymentPhoneSearchInput"
                                                placeholder="Search country..."
                                                value={phoneCountrySearchQuery}
                                                onChange={(e) => setPhoneCountrySearchQuery(e.target.value)}
                                                autoFocus
                                            />
                                            {phoneCountrySearchQuery && (
                                                <button
                                                    type="button"
                                                    className="paymentPhoneSearchClear"
                                                    onClick={() => setPhoneCountrySearchQuery("")}
                                                    aria-label="Clear search"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                        <div className="paymentPhoneCountryList">
                                            {filteredPhoneCountries.length > 0 ? (
                                                filteredPhoneCountries.map((country) => (
                                                    <button
                                                        key={country.code}
                                                        type="button"
                                                        className={`paymentPhoneCountryItem ${phoneCountry.code === country.code ? "selected" : ""
                                                            }`}
                                                        onClick={() => handlePhoneCountrySelect(country)}
                                                    >
                                                        <ReactCountryFlag
                                                            countryCode={country.code}
                                                            svg
                                                            style={{
                                                                width: '22px',
                                                                height: '22px',
                                                            }}
                                                            className="paymentPhoneCountryItemFlag"
                                                        />
                                                        <span className="paymentPhoneCountryItemCode">{country.code}</span>
                                                        <span className="paymentPhoneCountryItemDialCode">{country.dialCode}</span>
                                                        {phoneCountry.code === country.code && (
                                                            <svg
                                                                className="paymentPhoneCountryItemCheck"
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
                                                <div className="paymentPhoneCountryEmpty">
                                                    <p>No countries found</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="paymentPhoneNumberWrapper">
                                <SlimInput
                                    label="Phone Number"
                                    type="tel"
                                    value={formData.phone}
                                    placeholder="6 12 34 56 78"
                                    onSlimChange={(e) => handleInputChange("phone", e.detail)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="paymentSection">
                <h3 className="paymentSectionTitle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px", verticalAlign: "middle" }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Billing Address
                </h3>
                <div className="paymentFormGrid">
                    <SlimInput
                        label="Street Address"
                        type="text"
                        value={formData.address}
                        placeholder="123 Main Street"
                        onSlimChange={(e) => handleInputChange("address", e.detail)}
                        required
                    />
                    <div className="paymentFormRow">
                        <SlimInput
                            label="City"
                            type="text"
                            value={formData.city}
                            placeholder="New York"
                            onSlimChange={(e) => handleInputChange("city", e.detail)}
                            required
                            style={{ flex: 2 }}
                        />
                        <SlimInput
                            label="Postal Code"
                            type="text"
                            value={formData.postalCode}
                            placeholder="10001"
                            onSlimChange={(e) => handleInputChange("postalCode", e.detail)}
                            required
                            style={{ flex: 1 }}
                        />
                    </div>
                    <div className="paymentCountrySelectContainer">
                        <label className="paymentInputLabel">Country</label>
                        <button
                            ref={billingCountryButtonRef}
                            type="button"
                            className={`paymentBillingCountryButton ${isBillingCountryDropdownOpen ? "open" : ""}`}
                            onClick={() => setIsBillingCountryDropdownOpen(!isBillingCountryDropdownOpen)}
                            aria-label="Select country"
                            aria-expanded={isBillingCountryDropdownOpen}
                        >
                            <div className="paymentBillingCountryButtonContent">
                                <ReactCountryFlag
                                    countryCode={selectedCountry.code}
                                    svg
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                    }}
                                    className="paymentBillingCountryFlag"
                                />
                                <span className="paymentBillingCountryName">{selectedCountry.name}</span>
                            </div>
                            <svg
                                className={`paymentBillingCountryArrow ${isBillingCountryDropdownOpen ? "open" : ""}`}
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
                        {isBillingCountryDropdownOpen && (
                            <div ref={billingCountryDropdownRef} className="paymentBillingCountryDropdown">
                                <div className="paymentBillingCountrySearch">
                                    <svg
                                        className="paymentBillingSearchIcon"
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
                                        className="paymentBillingSearchInput"
                                        placeholder="Search country..."
                                        value={billingCountrySearchQuery}
                                        onChange={(e) => setBillingCountrySearchQuery(e.target.value)}
                                        autoFocus
                                    />
                                    {billingCountrySearchQuery && (
                                        <button
                                            type="button"
                                            className="paymentBillingSearchClear"
                                            onClick={() => setBillingCountrySearchQuery("")}
                                            aria-label="Clear search"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="paymentBillingCountryList">
                                    {filteredBillingCountries.length > 0 ? (
                                        filteredBillingCountries.map((country) => (
                                            <button
                                                key={country.code}
                                                type="button"
                                                className={`paymentBillingCountryItem ${formData.country === country.code ? "selected" : ""
                                                    }`}
                                                onClick={() => handleBillingCountrySelect(country)}
                                            >
                                                <ReactCountryFlag
                                                    countryCode={country.code}
                                                    svg
                                                    style={{
                                                        width: '22px',
                                                        height: '22px',
                                                    }}
                                                    className="paymentBillingCountryItemFlag"
                                                />
                                                <span className="paymentBillingCountryItemCode">{country.code}</span>
                                                <span className="paymentBillingCountryItemName">{country.name}</span>
                                                {formData.country === country.code && (
                                                    <svg
                                                        className="paymentBillingCountryItemCheck"
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
                                        <div className="paymentBillingCountryEmpty">
                                            <p>No countries found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="paymentSection">
                <div className="paymentMethodSelector">
                    <button
                        type="button"
                        className={`paymentMethodButton ${paymentMethod === "card" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("card")}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 10h22" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Card
                    </button>
                    <button
                        type="button"
                        className={`paymentMethodButton ${paymentMethod === "paypal" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("paypal")}
                    >
                        <svg width="50" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="24" cy="24" r="20" fill="#0070BA"></circle> <path d="M32.3305 18.0977C32.3082 18.24 32.2828 18.3856 32.2542 18.5351C31.2704 23.5861 27.9046 25.331 23.606 25.331H21.4173C20.8916 25.331 20.4486 25.7127 20.3667 26.2313L19.2461 33.3381L18.9288 35.3527C18.8755 35.693 19.1379 36 19.4815 36H23.3634C23.8231 36 24.2136 35.666 24.286 35.2127L24.3241 35.0154L25.055 30.3772L25.1019 30.1227C25.1735 29.6678 25.5648 29.3338 26.0245 29.3338H26.6051C30.3661 29.3338 33.3103 27.8068 34.1708 23.388C34.5303 21.5421 34.3442 20.0008 33.393 18.9168C33.1051 18.59 32.748 18.3188 32.3305 18.0977Z" fill="white" fill-opacity="0.6"></path> <path d="M31.3009 17.6871C31.1506 17.6434 30.9955 17.6036 30.8364 17.5678C30.6766 17.5328 30.5127 17.5018 30.3441 17.4748C29.754 17.3793 29.1074 17.334 28.4147 17.334H22.5676C22.4237 17.334 22.2869 17.3666 22.1644 17.4254C21.8948 17.5551 21.6944 17.8104 21.6459 18.1229L20.402 26.0013L20.3662 26.2311C20.4481 25.7126 20.8911 25.3308 21.4168 25.3308H23.6055C27.9041 25.3308 31.2699 23.5851 32.2537 18.5349C32.2831 18.3854 32.3078 18.2398 32.33 18.0975C32.0811 17.9655 31.8115 17.8525 31.5212 17.7563C31.4496 17.7324 31.3757 17.7094 31.3009 17.6871Z" fill="white" fill-opacity="0.8"></path> <path d="M21.6461 18.1231C21.6946 17.8105 21.895 17.5552 22.1646 17.4264C22.2879 17.3675 22.4239 17.3349 22.5678 17.3349H28.4149C29.1077 17.3349 29.7542 17.3803 30.3444 17.4757C30.513 17.5027 30.6768 17.5338 30.8367 17.5687C30.9957 17.6045 31.1508 17.6443 31.3011 17.688C31.3759 17.7103 31.4498 17.7334 31.5222 17.7564C31.8125 17.8527 32.0821 17.9664 32.331 18.0976C32.6237 16.231 32.3287 14.9601 31.3194 13.8093C30.2068 12.5424 28.1986 12 25.629 12H18.169C17.6441 12 17.1963 12.3817 17.1152 12.9011L14.0079 32.5969C13.9467 32.9866 14.2473 33.3381 14.6402 33.3381H19.2458L20.4022 26.0014L21.6461 18.1231Z" fill="white"></path> </g></svg>
                    </button>
                </div>

                {paymentMethod === "card" ? (
                    <div className="paymentCardWrapper">
                        <div className="paymentCardHeader">
                            <div className="paymentCardHeaderLeft">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="paymentCardIcon">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 10h22" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="paymentCardTitle">Bank Card</span>
                            </div>
                            <div className="paymentCardIcons">
                                <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                                    <rect width="32" height="20" rx="2" fill="#1A1F71" />
                                    <path d="M12 8h8M12 11h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                                    <rect width="32" height="20" rx="2" fill="#EB001B" />
                                    <circle cx="11" cy="10" r="6" fill="#F79E1B" />
                                </svg>
                            </div>
                        </div>

                        <div className="paymentCardFields">
                            <div className="paymentCardField">
                                <label className="paymentCardFieldLabel">Card Number</label>
                                <div className="paymentCardInputWrapper">
                                    <CardNumberElement
                                        options={cardElementOptions}
                                        onChange={(e) => handleCardElementChange("number", e.complete, e.error)}
                                    />
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="paymentCardInputIcon">
                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 10h22" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="paymentCardFieldRow">
                                <div className="paymentCardField">
                                    <label className="paymentCardFieldLabel">Expiration Date (MM/YY)</label>
                                    <div className="paymentCardInputWrapper">
                                        <CardExpiryElement
                                            options={cardElementOptions}
                                            onChange={(e) => handleCardElementChange("expiry", e.complete, e.error)}
                                        />
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="paymentCardInputIcon">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="paymentCardField">
                                    <label className="paymentCardFieldLabel">Security Code (CVC)</label>
                                    <div className="paymentCardInputWrapper">
                                        <CardCvcElement
                                            options={cardElementOptions}
                                            onChange={(e) => handleCardElementChange("cvc", e.complete, e.error)}
                                        />
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="paymentCardInputIcon">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M1 10h22" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="paymentCardCountryTax">
                                <label className="paymentCardFieldLabel">Country</label>
                                <button
                                    ref={billingCountryButtonRef}
                                    type="button"
                                    className={`paymentCardCountryButton ${isBillingCountryDropdownOpen ? "open" : ""}`}
                                    onClick={() => setIsBillingCountryDropdownOpen(!isBillingCountryDropdownOpen)}
                                    aria-label="Select country"
                                    aria-expanded={isBillingCountryDropdownOpen}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="paymentCardGlobeIcon">
                                        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="paymentCardCountryName">{selectedCountry.name}</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="paymentCardCountryArrow">
                                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                {isBillingCountryDropdownOpen && (
                                    <div ref={billingCountryDropdownRef} className="paymentBillingCountryDropdown">
                                        <div className="paymentBillingCountrySearch">
                                            <svg className="paymentBillingSearchIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input
                                                type="text"
                                                className="paymentBillingSearchInput"
                                                placeholder="Search country..."
                                                value={billingCountrySearchQuery}
                                                onChange={(e) => setBillingCountrySearchQuery(e.target.value)}
                                                autoFocus
                                            />
                                            {billingCountrySearchQuery && (
                                                <button type="button" className="paymentBillingSearchClear" onClick={() => setBillingCountrySearchQuery("")} aria-label="Clear search">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                        <div className="paymentBillingCountryList">
                                            {filteredBillingCountries.length > 0 ? (
                                                filteredBillingCountries.map((country) => (
                                                    <button
                                                        key={country.code}
                                                        type="button"
                                                        className={`paymentBillingCountryItem ${formData.country === country.code ? "selected" : ""}`}
                                                        onClick={() => handleBillingCountrySelect(country)}
                                                    >
                                                        <ReactCountryFlag countryCode={country.code} svg style={{ width: '22px', height: '22px' }} className="paymentBillingCountryItemFlag" />
                                                        <span className="paymentBillingCountryItemCode">{country.code}</span>
                                                        <span className="paymentBillingCountryItemName">{country.name}</span>
                                                        {formData.country === country.code && (
                                                            <svg className="paymentBillingCountryItemCheck" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="paymentBillingCountryEmpty"><p>No countries found</p></div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <p className="paymentCardTaxNote">We use this to calculate tax.</p>
                            </div>

                            <div className="paymentCardSaveCheckbox">
                                <label className="paymentCardSaveLabel">
                                    <input
                                        type="checkbox"
                                        checked={saveCard}
                                        onChange={(e) => setSaveCard(e.target.checked)}
                                        className="paymentCardCheckbox"
                                    />
                                    <span>Save card information for future purchases</span>
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="paymentPayPalWrapper">
                        <div className="paymentPayPalContent">
                            <div className="paymentPayPalLogo">
                                <svg viewBox="0 -140 780 780" enableBackground="new 0 0 780 500" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="780" height="500" fill="#FFF" />
                                    <path d="m168.38 169.85c-8.399-5.774-19.359-8.668-32.88-8.668h-52.346c-4.145 0-6.435 2.073-6.87 6.214l-21.265 133.48c-0.221 1.311 0.107 2.51 0.981 3.6 0.869 1.093 1.962 1.636 3.271 1.636h24.864c4.361 0 6.758-2.068 7.198-6.216l5.888-35.985c0.215-1.744 0.982-3.162 2.291-4.254 1.308-1.09 2.944-1.804 4.907-2.13 1.963-0.324 3.814-0.487 5.562-0.487 1.743 0 3.814 0.11 6.217 0.327 2.397 0.218 3.925 0.324 4.58 0.324 18.756 0 33.478-5.285 44.167-15.866 10.684-10.577 16.032-25.244 16.032-44.004 0-12.868-4.202-22.192-12.597-27.975zm-26.99 40.08c-1.094 7.635-3.926 12.649-8.506 15.049-4.581 2.403-11.124 3.597-19.629 3.597l-10.797 0.328 5.563-35.007c0.434-2.397 1.851-3.597 4.252-3.597h6.218c8.72 0 15.049 1.257 18.975 3.761 3.924 2.51 5.233 7.802 3.924 15.869z" fill="#003087" />
                                    <path d="m720.79 161.18h-24.208c-2.405 0-3.821 1.2-4.253 3.599l-21.267 136.1-0.328 0.654c0 1.096 0.437 2.127 1.311 3.109 0.868 0.979 1.963 1.471 3.271 1.471h21.595c4.138 0 6.429-2.068 6.871-6.215l21.265-133.81v-0.325c-2e-3 -3.053-1.424-4.58-4.257-4.58z" fill="#009CDE" />
                                    <path d="m428.31 213.86c0-1.088-0.438-2.126-1.306-3.106-0.875-0.981-1.857-1.474-2.945-1.474h-25.191c-2.404 0-4.366 1.096-5.89 3.271l-34.679 51.04-14.394-49.075c-1.096-3.488-3.493-5.236-7.198-5.236h-24.54c-1.093 0-2.075 0.492-2.942 1.474-0.875 0.98-1.309 2.019-1.309 3.106 0 0.44 2.127 6.871 6.379 19.303 4.252 12.434 8.833 25.848 13.741 40.244 4.908 14.394 7.468 22.031 7.688 22.898-17.886 24.43-26.826 37.518-26.826 39.26 0 2.838 1.417 4.254 4.253 4.254h25.191c2.399 0 4.361-1.088 5.89-3.271l83.427-120.4c0.433-0.433 0.651-1.193 0.651-2.289z" fill="#003087" />
                                    <path d="m662.89 209.28h-24.865c-3.056 0-4.904 3.599-5.559 10.797-5.677-8.72-16.031-13.088-31.083-13.088-15.704 0-29.065 5.89-40.077 17.668-11.016 11.779-16.521 25.631-16.521 41.551 0 12.871 3.761 23.121 11.285 30.752 7.524 7.639 17.611 11.451 30.266 11.451 6.323 0 12.757-1.311 19.3-3.926 6.544-2.617 11.665-6.105 15.379-10.469 0 0.219-0.222 1.198-0.654 2.942-0.44 1.748-0.655 3.06-0.655 3.926 0 3.494 1.414 5.234 4.254 5.234h22.576c4.138 0 6.541-2.068 7.193-6.216l13.415-85.389c0.215-1.309-0.111-2.507-0.981-3.599-0.876-1.087-1.964-1.634-3.273-1.634zm-42.694 64.452c-5.562 5.453-12.269 8.179-20.12 8.179-6.328 0-11.449-1.742-15.377-5.234-3.928-3.483-5.891-8.282-5.891-14.396 0-8.064 2.727-14.884 8.181-20.446 5.446-5.562 12.214-8.343 20.284-8.343 6.102 0 11.174 1.8 15.212 5.397 4.032 3.599 6.055 8.563 6.055 14.888-1e-3 7.851-2.783 14.505-8.344 19.955z" fill="#009CDE" />
                                    <path d="m291.23 209.28h-24.864c-3.058 0-4.908 3.599-5.563 10.797-5.889-8.72-16.25-13.088-31.081-13.088-15.704 0-29.065 5.89-40.078 17.668-11.016 11.779-16.521 25.631-16.521 41.551 0 12.871 3.763 23.121 11.288 30.752 7.525 7.639 17.61 11.451 30.262 11.451 6.104 0 12.433-1.311 18.975-3.926 6.543-2.617 11.778-6.105 15.704-10.469-0.875 2.616-1.309 4.907-1.309 6.868 0 3.494 1.417 5.234 4.253 5.234h22.574c4.141 0 6.543-2.068 7.198-6.216l13.413-85.389c0.215-1.309-0.112-2.507-0.981-3.599-0.873-1.087-1.962-1.634-3.27-1.634zm-42.695 64.614c-5.563 5.351-12.382 8.017-20.447 8.017-6.329 0-11.4-1.742-15.214-5.234-3.819-3.483-5.726-8.282-5.726-14.396 0-8.064 2.725-14.884 8.18-20.446 5.449-5.562 12.211-8.343 20.284-8.343 6.104 0 11.175 1.8 15.214 5.398 4.032 3.599 6.052 8.563 6.052 14.888 0 8.069-2.781 14.778-8.343 20.116z" fill="#003087" />
                                    <path d="m540.04 169.85c-8.398-5.774-19.356-8.668-32.879-8.668h-52.02c-4.364 0-6.765 2.073-7.197 6.214l-21.266 133.48c-0.221 1.312 0.106 2.511 0.981 3.601 0.865 1.092 1.962 1.635 3.271 1.635h26.826c2.617 0 4.361-1.416 5.235-4.252l5.89-37.949c0.216-1.744 0.98-3.162 2.29-4.254 1.309-1.09 2.943-1.803 4.908-2.13 1.962-0.324 3.812-0.487 5.562-0.487 1.743 0 3.814 0.11 6.214 0.327 2.399 0.218 3.931 0.324 4.58 0.324 18.76 0 33.479-5.285 44.168-15.866 10.688-10.577 16.031-25.244 16.031-44.004 2e-3 -12.867-4.199-22.191-12.594-27.974zm-33.534 53.82c-4.799 3.271-11.997 4.906-21.592 4.906l-10.47 0.328 5.562-35.007c0.432-2.397 1.849-3.597 4.252-3.597h5.887c4.798 0 8.614 0.218 11.454 0.653 2.831 0.44 5.562 1.799 8.179 4.089 2.618 2.291 3.926 5.618 3.926 9.98 0 9.16-2.402 15.375-7.198 18.648z" fill="#009CDE" />
                                </svg>
                            </div>
                            <p className="paymentPayPalText">You will be redirected to PayPal to complete your payment</p>
                        </div>
                    </div>
                )}

                <div className="paymentDisclaimer">
                    <p className="paymentDisclaimerText">
                        This site is protected by reCAPTCHA. Google's <a href="#" className="paymentDisclaimerLink">Privacy Policy</a> and <a href="#" className="paymentDisclaimerLink">Terms of Service</a> apply. Payments will be international payments. Additional bank fees may apply. By continuing, I certify that this information about the address is correct.
                    </p>
                </div>
            </div>

            {error && (
                <SlimAlert variant="danger" style={{ marginBottom: "16px" }}>
                    {error}
                </SlimAlert>
            )}

            <div className="paymentSummary">
                <div className="paymentSummaryRow">
                    <span className="paymentSummaryLabel">Plan</span>
                    <span className="paymentSummaryValue">{plan.name} Plan</span>
                </div>
                <div className="paymentSummaryRow">
                    <span className="paymentSummaryLabel">Price HT</span>
                    <span className="paymentSummaryValue">${priceHT.toFixed(2)}</span>
                </div>
                <div className="paymentSummaryRow">
                    <span className="paymentSummaryLabel">Tax (20%)</span>
                    <span className="paymentSummaryValue">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="paymentSummaryDivider"></div>
                <div className="paymentSummaryRow paymentSummaryTotal">
                    <span className="paymentSummaryLabel">Total TTC</span>
                    <span className="paymentSummaryValue">${priceTTC.toFixed(2)}/{plan.interval}</span>
                </div>
                <div className="paymentTrialBadge">
                    <SlimBadge variant="success" size="sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "4px" }}>
                            <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
                        </svg>
                        14-Day Free Trial
                    </SlimBadge>
                </div>
            </div>

            <SlimButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={
                    isProcessing ||
                    (paymentMethod === "card" && (!stripe || !cardNumberComplete || !cardExpiryComplete || !cardCvcComplete))
                }
                style={{ width: "100%", marginTop: "24px" }}
            >
                {isProcessing ? "Processing..." : paymentMethod === "paypal" ? "Continue with PayPal" : "Proceed to Payment"}
            </SlimButton>
        </form>
    );
}

export function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoading } = useAuth();

    const plan = location.state?.plan as Plan | undefined;
    const email = location.state?.email as string | undefined;

    useEffect(() => {
        // Wait for auth to finish loading
        if (isLoading) {
            return;
        }

        // Redirect to login if not authenticated
        if (!user) {
            navigate("/login");
            return;
        }

        // Redirect to pricing if no plan/email provided
        if (!plan || !email) {
            navigate("/pricing");
        }
    }, [user, isLoading, plan, email, navigate]);

    // Show nothing while loading or if redirecting
    if (isLoading || !user || !plan || !email) {
        return null;
    }

    return (
        <>
            <SEO
                title="Payment"
                description="Complete your purchase securely"
                keywords="payment, checkout, subscription"
            />
            <div className="paymentPage">
                <div className="paymentContainer">
                    <div className="paymentHeader">
                        <button
                            className="paymentBackButton"
                            onClick={() => navigate("/pricing")}
                            aria-label="Back to pricing"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <h1 className="paymentTitle">Complete Your Purchase</h1>
                        <p className="paymentSubtitle">
                            Review your order and complete your payment securely
                        </p>
                    </div>

                    <div className="paymentContent">
                        <div className="paymentPlanCard">
                            <div className="paymentPlanHeader">
                                <h3 className="paymentPlanName">{plan.name} Plan</h3>
                                <div className="paymentPlanPrice">
                                    ${plan.price}/{plan.interval}
                                </div>
                            </div>
                            <div className="paymentPlanTrial">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round" />
                                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
                                </svg>
                                <span className="paymentPlanTrialText">
                                    <strong>14-Day Free Trial</strong> • No credit card required to start
                                </span>
                            </div>
                        </div>

                        <Elements stripe={stripePromise}>
                            <PaymentForm
                                plan={plan}
                                email={email}
                                onSuccess={() => {
                                    // This will be handled by Stripe redirect
                                }}
                            />
                        </Elements>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
