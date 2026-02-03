import beyonce from "../assets/Beyonce.png";
import reeve from "../assets/Christopher Reeve.png";
import cavill from "../assets/Henry Cavill.png";
import hogan from "../assets/Hulk Hogan.png";
import cena from "../assets/John Cena.png";
import madonna from "../assets/Madonna.png";

const characters = {
  groupA: [
    {
      name: "Henry Cavill",
      description: "New Superman.",
      photo: cavill,
      type: "new",
    },

    {
      name: "Christopher Reeve",
      description: "Legend",
      photo: reeve,
      type: "old",
    },
  ],
  groupB: [
    {
      name: "John Cena",
      description: "New professional wrestler.",
      photo: cena,
      type: "new",
    },
    {
      name: "Hulk Hogan",
      description: "Legend",
      photo: hogan,
      type: "old",
    },
  ],
  groupC: [
    {
      name: "Beyonce",
      description: "New Singer.",
      photo: beyonce,
      type: "new",
    },
    {
      name: "Madonna",
      description: "Legend",
      photo: madonna,
      type: "old",
    },
  ],
};

export default characters;
