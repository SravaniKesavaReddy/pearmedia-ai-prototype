import axios from "axios";

const HF_API_KEY = "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";

export const enhancePrompt = async (input) => {
  try {
    const res = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        inputs: `Enhance this image prompt with details, lighting, camera angle and style: ${input}`
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
      }
    );

    return res.data[0].generated_text;

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    return "Error enhancing prompt";
  }
};
export const generateImage = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
        responseType: "blob", // VERY IMPORTANT
      }
    );

    return URL.createObjectURL(res.data);

  } catch (err) {
    console.log("IMAGE ERROR:", err.response?.data || err.message);
    return null;
  }
};