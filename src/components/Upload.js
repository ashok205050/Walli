// upload.js
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig"; // Import Firebase storage

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [downloadURL, setDownloadURL] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Capture the selected file
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const storageRef = ref(storage, `images/${file.name}`); // Create a reference in Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true); // Set uploading state to true

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Handle progress, if you want to show the upload percentage
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                console.error("Upload failed:", error);
                setUploading(false); // Reset uploading state if error occurs
            },
            () => {
                // When the upload completes successfully
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("File available at", url);
                    setDownloadURL(url); // Set the download URL
                    setUploading(false); // Reset uploading state
                });
            }
        );
    };

    return (
        <div>
            <h3>Upload Image</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {downloadURL && (
                <div>
                    <p>Uploaded Image URL:</p>
                    <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                        {downloadURL}
                    </a>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
