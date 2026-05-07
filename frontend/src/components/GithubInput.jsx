import React, { useState } from "react";

const GithubInput = ({ onFetch }) => {

  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  return (
    <div className="space-y-4">

      {/* Heading */}
      <h2 className="text-lg font-semibold text-white">
        Fetch GitHub Actions Logs
      </h2>

      {/* Token Input */}
      <input
        type="password"
        placeholder="GitHub Personal Access Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="
          w-full
          bg-slate-900
          border border-slate-700
          rounded-lg
          px-4 py-3
          text-white
          placeholder:text-slate-500
          outline-none
          focus:border-purple-500
        "
      />

      {/* Repo Inputs */}
      <div className="flex flex-col md:flex-row gap-3">

        <input
          type="text"
          placeholder="GitHub Username"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="
            flex-1
            bg-slate-900
            border border-slate-700
            rounded-lg
            px-4 py-3
            text-white
            placeholder:text-slate-500
            outline-none
            focus:border-purple-500
          "
        />

        <input
          type="text"
          placeholder="Repository Name"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="
            flex-1
            bg-slate-900
            border border-slate-700
            rounded-lg
            px-4 py-3
            text-white
            placeholder:text-slate-500
            outline-none
            focus:border-purple-500
          "
        />
      </div>

      {/* Button */}
      <button
        onClick={() =>
          onFetch(token, owner, repo)
        }
        className="
          w-full
          bg-purple-600
          hover:bg-purple-700
          transition-all duration-300
          rounded-lg
          py-3
          text-white
          font-medium
          shadow-lg shadow-purple-900/30
        "
      >
        Fetch Logs
      </button>

      {/* Description */}
      <p className="text-sm text-slate-500">
        Fetch latest failed workflow logs directly from GitHub Actions.
      </p>

    </div>
  );
};

export default GithubInput;