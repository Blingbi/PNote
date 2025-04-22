// src/components/Editor.jsx
import { useEffect, useRef, forwardRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Editor = forwardRef((props, ref) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !ref.current) {
      ref.current = new Quill(containerRef.current, {
        theme: "snow",
      });
    }
  }, [ref]);

  return <div ref={containerRef} className="bg-white border rounded p-2" />;
});

export default Editor;