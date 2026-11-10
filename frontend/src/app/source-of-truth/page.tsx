"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { sourceOfTruthApi, type SourceOfTruthData } from "@/lib/api";

import { PersonalInfoForm } from "@/components/source-of-truth/PersonalInfoForm";
import { EducationForm } from "@/components/source-of-truth/EducationForm";
import { ExperienceForm } from "@/components/source-of-truth/ExperienceForm";
import { ProjectForm } from "@/components/source-of-truth/ProjectForm";
import { SkillForm } from "@/components/source-of-truth/SkillForm";

const tabs = [
  { id: "personal", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

export default function SourceOfTruthPage() {
  const router = useRouter();
  const [sot, setSot] = useState<SourceOfTruthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    sourceOfTruthApi
      .get()
      .then((res) => setSot(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!sot) return;
    setSaving(true);
    try {
      await sourceOfTruthApi.update(sot);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      </div>
    );
  }

  if (!sot) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full pb-24 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Source of Truth</h1>
          <p className="text-muted-foreground">
            Manage your facts. The AI will only use what you write here to tailor your resumes.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2 shrink-0 shadow-lg">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md font-medium"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 min-w-0">
          {activeTab === "personal" && (
            <PersonalInfoForm
              data={sot.personal_info}
              onChange={(data) => setSot({ ...sot, personal_info: data })}
            />
          )}
          {activeTab === "experience" && (
            <ExperienceForm
              data={sot.experiences}
              onChange={(data) => setSot({ ...sot, experiences: data })}
            />
          )}
          {activeTab === "education" && (
            <EducationForm
              education={sot.education}
              certifications={sot.certifications}
              onEducationChange={(data) => setSot({ ...sot, education: data })}
              onCertificationChange={(data) => setSot({ ...sot, certifications: data })}
            />
          )}
          {activeTab === "projects" && (
            <ProjectForm
              data={sot.projects}
              onChange={(data) => setSot({ ...sot, projects: data })}
            />
          )}
          {activeTab === "skills" && (
            <SkillForm
              data={sot.skills}
              onChange={(data) => setSot({ ...sot, skills: data })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
