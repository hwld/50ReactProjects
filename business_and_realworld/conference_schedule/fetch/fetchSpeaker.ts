import { Speaker } from "../pages/speakers/[id]";

export const fetchSpeaker = async (id: string): Promise<Speaker> => {
  const res = await fetch(
    `https://conference-schedule.microcms.io/api/v1/speakers/${id}`,
    {
      headers: { "X-API-KEY": process.env.API_KEY || "" },
    }
  );
  const data = await res.json();

  const speaker: Speaker = {
    id: data.id,
    name: data.name,
    avatar: data.avatar.url,
    bio: data.bio,
    theme: data.theme,
    themeDesc: data.themeDesc,
  };

  return speaker;
};
