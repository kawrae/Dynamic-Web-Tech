import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

export const db = new Dexie("music-app-media");

db.version(1).stores({
  media: "id",
});

async function addMedia(id, mediaData) {
  console.log("addMedia", id, mediaData);

  try {
    await db.media.put({
      id: id,
      audioSrc: mediaData.audioSrc || "",
      coverImg: mediaData.coverImg || "",
    });

    console.log(`Media successfully saved for ${id}`);
  } catch (error) {
    console.log(`Failed to save media: ${error}`);
  }
}

function GetMediaById(id) {
  console.log("GetMediaById", id);

  const media = useLiveQuery(() => db.media.where("id").equals(id).toArray());

  if (Array.isArray(media) && media.length > 0) {
    return media[0];
  }

  return null;
}

async function deleteMedia(id) {
  try {
    await db.media.delete(id);
    console.log(`Media deleted for ${id}`);
  } catch (error) {
    console.log(`Failed to delete media: ${error}`);
  }
}

export { addMedia, GetMediaById, deleteMedia };