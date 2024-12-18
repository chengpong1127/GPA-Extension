import React from "react";

// Define the props for GPAContent component
interface GPAContentProps {
  tr: HTMLTableRowElement; // Correctly type the prop for tr
}

export default function GPAContent({ tr }: GPAContentProps) {
  // Check if there are enough columns and handle accordingly
  if (tr.children.length === 1) {
    return <td />;
  } else {
    return <td>4.0</td>;
  }
}

// Function to get course data, added types for better clarity
function getCourseData(tr: HTMLTableRowElement) {
  const tds = tr.querySelectorAll('td');
  const courseName = tds[2]?.textContent || ''; // Optional chaining and fallback
  const lecturer = tds[6]?.textContent || ''; // Optional chaining and fallback
  return { courseName, lecturer };
}