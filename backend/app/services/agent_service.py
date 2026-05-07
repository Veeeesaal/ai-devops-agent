from app.services.groq_service import analyze_with_groq
from app.services.auto_fix_service import apply_auto_fix


#  Analyzer Agent
def analyzer_agent(logs: str):

    prompt = f"""
You are an Analyzer Agent.

Analyze the CI/CD logs and identify:

1. Exact error
2. Root cause
3. Why the error happened

Keep the explanation beginner-friendly, concise, and slightly descriptive.
Avoid very technical language.

Logs:
{logs}
"""

    try:
        return analyze_with_groq(prompt)

    except Exception as e:
        return f"Analyzer Error: {str(e)}"


#  Fixer Agent
def fixer_agent(error_analysis: str):

    prompt = f"""
You are a Fixer Agent.

Based on this error analysis:

{error_analysis}

Provide:

1. Windows Fix
2. Linux/macOS Fix

For each platform include:
- Short explanation
- Step-by-step fix
- Command to run

Keep the response beginner-friendly but concise.
Avoid very long paragraphs.
Avoid repeating the same explanation for Windows and Linux.
If both fixes are similar, keep explanations short.
Explain steps clearly for beginner developers.
"""

    try:
        return analyze_with_groq(prompt)

    except Exception as e:
        return f"Fixer Error: {str(e)}"


#  Validator Agent
def validator_agent(fix: str):

    prompt = f"""
You are a Validator Agent.

Validate this fix:

{fix}

Return:
- Is the fix safe?
- Any important risks?

Keep the response concise and beginner-friendly.
"""

    try:
        return analyze_with_groq(prompt)

    except Exception as e:
        return f"Validator Error: {str(e)}"


#  MAIN WORKFLOW
def run_agents(logs: str):

    try:

        # Step 1 → Analyze
        analysis = analyzer_agent(logs)

        # Step 2 → Generate Fix
        fix = fixer_agent(analysis)

        # Step 3 → Validate
        validation = validator_agent(fix)

        # Step 4 → Safe Suggestion
        auto_fix_result = apply_auto_fix(logs)

        return {
            "status": "success",
            "analysis": analysis,
            "fix": fix,
            "validation": validation,
            "auto_fix": auto_fix_result
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }