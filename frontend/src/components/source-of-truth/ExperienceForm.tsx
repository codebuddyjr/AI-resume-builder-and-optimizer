"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type { Experience } from "@/lib/api";

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const TAG_OPTIONS = [
  "backend", "frontend", "systems", "data-analysis",
  "ML-research", "devops", "mobile", "full-stack",
];

function newExperience(): Experience {
  return {
    id: crypto.randomUUID(),
    company: "",
    role: "",
    start_date: "",
    end_date: "",
    your_contribution: "",
    limitations_caveats: null,
    quantifiable_results: [],
    tags: [],
    bullets: [""],
  };
}

export function ExperienceForm({ data, onChange }: Props) {
  const addExperience = () => onChange([...data, newExperience()]);

  const removeExperience = (idx: number) => {
    onChange(data.filter((_, i) => i !== idx));
  };

  const updateExperience = (idx: number, updates: Partial<Experience>) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], ...updates };
    onChange(updated);
  };

  const updateBullet = (expIdx: number, bulletIdx: number, value: string) => {
    const updated = [...data];
    const bullets = [...updated[expIdx].bullets];
    bullets[bulletIdx] = value;
    updated[expIdx] = { ...updated[expIdx], bullets };
    onChange(updated);
  };

  const addBullet = (expIdx: number) => {
    const updated = [...data];
    updated[expIdx] = { ...updated[expIdx], bullets: [...updated[expIdx].bullets, ""] };
    onChange(updated);
  };

  const removeBullet = (expIdx: number, bulletIdx: number) => {
    const updated = [...data];
    updated[expIdx] = {
      ...updated[expIdx],
      bullets: updated[expIdx].bullets.filter((_, i) => i !== bulletIdx),
    };
    onChange(updated);
  };

  const toggleTag = (expIdx: number, tag: string) => {
    const updated = [...data];
    const tags = updated[expIdx].tags.includes(tag)
      ? updated[expIdx].tags.filter((t) => t !== tag)
      : [...updated[expIdx].tags, tag];
    updated[expIdx] = { ...updated[expIdx], tags };
    onChange(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <p className="text-sm text-muted-foreground">
            Internships and jobs. Record YOUR actual scope honestly.
          </p>
        </div>
        <Button onClick={addExperience} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      {data.length === 0 && (
        <div className="form-section text-center py-12 text-muted-foreground">
          <p>No work experience added yet.</p>
        </div>
      )}

      {data.map((exp, idx) => (
        <div key={exp.id} className="form-section space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
              <span className="text-sm font-medium">Experience {idx + 1}</span>
            </div>
            <button
              onClick={() => removeExperience(idx)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Company *</label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(idx, { company: e.target.value })}
                placeholder="e.g. Google"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Role *</label>
              <Input
                value={exp.role}
                onChange={(e) => updateExperience(idx, { role: e.target.value })}
                placeholder="e.g. Software Engineering Intern"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Start Date</label>
              <Input
                value={exp.start_date}
                onChange={(e) => updateExperience(idx, { start_date: e.target.value })}
                placeholder="YYYY-MM"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">End Date</label>
              <Input
                value={exp.end_date}
                onChange={(e) => updateExperience(idx, { end_date: e.target.value })}
                placeholder="YYYY-MM or Present"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Your Specific Contribution *
              <span className="text-xs text-warning ml-2">(What YOU did, not the team)</span>
            </label>
            <Textarea
              value={exp.your_contribution}
              onChange={(e) => updateExperience(idx, { your_contribution: e.target.value })}
              placeholder="Describe your actual responsibilities and deliverables..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Limitations / Caveats
            </label>
            <Textarea
              value={exp.limitations_caveats ?? ""}
              onChange={(e) => updateExperience(idx, { limitations_caveats: e.target.value || null })}
              placeholder="e.g. 'Was part of a 10-person team, I owned the auth module only'"
              className="min-h-[60px]"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Tags</label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(idx, tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    exp.tags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Bullets */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Bullet Points</label>
            {exp.bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex gap-2">
                <span className="text-muted-foreground mt-2 text-sm">•</span>
                <Input
                  value={bullet}
                  onChange={(e) => updateBullet(idx, bIdx, e.target.value)}
                  placeholder="Describe one aspect of your work..."
                  className="flex-1"
                />
                {exp.bullets.length > 1 && (
                  <button
                    onClick={() => removeBullet(idx, bIdx)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => addBullet(idx)} className="text-xs gap-1">
              <Plus className="w-3 h-3" /> Add Bullet
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
