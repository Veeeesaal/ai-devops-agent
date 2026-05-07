from fastapi import APIRouter

from app.models.schema import (
    LogRequest,
    GitHubRequest
)

from app.services.agent_service import run_agents

# GitHub services
from app.services.github_service import (
    get_workflow_runs,
    get_run_logs,
    extract_logs
)

router = APIRouter()


#  Manual Log Analysis
@router.post("/analyze")
def analyze_logs(request: LogRequest):

    result = run_agents(request.logs)

    return {
        "status": "success",
        "analysis": result
    }


#  GitHub Actions Log Analysis
@router.post("/github/analyze")
def analyze_github(request: GitHubRequest):

    # Get workflow runs
    runs = get_workflow_runs(
        request.owner,
        request.repo,
        request.token
    )

    # Check workflows
    if (
        "workflow_runs" not in runs
        or len(runs["workflow_runs"]) == 0
    ):

        return {
            "status": "error",
            "message": "No workflow runs found or invalid token"
        }

    # Latest workflow run
    latest_run = runs["workflow_runs"][0]

    run_id = latest_run["id"]

    # Fetch logs zip
    logs_zip = get_run_logs(
        request.owner,
        request.repo,
        run_id,
        request.token
    )

    if not logs_zip:

        return {
            "status": "error",
            "message": "Failed to fetch logs"
        }

    # Extract logs
    logs = extract_logs(logs_zip)

    # Run AI agents
    result = run_agents(logs)

    return {
        "status": "success",
        "repo": request.repo,
        "run_id": run_id,
        "logs": logs,
        "analysis": result
    }