import { useState } from "react";
import { enhancePrompt, generateImage } from "./utils/api";

function App() {
  const [input, setInput] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [analysis, setAnalysis] = useState("");

  // ✅ FIXED: Add missing functions
  const handleEnhance = async () => {
    const result = await enhancePrompt(input);
    setEnhanced(result);
  };

  const handleGenerateImage = async () => {
    const img = await generateImage(enhanced);
    setImage(img);
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
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Pear Media AI Tool 🚀</h1>

      {/* TEXT WORKFLOW */}
      <textarea
        placeholder="Enter prompt"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br /><br />
      <button onClick={handleEnhance}>Enhance</button>

      <h3>Enhanced Prompt:</h3>
      <p>{enhanced}</p>

      {enhanced && (
        <button onClick={handleGenerateImage}>
          Generate Image
        </button>
      )}

      <br /><br />
      {image && <img src={image} alt="Generated" width="300" />}

      <hr />

      {/* IMAGE WORKFLOW */}
      <h2>Upload Image</h2>

      <input type="file" onChange={handleImageUpload} />

      <br /><br />

      {uploadedImage && (
        <>
          <img src={uploadedImage} alt="Uploaded" width="300" />
          <br /><br />
          <button onClick={handleAnalyze}>Analyze Image</button>
        </>
      )}

      <h3>Analysis:</h3>
      <p>{analysis}</p>
    </div>
  );
}

export default App;