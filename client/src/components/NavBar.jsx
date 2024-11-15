import { useState, useEffect } from "react";
import axios from "axios";
import { CircleUserRound } from "lucide-react";
import LoginPopup from "../auth/LoginPopup";
import { Link } from "react-router-dom";

export function Navbar() {
  const [fileName, setFileName] = useState("No File Chosen");
  const [pdfText, setPdfText] = useState("");
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(`${import.meta.env.VITE_PRODUCTION_URL}/upload_pdf`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Extracted Text:", response.data.text);
        setPdfText(response.data.text);
      } catch (error) {
        console.error("Error uploading PDF:", error);
      }
    }
  };

 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");

    if (userParam) {
      const userData = JSON.parse(decodeURIComponent(userParam));
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      window.history.replaceState({}, document.title, "/profile");
    } else if (!user) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_URL}/api/profile`, {
            withCredentials: true,
          });
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (error) {
          console.error("User not authenticated:", error);
        }
      };
      fetchUser();
    }
  }, []);

  const openGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_PRODUCTION_URL}/auth/google`, "_self");
  };

  return (
    <header className="bg-[#1f2433]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"} className="flex items-center gap-2">
          <img src="/src/assets/image.png" alt="AI" width={32} height={32} className="h-10 w-10" />
          <h1 className='text-white font-bold font-mono hidden sm:block'>AskMyPDF</h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-sm text-gray-600 sm:flex">
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="hidden sm:inline">{fileName}</span>
            </div>
          </div>
          <label className="flex items-center gap-2 rounded-md bg-[#5b63d3] px-3 ml-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#5b63d3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <span className="hidden sm:inline">Upload PDF</span>
            <span className="sm:hidden">Upload</span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          {user ? (
          <img
            src={user?._json.picture || "https://placehold.co/600x400"}
            className="h-10 w-10 rounded-full border-2"
            alt="Profile"
          />
          ) : (
            <button onClick={openGoogleLogin} aria-label="User Login">
              <CircleUserRound color="gray" height={40} width={40} />
            </button>
          )}
        </div>
      </div>
      {isLoginPopupOpen && <LoginPopup />}
    </header>
  );
}
