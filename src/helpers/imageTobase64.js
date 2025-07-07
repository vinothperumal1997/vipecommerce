// const imageTobase64 = async (image) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(image);
//   const data = await new Promise((resolve, reject) => {
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
//   return data;
// };
// _helpers/imageToBase64.js
const imageToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default imageToBase64;
