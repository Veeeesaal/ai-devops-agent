def build_prompt(logs: str) -> str:
    return f"""
You are a senior DevOps engineer.

Analyze the following CI/CD logs and provide:

1. Error explanation
2. Root cause
3. Step-by-step fix

Logs:
{logs}
"""