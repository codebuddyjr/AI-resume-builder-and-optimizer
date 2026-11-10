"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import type { Education, Certification } from "@/lib/api";

interface Props {
  education: Education[];
  certifications: Certification[];
  onEducationChange: (data: Education[]) => void;
  onCertificationChange: (data: Certification[]) => void;
}

function newEducation(): Education {
  return {
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    field: "",
    start_date: "",
    end_date: "",
    gpa: null,
    highlights: [],
  };
}

function newCertification(): Certification {
  return {
    id: crypto.randomUUID(),
    name: "",
    issuer: "",
    date: "",
    url: null,
  };
}

export function EducationForm({ education, certifications, onEducationChange, onCertificationChange }: Props) {
  // ─── Education handlers ──────────────────────────
  const addEducation = () => onEducationChange([...education, newEducation()]);

  const removeEducation = (idx: number) => {
    onEducationChange(education.filter((_, i) => i !== idx));
  };

  const updateEducation = (idx: number, updates: Partial<Education>) => {
    const updated = [...education];
    updated[idx] = { ...updated[idx], ...updates };
    onEducationChange(updated);
  };

  const updateHighlight = (eduIdx: number, hlIdx: number, value: string) => {
    const updated = [...education];
    const highlights = [...updated[eduIdx].highlights];
    highlights[hlIdx] = value;
    updated[eduIdx] = { ...updated[eduIdx], highlights };
    onEducationChange(updated);
  };

  const addHighlight = (eduIdx: number) => {
    const updated = [...education];
    updated[eduIdx] = { ...updated[eduIdx], highlights: [...updated[eduIdx].highlights, ""] };
    onEducationChange(updated);
  };

  const removeHighlight = (eduIdx: number, hlIdx: number) => {
    const updated = [...education];
    updated[eduIdx] = {
      ...updated[eduIdx],
      highlights: updated[eduIdx].highlights.filter((_, i) => i !== hlIdx),
    };
    onEducationChange(updated);
  };

  // ─── Certification handlers ──────────────────────
  const addCertification = () => onCertificationChange([...certifications, newCertification()]);

  const removeCertification = (idx: number) => {
    onCertificationChange(certifications.filter((_, i) => i !== idx));
  };

  const updateCertification = (idx: number, updates: Partial<Certification>) => {
    const updated = [...certifications];
    updated[idx] = { ...updated[idx], ...updates };
    onCertificationChange(updated);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── Education Section ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Education</h2>
            <p className="text-sm text-muted-foreground">Degrees and academic background.</p>
          </div>
          <Button onClick={addEducation} size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add Education
          </Button>
        </div>

        {education.length === 0 && (
          <div className="form-section text-center py-8 text-muted-foreground">
            <p>No education entries yet.</p>
          </div>
        )}

        {education.map((edu, idx) => (
          <div key={edu.id} className="form-section space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Education {idx + 1}</span>
              <button onClick={() => removeEducation(idx)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Institution *</label>
                <Input value={edu.institution} onChange={(e) => updateEducation(idx, { institution: e.target.value })} placeholder="e.g. IIT Delhi" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Degree *</label>
                <Input value={edu.degree} onChange={(e) => updateEducation(idx, { degree: e.target.value })} placeholder="e.g. B.Tech" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Field of Study</label>
                <Input value={edu.field} onChange={(e) => updateEducation(idx, { field: e.target.value })} placeholder="e.g. Computer Science" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                <Input value={edu.start_date} onChange={(e) => updateEducation(idx, { start_date: e.target.value })} placeholder="YYYY-MM" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">End Date</label>
                <Input value={edu.end_date} onChange={(e) => updateEducation(idx, { end_date: e.target.value })} placeholder="YYYY-MM or Present" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">GPA (optional)</label>
              <Input value={edu.gpa ?? ""} onChange={(e) => updateEducation(idx, { gpa: e.target.value || null })} placeholder="e.g. 8.5/10" className="w-40" />
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Highlights / Coursework</label>
              {edu.highlights.map((hl, hlIdx) => (
                <div key={hlIdx} className="flex gap-2">
                  <Input value={hl} onChange={(e) => updateHighlight(idx, hlIdx, e.target.value)} placeholder="e.g. Dean's List, Relevant coursework..." className="flex-1" />
                  <button onClick={() => removeHighlight(idx, hlIdx)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addHighlight(idx)} className="text-xs gap-1">
                <Plus className="w-3 h-3" /> Add Highlight
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Certifications Section ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Certifications</h2>
            <p className="text-sm text-muted-foreground">Professional certifications and courses.</p>
          </div>
          <Button onClick={addCertification} size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add Certification
          </Button>
        </div>

        {certifications.length === 0 && (
          <div className="form-section text-center py-8 text-muted-foreground">
            <p>No certifications yet.</p>
          </div>
        )}

        {certifications.map((cert, idx) => (
          <div key={cert.id} className="form-section space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Certification {idx + 1}</span>
              <button onClick={() => removeCertification(idx)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Certification Name *</label>
                <Input value={cert.name} onChange={(e) => updateCertification(idx, { name: e.target.value })} placeholder="e.g. AWS Solutions Architect" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Issuer</label>
                <Input value={cert.issuer} onChange={(e) => updateCertification(idx, { issuer: e.target.value })} placeholder="e.g. Amazon Web Services" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Date</label>
                <Input value={cert.date} onChange={(e) => updateCertification(idx, { date: e.target.value })} placeholder="YYYY-MM" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">URL (optional)</label>
                <Input value={cert.url ?? ""} onChange={(e) => updateCertification(idx, { url: e.target.value || null })} placeholder="https://..." />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
