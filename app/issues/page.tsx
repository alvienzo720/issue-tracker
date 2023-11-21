"use client";
interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}



import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("/api/issues");
        console.log("Data from the API:", response.data);
        if (Array.isArray(response.data.issues)) {
          setIssues(response.data.issues);
        } else {
          // Handle the case where data is not an array
          console.error(
            "Expected an array of issues, but received:",
            response.data
          );
        }
      } catch (error) {
        console.error("An error occurred while fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issues</Link>
      </Button>
      <div>
        <h2>Issues List</h2>
        <ul>
          {
            issues.map((issue) => (
              <li key={issue.id}>   {issue.title}  {issue.description}</li> // Adjust this line to display issue details correctly
            ))}
        </ul>
      </div>
    </div>
  );
};

export default IssuesPage;
