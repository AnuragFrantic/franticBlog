"use client";

import PropTypes from "prop-types";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const TextEditor = ({ value, setValue }) => {
    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};

export default TextEditor;

TextEditor.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
};
