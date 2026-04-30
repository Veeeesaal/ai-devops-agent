from fastapi import APIRouter
from app.models.schema import LogRequest
from app.services.groq_service import analyze_with_groq
from app.utils.prompt import build_prompt

router = APIRouter()

@router.post("/analyze")
def analyze_logs(request: LogRequest):
    prompt = build_prompt(request.logs)
    result = analyze_with_groq(prompt)

    return {
        "status": "success",
        "analysis": result
    }