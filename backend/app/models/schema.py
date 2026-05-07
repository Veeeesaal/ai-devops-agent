from pydantic import BaseModel

class LogRequest(BaseModel):
    logs: str


class GitHubRequest(BaseModel):
    token: str
    owner: str
    repo: str