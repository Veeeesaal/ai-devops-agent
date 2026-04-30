const BASE_URL = "http://127.0.0.1:8000";

export const analyzeLogs = async (logs) => {
  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ logs }),
  });

  return response.json();
};