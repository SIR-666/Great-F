// components/UploadModal.js
import { useState } from "react";
import { IMAGE_API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

const UploadModal = ({ onClose, onUploadComplete }) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImagePath, setUploadedImagePath] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImage(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    // if (!selectedImage) return;
    if (selectedImage.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedImage.length; i++) {
      formData.append("images", selectedImage[i]);
      // console.log("image2 ", selectedImage[i]);
    }

    try {
      const response = await fetch(`${IMAGE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      setUploadedImagePath(data.uploadedFiles); // Simpan path hasil upload

      // Check if onUploadComplete is a function before calling it
      if (typeof onUploadComplete === "function") {
        onUploadComplete(data.uploadedFiles); // Call the onUploadComplete function with the uploaded image path
        onClose(); // Tutup modal setelah berhasil mengunggah
      } else {
        console.error("onUploadComplete is not a function");
      }

      onClose(); // Tutup modal setelah berhasil upload
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Image</h1>
      {/* <form onSubmit={handleUpload}> */}
      <div className={styles.file}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <br />
      {/* {uploadedImagePath && <p>Uploaded image path: {uploadedImagePath}</p>} */}
      <button onClick={handleUpload} className="btn">
        Upload Image
      </button>
      {/* <input type="submit" value="Upload Image" className="btn" /> */}
      {/* </form> */}
    </div>
  );
};

export default UploadModal;
