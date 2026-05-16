const HACKER_NEWS_API_BASE = "https://hacker-news.firebaseio.com/v0";

exports.getTopStoryIds = async () => {
  const response = await fetch(`${HACKER_NEWS_API_BASE}/topstories.json`);

  if (!response.ok)
    throw new Error(
      `Failed to fetch top story IDs: ${response.status} ${response.statusText}`,
    );

  const data = await response.json();
  return data;
};

exports.getItemById = async (id) => {
  const response = await fetch(`${HACKER_NEWS_API_BASE}/item/${id}.json`);

  if (!response.ok)
    throw new Error(
      `Failed to fetch item ${id}: ${response.status} ${response.statusText}`,
    );

  const data = await response.json();
  return data;
};

exports.getUserById = async (id) => {
  const response = await fetch(`${HACKER_NEWS_API_BASE}/user/${id}.json`);

  if (!response.ok)
    throw new Error(
      `Failed to fetch user ${id}: ${response.status} ${response.statusText}`,
    );

  const data = await response.json();
  return data;
};

exports.getItemsByIds = async (ids, limit = 50) => {
  try {
    // Limit concurrent requests to avoid overwhelming the API
    const limitedIds = ids.slice(0, limit);
    const promises = limitedIds.map((id) => exports.getItemById(id));
    const items = await Promise.all(promises);
    return items.filter(
      (item) => item && item.type === "story" && !item.deleted && !item.dead,
    );
  } catch (error) {
    throw new Error(`Failed to fetch items: ${error.message}`);
  }
};
