import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  FaUpload,
  FaFilePdf
} from "react-icons/fa";

import {
  uploadFile
} from "../services/uploadService";

import "../styles/uploads.css";

const UploadsPage = () => {

  const [file, setFile] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const handleUpload =
    async () => {

      try {

        if (!file) {

          alert(
            "Select a file first"
          );

          return;
        }

        await uploadFile(file);

        setMessage(
          "✅ Uploaded Successfully"
        );

      } catch (error) {

        console.error(error);

        setMessage(
          "❌ Upload Failed"
        );

      }

    };

  return (

    <DashboardLayout>

      <div className="upload-container">

        <div className="upload-header">

          <h1>
            Upload Notes
          </h1>

          <p>
            Upload PDFs and generate
            flashcards, quizzes and summaries.
          </p>

        </div>

        <div className="upload-card">

          <div className="upload-icon">
            <FaUpload />
          </div>

          <label
            className="file-label"
          >

            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
            />

            Choose File

          </label>

          {
            file && (

              <div
                className="selected-file"
              >

                <FaFilePdf />

                <span>
                  {file.name}
                </span>

              </div>

            )
          }

          <button
            className="upload-btn"
            onClick={
              handleUpload
            }
          >
            Upload Notes
          </button>

          {
            message && (
              <p className="message">
                {message}
              </p>
            )
          }

        </div>

      </div>

    </DashboardLayout>

  );

};

export default UploadsPage;