import Card from "./Card";

export default function Gallery() {
  const universities = [
    {
      name: "University of the West of Scotland",
      image:
        "https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/7e/f0/74/7ef074de-113e-4b0a-7b1d-80adeb03571a/source/256x256bb.jpg",
    },
    {
      name: "University of Glasgow",
      image:
        "https://iconlogovector.com/uploads/images/2025/06/lg-685e45f7f2167-University-of-Glasgow.webp",
    },
    {
      name: "University of Edinburgh",
      image:
       "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/University_of_Edinburgh_ceremonial_roundel.svg/250px-University_of_Edinburgh_ceremonial_roundel.svg.png",
    },
  ];

  return (
    <section>
      <h1>Amazing Universities</h1>
      {universities.map((uni, index) => (
        <Card key={index} title={uni.name}>
          <img src={uni.image} alt={`${uni.name} logo`} width="150" />
        </Card>
      ))}
    </section>
  );
}
