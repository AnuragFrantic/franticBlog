




"use client";

import { useState } from "react";
import { ContactService } from "@/services/contactservice";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactPage() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!captchaValue) {
            setError("Please verify captcha");
            return;
        }

        try {
            setLoading(true);
            await ContactService.create(form);

            setForm({ name: "", email: "", phone: "", message: "" });
            setCaptchaValue(null);
            setShowPopup(true);
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050914] ">

            {/* SUCCESS POPUP */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-scale">

                        <CheckCircle2 className="mx-auto text-green-500" size={60} />

                        <h2 className="text-xl font-bold mt-4">
                            Message Sent!
                        </h2>

                        <p className="text-gray-600 mt-2">
                            Thank you for contacting us. We'll get back to you shortly.
                        </p>

                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                        >
                            OK
                        </button>

                    </div>
                </div>
            )}

            {/* MAIN SECTION */}
            <section className="py-16 px-4 relative">

                <div className="max-w-6xl mx-auto">

                    {/* HEADER */}
                    <div className="text-center mb-14">
                        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-8">
                            Contact Us
                        </h1>
                        <p className="text-gray-300">
                            We'd love to hear from you. Send us a message.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                        {/* FORM */}
                        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">

                            <h2 className="text-xl font-bold mb-6">
                                Send a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                    className="input"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="input"
                                />

                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+91 8887998502"
                                    className="input"
                                />

                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Write your message..."
                                    className="input"
                                />

                                {/* CAPTCHA */}
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    onChange={(value) => setCaptchaValue(value)}
                                />

                                {/* ERROR MESSAGE */}
                                {error && (
                                    <p className="text-red-600 text-sm font-medium">
                                        {error}
                                    </p>
                                )}

                                <button
                                    disabled={loading}
                                    className="w-full text-white py-3 rounded-2xl bg-blue-600 hover:bg-blue-700"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>

                            </form>
                        </div>

                        {/* CONTACT INFO */}
                        <div className="space-y-6">

                            <InfoBox icon={<Mail />} title="Email" value="sales@franticpro.com" />
                            <InfoBox icon={<Phone />} title="Phone" value="+91 8887998502, +91 9654091531 , +91 - 8800219427 , +91 - 9625284824" />





                            <InfoBox
                                icon={<MapPin />}
                                title="Address"
                                value="2nd Floor, A100, A Block, Sector 58, Noida, Uttar Pradesh - 201301"
                            />
                            <InfoBox
                                icon={<MapPin />}
                                title="Address"
                                value="1964 Gardner Cir E, Aurora, IL 60503,
United States"
                            />

                        </div>

                    </div>

                </div>
            </section>

            {/* STYLES */}
            <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #ddd;
          padding: 12px;
          border-radius: 12px;
          outline: none;
        }

        .input:focus {
          border-color: #2563eb;
        }

        .animate-scale {
          animation: scale 0.3s ease;
        }

        @keyframes scale {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

        </div>
    );
}

/* INFO BOX */
function InfoBox({ icon, title, value, href }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4">
            <div className="text-black mt-1">{icon}</div>

            <div>
                <p className="font-semibold mb-1">{title}</p>

                {href ? (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline hover:text-blue-700 transition"
                    >
                        {value}
                    </a>
                ) : (
                    <p>{value}</p>
                )}
            </div>
        </div>
    );
}

