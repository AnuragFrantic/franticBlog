"use client";

import { useState } from "react";

export default function ShareButtons() {
    const [copied, setCopied] = useState(false);

    const getUrl = () => {
        if (typeof window === "undefined") return "";
        return window.location.href;
    };

    const handleCopy = async () => {
        try {
            const url = getUrl();
            if (!url) return;

            await navigator.clipboard.writeText(url);
            setCopied(true);

            setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.log("Copy failed:", error);
        }
    };

    const handleTwitter = () => {
        const url = encodeURIComponent(getUrl());
        if (!url) return;

        window.open(
            `https://twitter.com/intent/tweet?url=${url}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    const handleLinkedIn = () => {
        const url = encodeURIComponent(getUrl());
        if (!url) return;

        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-white/70 mr-1">Share:</span>

            <button
                type="button"
                onClick={handleTwitter}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-semibold backdrop-blur-md transition"
            >
                Twitter
            </button>

            <button
                type="button"
                onClick={handleLinkedIn}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-semibold backdrop-blur-md transition"
            >
                LinkedIn
            </button>

            <button
                type="button"
                onClick={handleCopy}
                disabled={copied}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 disabled:hover:bg-white/10 disabled:opacity-70 border border-white/10 text-white text-sm font-semibold backdrop-blur-md transition"
            >
                {copied ? "Copied ✅" : "Copy Link"}
            </button>
        </div>
    );
}
