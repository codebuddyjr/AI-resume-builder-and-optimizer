"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import type { SkillCategory, SkillItem } from "@/lib/api";

interface Props {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

const CONFIDENCE_LEVELS = [
  { value: "coursework", label: "Coursework", color: "text-muted-foreground" },
  { value: "project", label: "Project", color: "text-warning" },
  { value: "internship", label: "Internship", color: "text-blue-400" },
  { value: "production", label: "Production", color: "text-success" },
] as const;

const SUGGESTED_CATEGORIES = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Databases",
  "Tools & Platforms",
  "Cloud & DevOps",
  "Other",
];

function newCategory(): SkillCategory {
  return {
    category: "",
    items: [{ name: "", confidence: "coursework" }],
  };
}

export function SkillForm({ data, onChange }: Props) {
  const addCategory = () => onChange([...data, newCategory()]);

  const removeCategory = (idx: number) => {
    onChange(data.filter((_, i) => i !== idx));
  };

  const updateCategory = (idx: number, category: string) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], category };
    onChange(updated);
  };

  const addSkill = (catIdx: number) => {
    const updated = [...data];
    updated[catIdx] = {
      ...updated[catIdx],
      items: [...updated[catIdx].items, { name: "", confidence: "coursework" }],
    };
    onChange(updated);
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const updated = [...data];
    updated[catIdx] = {
      ...updated[catIdx],
      items: updated[catIdx].items.filter((_, i) => i !== skillIdx),
    };
    onChange(updated);
  };

  const updateSkill = (catIdx: number, skillIdx: number, updates: Partial<SkillItem>) => {
    const updated = [...data];
    const items = [...updated[catIdx].items];
    items[skillIdx] = { ...items[skillIdx], ...updates };
    updated[catIdx] = { ...updated[catIdx], items };
    onChange(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Skills</h2>
          <p className="text-sm text-muted-foreground">
            Tag each skill with your honest confidence level — the AI uses this to avoid overstating your expertise.
          </p>
        </div>
        <Button onClick={addCategory} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      {/* Confidence level legend */}
      <div className="form-section">
        <p className="text-sm font-medium mb-2">Confidence Levels:</p>
        <div className="flex flex-wrap gap-4 text-xs">
          {CONFIDENCE_LEVELS.map((level) => (
            <span key={level.value} className={`${level.color} flex items-center gap-1`}>
              <span className={`w-2 h-2 rounded-full ${
                level.value === "coursework" ? "bg-muted-foreground" :
                level.value === "project" ? "bg-warning" :
                level.value === "internship" ? "bg-blue-400" :
                "bg-success"
              }`} />
              <strong>{level.label}</strong> — {
                level.value === "coursework" ? "learned in class/tutorials" :
                level.value === "project" ? "used in personal/class projects" :
                level.value === "internship" ? "used in internship/work" :
                "used in production at scale"
              }
            </span>
          ))}
        </div>
      </div>

      {data.length === 0 && (
        <div className="form-section text-center py-12 text-muted-foreground">
          <p>No skill categories added yet.</p>
          <p className="text-xs mt-2">Suggested: {SUGGESTED_CATEGORIES.join(", ")}</p>
        </div>
      )}

      {data.map((cat, catIdx) => (
        <div key={catIdx} className="form-section space-y-4">
          <div className="flex items-center gap-3">
            <Input
              value={cat.category}
              onChange={(e) => updateCategory(catIdx, e.target.value)}
              placeholder="Category name (e.g. Programming Languages)"
              className="font-medium"
            />
            <button
              onClick={() => removeCategory(catIdx)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {cat.items.map((skill, skillIdx) => (
            <div key={skillIdx} className="flex items-center gap-3 pl-4">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(catIdx, skillIdx, { name: e.target.value })}
                placeholder="Skill name (e.g. Python)"
                className="flex-1"
              />
              <select
                value={skill.confidence}
                onChange={(e) => updateSkill(catIdx, skillIdx, { confidence: e.target.value as SkillItem["confidence"] })}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {CONFIDENCE_LEVELS.map((level) => (
                  <option key={level.value} value={level.value} className="bg-card">
                    {level.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeSkill(catIdx, skillIdx)}
                className="text-muted-foreground hover:text-destructive transition-colors p-1 shrink-0"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}

          <Button variant="ghost" size="sm" onClick={() => addSkill(catIdx)} className="text-xs gap-1 ml-4">
            <Plus className="w-3 h-3" /> Add Skill
          </Button>
        </div>
      ))}
    </div>
  );
}
