from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.analyze import router as analyze_router

app = FastAPI()

# ✅ CORS middleware (IMPORTANT 🔥)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev ke liye ok
    allow_credentials=True,
    allow_methods=["*"],  # OPTIONS allow karega
    allow_headers=["*"],
)

# Routes
app.include_router(analyze_router)

@app.get("/")
def home():
    return {"message": "AI DevOps Agent is running 🚀"}