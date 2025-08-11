// utils/imageHelpers.js
import React from 'react';

export const constructImageURL = (filename) => {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `http://10.24.0.155:3030/uploads/audit-behaviour/${filename}`;
};

export const createImageModal = (imageUrl) => {
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: pointer;
  `;

  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
  `;

  modal.appendChild(img);
  document.body.appendChild(modal);

  modal.onclick = () => document.body.removeChild(modal);
};

export const handleImageError = (e) => {
  e.target.style.display = "none";
  e.target.parentNode.innerHTML = `
    <div style="color: #999; font-size: 12px; text-align: center;">
      Image not found
    </div>
  `;
};

export const ImageCell = ({ filename, altText = "Photo" }) => {
  if (!filename) {
    return (
      <div
        style={{
          padding: "5px",
          color: "#999",
          fontStyle: "italic",
        }}
      >
        No photo
      </div>
    );
  }

  const imageUrl = constructImageURL(filename);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={imageUrl}
        alt={altText}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          border: "1px solid #ddd",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => createImageModal(imageUrl)}
        onError={handleImageError}
      />
    </div>
  );
};