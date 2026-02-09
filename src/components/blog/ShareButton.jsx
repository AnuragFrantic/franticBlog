"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link as LinkIcon, Check, X } from "lucide-react";
import Image from "next/image";
import xicon from "@/app/assets/xicon.png"

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
        } catch (err) {
            console.error("Copy failed", err);
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
        <div className="flex items-center gap-3 text-sm text-gray-700">
            {/* <span className="mr-1">Share</span> */}

            {/* Twitter */}
            <button
                onClick={handleTwitter}
                aria-label="Share on Twitter"
                className="
          flex items-center justify-center
          h-9 w-9
          rounded-full
          border border-gray-300
          hover:bg-gray-100
          transition
        "
            >
                {/* <X className="h-4 w-4" /> */}
                <Image src={xicon} className="h-4 w-4">

                </Image>
            </button>

            {/* LinkedIn */}
            <button
                onClick={handleLinkedIn}
                aria-label="Share on LinkedIn"
                className="
          flex items-center justify-center
          h-9 w-9
          rounded-full
          border border-gray-300
          hover:bg-gray-100
          transition
        "
            >
                <Linkedin className="h-4 w-4" />
            </button>

            {/* Copy Link */}
            <button
                onClick={handleCopy}
                aria-label="Copy link"
                disabled={copied}
                className="
          flex items-center justify-center
          h-9 w-9
          rounded-full
          border border-gray-300
          hover:bg-gray-100
          disabled:opacity-60
          transition
        "
            >
                {copied ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <LinkIcon className="h-4 w-4" />
                )}
            </button>
        </div>
    );
}
