import os
from pathlib import Path
from pydantic_settings import BaseSettings

# Project root directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Resume Tailoring Tool"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Database — SQLite for personal-scale tool
    DATABASE_URL: str = f"sqlite:///{BASE_DIR / 'resume_tool.db'}"

    # AI Provider — Anthropic Claude only (per spec)
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-sonnet-4-20250514"

    # LaTeX compilation
    TECTONIC_PATH: str = "tectonic"  # assumes tectonic is on PATH

    # File storage
    RESUMES_DIR: Path = BASE_DIR / "data" / "resumes"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    def ensure_dirs(self):
        """Create required directories if they don't exist."""
        self.RESUMES_DIR.mkdir(parents=True, exist_ok=True)


settings = Settings()
settings.ensure_dirs()
