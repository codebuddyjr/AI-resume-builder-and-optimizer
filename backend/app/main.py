from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.database.connection import Base, engine

# Create all tables on startup
from app.database import models  # noqa: F401 — registers models with Base
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Personal AI resume tailoring tool — honest, explainable, source-of-truth enforced.",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# CORS — allow Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount generated resumes directory for PDF serving
app.mount(
    "/static/resumes",
    StaticFiles(directory=str(settings.RESUMES_DIR)),
    name="resumes",
)

# Register API routers
from app.api.source_of_truth import router as sot_router  # noqa: E402
app.include_router(sot_router, prefix=settings.API_V1_STR)

# These will be added in later phases:
# from app.api.applications import router as app_router
# from app.api.resumes import router as resume_router
# app.include_router(app_router, prefix=settings.API_V1_STR)
# app.include_router(resume_router, prefix=settings.API_V1_STR)


@app.get("/")
def read_root():
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
