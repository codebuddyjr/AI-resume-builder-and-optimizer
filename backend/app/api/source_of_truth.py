"""
Source-of-Truth CRUD API routes.

GET  /source-of-truth          — get the current source of truth
PUT  /source-of-truth          — replace the entire source of truth
PATCH /source-of-truth/{section} — update a specific section only
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import SourceOfTruth
from app.schemas.source_of_truth import SourceOfTruthData, SourceOfTruthResponse

router = APIRouter(prefix="/source-of-truth", tags=["Source of Truth"])


def _get_or_create_sot(db: Session) -> SourceOfTruth:
    """Get the single SOT row, or create it with defaults if it doesn't exist."""
    sot = db.query(SourceOfTruth).filter(SourceOfTruth.id == 1).first()
    if sot is None:
        default_data = SourceOfTruthData()
        sot = SourceOfTruth(id=1, data=default_data.model_dump())
        db.add(sot)
        db.commit()
        db.refresh(sot)
    return sot


@router.get("", response_model=SourceOfTruthResponse)
def get_source_of_truth(db: Session = Depends(get_db)):
    """Get the current source of truth data."""
    sot = _get_or_create_sot(db)
    return SourceOfTruthResponse(
        data=SourceOfTruthData(**sot.data),
        updated_at=str(sot.updated_at) if sot.updated_at else None,
    )


@router.put("", response_model=SourceOfTruthResponse)
def update_source_of_truth(
    payload: SourceOfTruthData,
    db: Session = Depends(get_db),
):
    """Replace the entire source of truth with new data."""
    sot = _get_or_create_sot(db)
    sot.data = payload.model_dump()
    db.commit()
    db.refresh(sot)
    return SourceOfTruthResponse(
        data=SourceOfTruthData(**sot.data),
        updated_at=str(sot.updated_at) if sot.updated_at else None,
    )


VALID_SECTIONS = {
    "personal_info", "education", "certifications",
    "projects", "experiences", "skills",
}


@router.patch("/{section}", response_model=SourceOfTruthResponse)
def update_section(
    section: str,
    payload: dict,
    db: Session = Depends(get_db),
):
    """
    Update a specific section of the source of truth.
    Section must be one of: personal_info, education, certifications,
    projects, experiences, skills.
    """
    if section not in VALID_SECTIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid section '{section}'. Must be one of: {', '.join(sorted(VALID_SECTIONS))}",
        )

    sot = _get_or_create_sot(db)
    current_data = dict(sot.data)
    current_data[section] = payload.get(section, payload)

    # Validate the full data still conforms to schema
    validated = SourceOfTruthData(**current_data)
    sot.data = validated.model_dump()
    db.commit()
    db.refresh(sot)

    return SourceOfTruthResponse(
        data=SourceOfTruthData(**sot.data),
        updated_at=str(sot.updated_at) if sot.updated_at else None,
    )
