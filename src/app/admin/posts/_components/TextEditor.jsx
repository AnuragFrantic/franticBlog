"use client";

import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const TextEditor = ({ value, setValue }) => {
    const [showSource, setShowSource] = useState(false);

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    // ✅ Source code button (custom)
                    [{ source: "source" }],

                    // ✅ Headings H1-H6
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    // Text formatting
                    ["bold", "italic", "underline", "strike"],

                    // Lists
                    [{ list: "ordered" }, { list: "bullet" }],

                    // Indent
                    [{ indent: "-1" }, { indent: "+1" }],

                    // Alignment
                    [{ align: [] }],

                    // Colors
                    [{ color: [] }, { background: [] }],

                    // Links & Media
                    ["link", "image", "video"],

                    // Blockquote, Code block
                    ["blockquote", "code-block"],

                    // Clean formatting
                    ["clean"],
                ],
                handlers: {
                    source: () => {
                        setShowSource((prev) => !prev);
                    },
                },
            },
        }),
        []
    );

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "indent",
        "align",
        "color",
        "background",
        "link",
        "image",
        "video",
        "blockquote",
        "code-block",
    ];

    return (
        <div className="w-full">
            {/* ✅ Custom Source Toggle Button */}
            <div style={{ marginBottom: 10 }}>
                <button
                    type="button"
                    onClick={() => setShowSource((prev) => !prev)}
                    style={{
                        border: "1px solid #ddd",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: 14,
                    }}
                >
                    {showSource ? "Visual Editor" : "Source Code"}
                </button>
            </div>

            {showSource ? (
                // ✅ HTML Source View
                <textarea
                    value={value || ""}
                    onChange={(e) => setValue(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "250px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        fontFamily: "monospace",
                        fontSize: "14px",
                    }}
                />
            ) : (
                // ✅ Visual Editor
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                />
            )}
        </div>
    );
};

export default TextEditor;

TextEditor.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
};
