'use client'
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "@/config/firebase"; // adjust path as needed
import React, { useRef } from "react";
import Image from "next/image"; 

interface Submission {
  id: string;
  TimeStamp: string;
  CODEWORD: string;
  imageBinary: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "submissions"));
        const data: Submission[] = [];
        querySnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            TimeStamp: d.TimeStamp,
            CODEWORD: d.CODEWORD,
            imageBinary: d.imageBinary,
          });
        });
        // Sort by timestamp (newest first)
        data.sort((a, b) => new Date(b.TimeStamp).getTime() - new Date(a.TimeStamp).getTime());
        setSubmissions(data);
      };
      fetchData();
}, []);
function DangerArea({ submissions, setSubmissions }: { submissions: Submission[], setSubmissions: React.Dispatch<React.SetStateAction<Submission[]>> }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dangerRef = useRef<HTMLDivElement>(null);

    const handleDeleteLast = async () => {
        if (!submissions.length) return;
        setLoading(true);
        try {
            // Find the most recently submitted record by TimeStamp (assuming TimeStamp is ISO string or sortable)
            const mostRecent = submissions.reduce((latest, current) =>
                new Date(current.TimeStamp).getTime() > new Date(latest.TimeStamp).getTime() ? current : latest
            , submissions[0]);
            await deleteDoc(doc(db, "submissions", mostRecent.id));
            setSubmissions(submissions.filter((s) => s.id !== mostRecent.id));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAll = async () => {
        if (!submissions.length) return;
        setLoading(true);
        try {
            // Batch delete for all records
            const batch = writeBatch(db);
            submissions.forEach((sub) => {
                batch.delete(doc(db, "submissions", sub.id));
            });
            await batch.commit();
            setSubmissions([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            ref={dangerRef}
            style={{
                position: "absolute",
                top: 24,
                right: 24,
                zIndex: 10,
                background: "#2a2323",
                border: "2px solid #ff3333",
                borderRadius: 10,
                minWidth: 180,
                boxShadow: "0 2px 12px #0005",
            }}
        >
            <div
                style={{
                    color: "#fff",
                    background: "#ff3333",
                    padding: "8px 16px",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    fontWeight: 700,
                    cursor: "pointer",
                    userSelect: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
                onClick={() => setOpen((v) => !v)}
            >
                <span>Danger Area</span>
                <span style={{ fontWeight: 900, marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
            </div>
            {open && (
                <div style={{ padding: "18px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                    <button
                        style={{
                            background: "#ffe066",
                            color: "#222",
                            border: "none",
                            borderRadius: 6,
                            padding: "10px 0",
                            fontWeight: 700,
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1,
                            transition: "background 0.2s"
                        }}
                        disabled={loading}
                        onClick={handleDeleteLast}
                    >
                        Delete Last Record
                    </button>
                    <button
                        style={{
                            background: "#ff3333",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            padding: "10px 0",
                            fontWeight: 700,
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1,
                            transition: "background 0.2s"
                        }}
                        disabled={loading}
                        onClick={handleDeleteAll}
                    >
                        DELETE ALL
                    </button>
                </div>
            )}
        </div>
    );
}

// Place this inside your component render:
  return (
    
    <div style={{ padding: "40px", background: "#181c24", minHeight: "100vh" }}>
      <h1 style={{ color: "#3388ff", marginBottom: "24px" }}>Admin Submissions</h1>
      <DangerArea submissions={submissions} setSubmissions={setSubmissions} />
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#222",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 16px #0002"
      }}>
        <thead>
          <tr style={{ background: "#3388ff" }}>
            <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>Timestamp</th>
            <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>Codeword</th>
            <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id} style={{ borderBottom: "1px solid #333" }}>
              <td style={{ padding: "10px", color: "#eee" }}>{sub.TimeStamp}</td>
              <td style={{ padding: "10px", color: "#eee" }}>{sub.CODEWORD}</td>
              <td style={{ padding: "10px" }}>
                {sub.imageBinary ? (
                  <Image
                    src={sub.imageBinary} alt='Image' width={320} height={220} style={{ borderRadius: 8 }}
                  />
                ) : (
                  <span style={{ color: "#888" }}>No image</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}