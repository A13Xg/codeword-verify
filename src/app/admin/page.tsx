'use client';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase"; // Adjust the import path as needed

interface RecordData {
    id: string;
    [key: string]: any;
}

const AdminPage: React.FC = () => {
    const [records, setRecords] = useState<RecordData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "submissions")); // Change "records" to your collection name
                const data: RecordData[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setRecords(data);
            } catch (error) {
                console.error("Error fetching records:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (records.length === 0) return <div>No records found.</div>;

    const columns = Object.keys(records[0]).filter((key) => key !== "id");

    return (
        <div>
            <h1>Records</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        {columns.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            {columns.map((col) => (
                                <td key={col}>{String(record[col])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;