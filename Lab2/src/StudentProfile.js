import Card from "./Card";

export default function StudentProfile() {
  const studentName = "Corey Black";
  const bio = "I am a Web Development student.";

  const courses = [
    "Web Development",
    "Dynamic Web Tech",
    "Computing Honours Project",
    "Adv Programming for Mobile Devices"
  ];

  return (
    <Card title="Student Profile">
      <h1>{studentName}</h1>
      <p>{bio}</p>

      <h2>Courses Enrolled</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </Card>
  );
}
