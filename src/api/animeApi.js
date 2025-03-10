export const fetchAnimeList = async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/top/anime");
      const data = await response.json();
      return data.data; // Hanya ambil array anime
    } catch (error) {
      console.error("Error fetching anime data:", error);
      return [];
    }
  };
  