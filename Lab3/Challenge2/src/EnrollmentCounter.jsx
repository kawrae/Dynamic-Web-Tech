import React, { useState, useEffect } from "react";
import "./EnrollmentCounter.css";

export default function EnrollmentCounter() {
  const [students, setStudents] = useState(0);
  const [modules, setModules] = useState(0);
  const studentsPerModule = 20;

  function handleClick() {
    setStudents((current) => current + 1);
  }

  useEffect(() => {
    setModules(Math.floor(students / studentsPerModule));
  }, [students, studentsPerModule]);

  return (
    <div className="EnrollmentCounter">
      <p>
        Enrolled Students: <span>{students}</span>
      </p>
      <button onClick={handleClick}>Enroll a New Student</button>
      <p>
        Complete Modules: <span>{modules}</span>
      </p>
    </div>
  );
}
