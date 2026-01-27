import Profile from "./Profile";
import Gallery from "./Gallery";
import StudentProfile from "./StudentProfile";
import PassedButton from "./PassedButton";
import FailedButton from "./FailedButton";

export default function App() {
  return (
    <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
      <Profile />
      <Gallery />
      <StudentProfile />
      <PassedButton />
      <FailedButton />
    </div>
  );
}
