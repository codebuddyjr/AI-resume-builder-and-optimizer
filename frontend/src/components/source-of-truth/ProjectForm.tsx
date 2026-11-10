"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type { Project } from "@/lib/api";

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const TAG_OPTIONS = [
  "backend", "frontend", "systems", "data-analysis",
  "ML-research", "devops", "mobile", "full-stack",
];

function newProject(): Project {
  return {
    id: crypto.randomUUID(),
    name: "",
    tech_stack: [],
    start_date: "",
    end_date: "",
    your_contribution: "",
    limitations_caveats: null,
    quantifiable_results: [],
    tags: [],
    bullets: [""],
  };
}

export function ProjectForm({ data, onChange }: Props) {
  const addProject = () => onChange([...data, newProject()]);

  const removeProject = (idx: number) => {
    onChange(data.filter((_, i) => i !== idx));
  };

  const updateProject = (idx: number, updates: Partial<Project>) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], ...updates };
    onChange(updated);
  };

  const updateBullet = (projIdx: number, bulletIdx: number, value: string) => {
    const updated = [...data];
    const bullets = [...updated[projIdx].bullets];
    bullets[bulletIdx] = value;
    updated[projIdx] = { ...updated[projIdx], bullets };
    onChange(updated);
  };

  const addBullet = (projIdx: number) => {
    const updated = [...data];
    updated[projIdx] = { ...updated[projIdx], bullets: [...updated[projIdx].bullets, ""] };
    onChange(updated);
  };

  const removeBullet = (projIdx: number, bulletIdx: number) => {
    const updated = [...data];
    updated[projIdx] = {
      ...updated[projIdx],
      bullets: updated[projIdx].bullets.filter((_, i) => i !== bulletIdx),
    };
    onChange(updated);
  };

  const toggleTag = (projIdx: number, tag: string) => {
    const updated = [...data];
    const tags = updated[projIdx].tags.includes(tag)
      ? updated[projIdx].tags.filter((t) => t !== tag)
      : [...updated[projIdx].tags, tag];
    updated[projIdx] = { ...updated[projIdx], tags };
    onChange(updated);
  };

  const updateTechStack = (projIdx: number, value: string) => {
    updateProject(projIdx, {
      tech_stack: value.split(",").map((s) => s.trim()).filter(Boolean),
    });
  };

  const updateResults = (projIdx: number, value: string) => {
    updateProject(projIdx, {
      quantifiable_results: value.split("\n").filter(Boolean),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Add YOUR specific contributions — not the team&apos;s. Be honest about limitations.
          </p>
        </div>
        <Button onClick={addProject} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {data.length === 0 && (
        <div className="form-section text-center py-12 text-muted-foreground">
          <p>No projects yet. Click &quot;Add Project&quot; to get started.</p>
        </div>
      )}

      {data.map((project, idx) => (
        <div key={project.id} className="form-section space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
              <span className="text-sm font-medium">Project {idx + 1}</span>
            </div>
            <button
              onClick={() => removeProject(idx)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
              title="Remove project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Project Name *</label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(idx, { name: e.target.value })}
                placeholder="e.g. AI Resume Tailoring Tool"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Tech Stack (comma-separated)</label>
              <Input
                value={project.tech_stack.join(", ")}
                onChange={(e) => updateTechStack(idx, e.target.value)}
                placeholder="Python, FastAPI, React, SQLite"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Start Date</label>
              <Input
                value={project.start_date}
                onChange={(e) => updateProject(idx, { start_date: e.target.value })}
                placeholder="YYYY-MM"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">End Date</label>
              <Input
                value={project.end_date}
                onChange={(e) => updateProject(idx, { end_date: e.target.value })}
                placeholder="YYYY-MM or Present"
              />
            </div>
          </div>

          {/* YOUR Contribution — the critical field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Your Specific Contribution *
              <span className="text-xs text-warning ml-2">(What YOU did, not the team)</span>
            </label>
            <Textarea
              value={project.your_contribution}
              onChange={(e) => updateProject(idx, { your_contribution: e.target.value })}
              placeholder="Describe what you personally built, designed, or implemented..."
              className="min-h-[80px]"
            />
          </div>

          {/* Limitations / Caveats — honesty enforcement */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Limitations / Caveats
              <span className="text-xs text-muted-foreground ml-2">(Optional but helps the AI stay honest)</span>
            </label>
            <Textarea
              value={project.limitations_caveats ?? ""}
              onChange={(e) => updateProject(idx, { limitations_caveats: e.target.value || null })}
              placeholder="e.g. 'Used a pre-trained model, didn't train from scratch' or 'Project was coursework, not production'"
              className="min-h-[60px]"
            />
          </div>

          {/* Quantifiable Results */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Quantifiable Results
              <span className="text-xs text-destructive ml-2">(ONLY if real and verifiable)</span>
            </label>
            <Textarea
              value={project.quantifiable_results.join("\n")}
              onChange={(e) => updateResults(idx, e.target.value)}
              placeholder="One result per line, e.g.:\nReduced API response time from 2s to 200ms\nHandled 10K daily requests"
              className="min-h-[60px]"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Tags (type of work)</label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(idx, tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    project.tags.includes(tag)
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
            <label className="text-sm font-medium text-muted-foreground">Bullet Points (base description)</label>
            {project.bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex gap-2">
                <span className="text-muted-foreground mt-2 text-sm">•</span>
                <Input
                  value={bullet}
                  onChange={(e) => updateBullet(idx, bIdx, e.target.value)}
                  placeholder="Describe one aspect of your work..."
                  className="flex-1"
                />
                {project.bullets.length > 1 && (
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
