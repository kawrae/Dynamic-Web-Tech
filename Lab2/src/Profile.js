import Card from "./Card";

export default function Profile() {
  let imageLink =
    "https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/7e/f0/74/7ef074de-113e-4b0a-7b1d-80adeb03571a/source/256x256bb.jpg";

  return (
    <div>
      <Card title="About Me">
        <img
          src={imageLink}
          alt="University of the West of Scotland logo"
          width="150"
          style={{ display: "block", marginBottom: "8px" }}
        />
        <p>
          I am a student who enjoys learning React and building web applications.
        </p>
      </Card>

      <Card title="Hobbies">
        <ul>
          <li>Music</li>
          <li>Reading</li>
          <li>Web Development</li>
        </ul>
      </Card>

      <Card title="Contact">
        <p>Email: b01651145@studentmail.uws.ac.uk</p>
      </Card>
    </div>
  );
}
