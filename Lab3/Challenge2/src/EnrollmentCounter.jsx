import React, { useState, useEffect } from "react";
import "./EnrollmentCounter.css";

export default function EnrollmentCounter() {
  const [students, setStudents] = useState(0);
  const [modules, setModules] = useState(0);
  const studentsPerModule = 10; // Adjust this number based on the module size

  function handleClick() {
    setStudents((current) => current + 1);
  }

  // Currently, clicking the button triggers the onClick event, which increments the student count by 1.
  // However, the 'Modules Completed' data is not updating accordingly.
  // Please insert your useEffect function below to appropriately update the modules using the setModules method.

  return (
    <div className="EnrollmentCounter">
      {" "}
      {/* Added class for styling */}
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
