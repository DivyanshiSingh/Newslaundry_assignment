import { STORY_COLLECTION_API } from "../constant";
import axios from "axios";
export const fetchStories = async () => {
  try {
    const resp = await axios.get(STORY_COLLECTION_API);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
