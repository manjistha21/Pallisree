"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const getStudents = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/studentform", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch students");
    }

    const data = await res.json();
    console.log("API response data:", data); 
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return { studentform: [] }; 
  }
};

export default function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      console.log("Fetched students:", data);
      if (data && data.studentform) {
        setStudents(data.studentform);
      } else {
        console.warn("No studentform key found in the API response");
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Fathers name</th>
            <th>Guardians name</th>
            <th>Guardians occupation</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Date</th>
            <th>School</th>
            <th>Blood group</th>
          </tr>
        </thead>
        <tbody>
          {students.map((rs) => (
            <tr className="hover" key={rs._id}>
              <td>{rs.name}</td>
              <td>{rs.fathersname}</td>
              <td>{rs.guardiansname}</td>
              <td>{rs.guardiansoccupation}</td>
              <td>{rs.address}</td>
              <td>{rs.phoneno}</td>
              <td>{new Date(rs.date).toLocaleDateString()}</td>
              <td>{rs.nameoftheschool}</td>
              <td>{rs.bloodgroup}</td>
              <td>
                <Link href={`/editstudent/${rs._id}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
