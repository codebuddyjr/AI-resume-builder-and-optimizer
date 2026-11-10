from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database.connection import Base


class SourceOfTruth(Base):
    """
    The single source of truth for the user's background.
    Only one row exists — this is a personal, single-user tool.
    The AI is ONLY allowed to draw facts from this data.
    """
    __tablename__ = "source_of_truth"

    id = Column(Integer, primary_key=True, default=1)
    data = Column(JSON, nullable=False, default=dict)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Application(Base):
    """
    A job application attempt — one per company+role+JD combination.
    """
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    jd_text = Column(Text, nullable=False)
    parsed_jd = Column(JSON, nullable=True)  # AI's structured parse of the JD
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    resumes = relationship("GeneratedResume", back_populates="application", cascade="all, delete-orphan")
    scoring_logs = relationship("ScoringLog", back_populates="application", cascade="all, delete-orphan")


class GeneratedResume(Base):
    """
    A generated resume version — multiple versions possible per application.
    """
    __tablename__ = "generated_resumes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    version = Column(Integer, nullable=False, default=1)
    latex_content = Column(Text, nullable=False)
    pdf_path = Column(String, nullable=True)  # path to compiled PDF file
    page_count = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    application = relationship("Application", back_populates="resumes")
    rewrite_logs = relationship("RewriteLog", back_populates="resume", cascade="all, delete-orphan")
    scoring_log = relationship("ScoringLog", back_populates="resume", uselist=False)


class ScoringLog(Base):
    """
    AI scoring/reasoning decisions for a specific application.
    Stores WHY each project was included/excluded/reordered — 
    explainability is a core requirement, not optional.
    """
    __tablename__ = "scoring_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    resume_id = Column(Integer, ForeignKey("generated_resumes.id"), nullable=True)
    role_type = Column(String, nullable=True)       # "SDE", "data-analyst", etc.
    project_scores = Column(JSON, nullable=True)     # [{project_name, score, reasoning, included}]
    skill_scores = Column(JSON, nullable=True)       # [{skill_name, relevance, reasoning}]
    raw_ai_response = Column(JSON, nullable=True)    # full Claude response for debugging
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    application = relationship("Application", back_populates="scoring_logs")
    resume = relationship("GeneratedResume", back_populates="scoring_log")


class RewriteLog(Base):
    """
    Per-bullet diff log — tracks every rewrite the AI made,
    especially flagging any that changed factual claims.
    """
    __tablename__ = "rewrite_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    resume_id = Column(Integer, ForeignKey("generated_resumes.id"), nullable=False)
    source_section = Column(String, nullable=False)   # "project" or "experience"
    source_name = Column(String, nullable=False)       # project/experience name
    original_bullet = Column(Text, nullable=False)
    rewritten_bullet = Column(Text, nullable=False)
    factual_change_flagged = Column(Boolean, default=False)
    flag_reason = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    resume = relationship("GeneratedResume", back_populates="rewrite_logs")
