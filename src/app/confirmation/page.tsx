'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

declare global {
  interface Window {
    resizedImageBase64?: string | null;
  }
}

export default function ConfirmationPage() {
    const [codeword, setCodeword] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [timestamp, setTimestamp] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setCodeword(localStorage.getItem("confirmation_codeword"));
        setImage(localStorage.getItem("confirmation_image"));
        setTimestamp(localStorage.getItem("confirmation_timestamp"));
    }, []);

    const handleDone = () => {
        // Remove all confirmation-related data from localStorage
        localStorage.removeItem("confirmation_image");
        localStorage.removeItem("confirmation_codeword");
        localStorage.removeItem("confirmation_timestamp");

        // Clear access-related data
        localStorage.removeItem("access_granted");
        localStorage.removeItem("access_time");
        

    // Remove any global variables
        if (typeof window !== "undefined") {
          window.resizedImageBase64 = null;
        }
    
        // Optionally, reset any React state here (if you use useState for image, codeword, etc.)
        setImage(null);
        setCodeword(null);
        setTimestamp(null);

        // Redirect to the home page
        router.push("/");
    };

    return (
        <div style={{ minHeight: "100vh", background: "#111", color: "#eee", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1>Upload Successful!</h1>
            <div style={{ margin: "20px 0", fontSize: "1.5rem", color: "blue" }}>
                <strong>Codeword:</strong> {codeword}
            </div>
            {image && (
                <Image
                    src={image}
                    alt="Uploaded"
                    style={{ maxWidth: "320px", maxHeight: "220px", borderRadius: "8px", border: "2px solid #3388ff", boxShadow: "0 2px 12px #0003", marginBottom: "20px" }}
                />
            )}
            <div>
                <strong>Timestamp:</strong> {timestamp}
            </div>
            <button
                style={{
                    marginTop: "32px",
                    padding: "12px 24px",
                    maxWidth: "120px",
                    background: "linear-gradient(90deg, #28d17c 60%, #1fa34a 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px #0002"
                }}
                onClick={handleDone}
            >
                Done
            </button>
        </div>
    );
}