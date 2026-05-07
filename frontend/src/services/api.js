const BASE_URL = "http://127.0.0.1:8000";


//  Manual Logs Analysis
export const analyzeLogs = async (logs) => {

  const response = await fetch(
    `${BASE_URL}/analyze`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ logs }),
    }
  );

  return response.json();
};


//  Fetch GitHub Actions Logs + AI Analysis
export const fetchGithubLogs = async (
  token,
  owner,
  repo
) => {

  const response = await fetch(
    `${BASE_URL}/github/analyze`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        token,
        owner,
        repo,
      }),
    }
  );

  return response.json();
};