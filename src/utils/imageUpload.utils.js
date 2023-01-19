export default function processImageUpload(e, callbackFunction) {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onloadend = function () {
    const base64data = reader.result;
    console.log("base64data", base64data);
    callbackFunction(base64data);
  };
}

export function isPlaceholder(image) {
  return image.includes("https");
}
