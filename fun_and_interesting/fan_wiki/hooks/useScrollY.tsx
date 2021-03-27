import { useQuery } from "react-query";

type UseScrollYResult = { scrollY: number; saveScrollY: () => void };

export const useScrollY = (): UseScrollYResult => {
  const result = useQuery("scroll", () => window.scrollY, {
    staleTime: Infinity,
  });

  return { scrollY: result.data ?? 0, saveScrollY: result.refetch };
};
