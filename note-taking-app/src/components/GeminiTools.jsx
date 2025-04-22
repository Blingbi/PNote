export default function GeminiTools({
    prompt,
    setPrompt,
    response,
    onAsk,
    onSave,
    onSummarize,
    onImprove,
  }) {
    return (
      <div className="mt-4 space-y-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Gemini anything..."
          className="w-full p-2 border rounded"
        ></textarea>
  
        <div className="flex gap-2 flex-wrap">
          <button onClick={onAsk} className="p-2 border rounded">Ask Gemini</button>
          <button onClick={onSave} className="p-2 border rounded">Save Gemini Response as Note</button>
          <button onClick={onSummarize} className="p-2 border rounded">Summarize Current Note</button>
          <button onClick={onImprove} className="p-2 border rounded">Improve Current Note</button>
        </div>
  
        {response && (
          <div className="mt-2 p-2 border rounded bg-gray-50">
            <strong>Gemini:</strong> {response}
          </div>
        )}
      </div>
    );
  }