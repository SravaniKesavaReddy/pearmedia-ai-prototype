import { useState } from "react";
import { enhancePrompt, generateImage } from "./utils/api";

function App() {
  const [input, setInput] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  // ✅ FIXED: Add missing functions
  const handleEnhance = async () => {
  setLoading(true);
  const res = await enhancePrompt(input);
  setEnhanced(res);
  setLoading(false);
  };

  const handleGenerateImage = async () => {
  setLoading(true);
  const img = await generateImage(enhanced);
  setImage(img);
  setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleAnalyze = () => {
    setAnalysis(
      "This image contains a scenic view with natural lighting and vibrant colors. Style: realistic photography."
    );
  };

return (
  <div style={{
    fontFamily: "Arial",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center"
  }}>
    <h1>🚀 Pear Media AI Tool</h1>
    {loading && <p>⏳ Loading...</p>}

    <textarea
      placeholder="Enter your prompt..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      style={{
        width: "60%",
        height: "100px",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}
    />

    <br />

    <button onClick={handleEnhance} disabled={loading}>
  Enhance ✨
</button>
    <button onClick={handleGenerateImage}>Generate Image 🎨</button>

    <h3>Enhanced Prompt:</h3>
    <p>{enhanced}</p>

    {image && <img src={image} alt="generated" width="300" />}
  </div>
);
}

export default App;