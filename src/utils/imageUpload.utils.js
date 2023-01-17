export default function processImageUpload(e, callbackFunction) {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onloadend = function () {
    const base64data = reader.result;
    callbackFunction(base64data);
  };
}
