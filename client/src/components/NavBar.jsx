import { useState, useEffect } from "react";
import axios from "axios";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import LoginPopup from "../auth/LoginPopup";


export function Navbar() {
  const [fileName, setFileName] = useState("No File Chosen");
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    setFileName(uploadedFile.name);
    setLoading(true);
    setError(null);

    try {
      const text = "";
      setPdfText(text);
    } catch (err) {
      setError("Failed to extract text from the PDF.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const userParam = new URLSearchParams(window.location.search).get("user");

    if (userParam) {
      const userData = JSON.parse(decodeURIComponent(userParam));
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      window.history.replaceState({}, document.title, "/profile");
    } else if (!user) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_PRODUCTION_URL}/api/profile`,
            { withCredentials: true }
          );
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (err) {
          console.error("User not authenticated:", err);
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
          <img
            src="../src/assets/image.png"
            alt="AI"
            className="h-10 w-10"
          />
          <h1 className="text-white font-bold font-mono hidden sm:block">
            AskMyPDF
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-sm text-gray-600 sm:flex">
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">{fileName}</span>
            </div>
          </div>
          <label className="flex items-center gap-2 rounded-md bg-[#5b63d3] px-3 ml-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#5b63d3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
            <span>Upload PDF</span>
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
      {loading && <p>Extracting text...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pdfText && (
        <div className="mt-4 text-white">
          <h3>Extracted Text:</h3>
          <p>{pdfText}</p>
        </div>
      )}
    </header>
  );
}
