def apply_auto_fix(logs: str):
    
    if "ModuleNotFoundError" in logs:
        module_name = logs.split("'")[1]

        return f"""
 Suggested Fix:
Run this command in your environment:

pip install {module_name}
"""

    return "⚠️ No auto-fix available"