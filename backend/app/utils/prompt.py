def build_prompt(logs: str) -> str:

    return f"""
You are a DevOps AI assistant.

Analyze the CI/CD logs and respond ONLY in valid JSON format.

Format:

{{
  "analysis": "short root cause",

  "fix": {{
      "windows": {{
          "steps": [
              "step 1",
              "step 2"
          ],
          "command": "windows command"
      }},

      "linux": {{
          "steps": [
              "step 1",
              "step 2"
          ],
          "command": "linux/mac command"
      }}
  }},

  "validation": "mention whether the fix is safe or risky"
}}

Rules:
- Keep responses concise
- Focus only on actual errors
- Ignore setup logs and workflow noise
- Clearly separate Windows and Linux fixes
- Mention risks only if important
- Return ONLY valid JSON
- Do not include markdown
- Do not include explanations outside JSON

Logs:
{logs}
"""