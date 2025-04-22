// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import {
  login,
  register,
  logout,
  saveNote,
  fetchNotes,
} from "../firebase/config";

import Editor from "../components/editor";
import Canvas from "../components/Canvas";
import GeminiTools from "../components/GeminiTools";

export default function HomePage() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState([]);
  const [geminiPrompt, setGeminiPrompt] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const editorRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (user) fetchNotes(user.uid, setNotes);
  }, [user]);

  const handleSaveNote = async () => {
    if (!editorRef.current || !canvasRef.current || !user) return;
    const content = editorRef.current.root.innerHTML;
    const drawing = canvasRef.current.toDataURL();
    await saveNote(user.uid, content, drawing);
    fetchNotes(user.uid, setNotes);
  };

  const askGemini = async () => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: geminiPrompt }] }] }),
      }
    );
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    setGeminiResponse(text);
  };

  const handleSaveGeminiNote = async () => {
    if (!user) return;
    const drawing = canvasRef.current?.toDataURL();
    await saveNote(user.uid, `<p>${geminiResponse}</p>`, drawing);
    fetchNotes(user.uid, setNotes);
  };

  const summarizeCurrentNote = async () => {
    const text = editorRef.current?.root.innerText;
    if (!text) return;
    const prompt = `Summarize the following note:\n\"\"\"${text}\"\"\"`;
    setGeminiPrompt(prompt);
    await askGemini();
  };

  const improveCurrentNote = async () => {
    const text = editorRef.current?.root.innerText;
    if (!text) return;
    const prompt = `Improve the following note with better clarity and structure:\n\"\"\"${text}\"\"\"`;
    setGeminiPrompt(prompt);
    await askGemini();
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      {!user ? (
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border"
          />
          <button onClick={() => login(email, password)} className="p-2 border rounded w-full">Login</button>
          <button onClick={() => register(email, password)} className="p-2 border rounded w-full">Register</button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Welcome {user.email}</h1>
            <button onClick={logout} className="p-2 border rounded">Logout</button>
          </div>

          <Editor ref={editorRef} />
          <Canvas ref={canvasRef} />

          <button onClick={handleSaveNote} className="p-2 border rounded w-full">Save Note</button>

          <GeminiTools
            prompt={geminiPrompt}
            setPrompt={setGeminiPrompt}
            response={geminiResponse}
            onAsk={askGemini}
            onSave={handleSaveGeminiNote}
            onSummarize={summarizeCurrentNote}
            onImprove={improveCurrentNote}
          />

          <ul className="list-disc pl-5">
            {notes.map((note) => (
              <li key={note.id} className="mb-4">
                <div dangerouslySetInnerHTML={{ __html: note.text }}></div>
                {note.drawing && <img src={note.drawing} alt="drawing" className="mt-2 border" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}