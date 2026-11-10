"""
Pydantic schemas for the Source of Truth data structure.

This is the core data contract. The AI is ONLY allowed to draw facts
from data that matches these schemas. Every field here is a field the
AI can reference — nothing else.
"""

from __future__ import annotations

from typing import Optional
from uuid import uuid4
from pydantic import BaseModel, Field


def _new_id() -> str:
    return str(uuid4())


# ─── Personal Info ───────────────────────────────────────────────────

class PersonalInfo(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    linkedin: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None


# ─── Education ───────────────────────────────────────────────────────

class Education(BaseModel):
    id: str = Field(default_factory=_new_id)
    institution: str = ""
    degree: str = ""
    field: str = ""
    start_date: str = ""      # YYYY-MM
    end_date: str = ""         # YYYY-MM or "Present"
    gpa: Optional[str] = None
    highlights: list[str] = Field(default_factory=list)


# ─── Certifications ─────────────────────────────────────────────────

class Certification(BaseModel):
    id: str = Field(default_factory=_new_id)
    name: str = ""
    issuer: str = ""
    date: str = ""             # YYYY-MM
    url: Optional[str] = None


# ─── Projects ────────────────────────────────────────────────────────
# Key design: YOUR specific contribution, not the team's.
# limitations_caveats exists so the AI knows what NOT to claim.

class Project(BaseModel):
    id: str = Field(default_factory=_new_id)
    name: str = ""
    tech_stack: list[str] = Field(default_factory=list)
    start_date: str = ""
    end_date: str = ""
    your_contribution: str = ""        # What YOU specifically did
    limitations_caveats: Optional[str] = None  # Honest limits of your role
    quantifiable_results: list[str] = Field(default_factory=list)  # Only real, verifiable numbers
    tags: list[str] = Field(default_factory=list)  # backend, frontend, data-analysis, ML-research, systems, devops
    bullets: list[str] = Field(default_factory=list)  # Base bullet points


# ─── Experiences ─────────────────────────────────────────────────────

class Experience(BaseModel):
    id: str = Field(default_factory=_new_id)
    company: str = ""
    role: str = ""
    start_date: str = ""
    end_date: str = ""
    your_contribution: str = ""
    limitations_caveats: Optional[str] = None
    quantifiable_results: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    bullets: list[str] = Field(default_factory=list)


# ─── Skills ──────────────────────────────────────────────────────────
# Each skill has a confidence level so the AI never upgrades
# "I know SQL as a subject" into "SQL expert"

class SkillItem(BaseModel):
    name: str = ""
    confidence: str = "coursework"  # coursework | project | internship | production


class SkillCategory(BaseModel):
    category: str = ""  # e.g. "Languages", "Frameworks", "Databases", "Tools"
    items: list[SkillItem] = Field(default_factory=list)


# ─── Full Source of Truth ────────────────────────────────────────────

class SourceOfTruthData(BaseModel):
    """
    The complete source of truth. This is the SINGLE document the AI
    is allowed to draw from. Never let the model add facts not present here.
    """
    personal_info: PersonalInfo = Field(default_factory=PersonalInfo)
    education: list[Education] = Field(default_factory=list)
    certifications: list[Certification] = Field(default_factory=list)
    projects: list[Project] = Field(default_factory=list)
    experiences: list[Experience] = Field(default_factory=list)
    skills: list[SkillCategory] = Field(default_factory=list)


# ─── API Response Wrapper ────────────────────────────────────────────

class SourceOfTruthResponse(BaseModel):
    data: SourceOfTruthData
    updated_at: Optional[str] = None
