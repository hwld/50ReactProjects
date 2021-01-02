import { Speaker } from "../pages/speakers/[id]";

export const fetchAllSpeakers = async (): Promise<Speaker[]> => {
  const res = await fetch(
    "https://conference-schedule.microcms.io/api/v1/speakers",
    {
      headers: { "X-API-KEY": process.env.API_KEY || "" },
    }
  );
  const data = (await res.json()).contents;

  // 必要な情報を取得する
  return data.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (c: any): Speaker => ({
      id: c.id,
      name: c.name,
      avatar: c.avatar.url,
      bio: c.bio,
      theme: c.theme,
      themeDesc: c.themeDesc,
    })
  );
};
