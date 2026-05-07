import requests
import zipfile
import io


#  Dynamic headers from user token
def get_headers(token):

    return {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json"
    }


#  Get latest workflow runs
def get_workflow_runs(owner, repo, token):

    url = f"https://api.github.com/repos/{owner}/{repo}/actions/runs"

    response = requests.get(
        url,
        headers=get_headers(token)
    )

    return response.json()


#  Get logs for a specific run
def get_run_logs(owner, repo, run_id, token):

    url = f"https://api.github.com/repos/{owner}/{repo}/actions/runs/{run_id}/logs"

    response = requests.get(
        url,
        headers=get_headers(token)
    )

    if response.status_code == 200:
        return response.content

    return None


#  SMART LOG EXTRACTION
def extract_logs(zip_content):

    log_text = ""

    with zipfile.ZipFile(io.BytesIO(zip_content)) as z:

        for file in z.namelist():

            with z.open(file) as f:

                try:
                    content = f.read().decode("utf-8")

                    log_text += content + "\n"

                except:
                    pass

    #  Important error keywords only
    keywords = [
        "error",
        "failed",
        "exception",
        "traceback",
        "modulenotfounderror",
        "syntaxerror",
        "typeerror",
        "nameerror",
        "importerror"
    ]

    important_lines = []

    for line in log_text.splitlines():

        if any(keyword in line.lower() for keyword in keywords):

            important_lines.append(line)

    filtered_logs = "\n".join(important_lines)

    # fallback
    if not filtered_logs.strip():

        filtered_logs = log_text[:3000]

    return filtered_logs[:3000]