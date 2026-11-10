"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PlusCircle, Database, History, ArrowRight, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { sourceOfTruthApi, type SourceOfTruthData } from "@/lib/api";

export default function DashboardPage() {
  const [sot, setSot] = useState<SourceOfTruthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sourceOfTruthApi
      .get()
      .then((res) => setSot(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const hasData = sot && sot.personal_info.name !== "";
  const projectCount = sot?.projects.length ?? 0;
  const experienceCount = sot?.experiences.length ?? 0;
  const skillCount = sot?.skills.reduce((sum, cat) => sum + cat.items.length, 0) ?? 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Your personal resume tailoring workspace.
        </p>
      </div>

      {/* Backend connection error */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-destructive">Backend not connected</p>
            <p className="text-sm text-muted-foreground mt-1">
              Make sure the FastAPI server is running on localhost:8000.
              <br />
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded mt-1 inline-block">
                cd backend && uvicorn app.main:app --reload
              </code>
            </p>
          </div>
        </div>
      )}

      {/* Source of Truth Status */}
      {!loading && !error && !hasData && (
        <div className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-warning">Source of Truth is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              You need to fill in your background data before you can tailor resumes.
            </p>
            <Link href="/source-of-truth">
              <Button size="sm" className="mt-3 gap-2">
                <Database className="w-4 h-4" />
                Set Up Source of Truth
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {!loading && hasData && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Projects" value={projectCount} />
          <StatCard label="Experiences" value={experienceCount} />
          <StatCard label="Skills" value={skillCount} />
          <StatCard label="Applications" value={0} />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <ActionCard
          href="/applications/new"
          icon={<PlusCircle className="w-6 h-6" />}
          title="New Application"
          description="Paste a JD and generate a tailored resume"
          primary
        />
        <ActionCard
          href="/source-of-truth"
          icon={<Database className="w-6 h-6" />}
          title="Edit Source of Truth"
          description="Update your projects, skills, and experience"
        />
        <ActionCard
          href="/applications"
          icon={<History className="w-6 h-6" />}
          title="View History"
          description="Browse past tailored resumes by company"
        />
      </div>

      {/* How it works — brief for personal tool */}
      <div className="form-section">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          How This Works
        </h2>
        <ol className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">1</span>
            <span><strong className="text-foreground">Fill your Source of Truth</strong> — your real projects, skills (with confidence levels), and experience. This is the only data the AI can use.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">2</span>
            <span><strong className="text-foreground">Paste a Job Description</strong> — the AI parses it, scores each of your projects for relevance, and explains why.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">3</span>
            <span><strong className="text-foreground">Review & Export</strong> — approve the AI&apos;s scoring, review bullet rewrites side-by-side, and download your one-page PDF.</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="form-section text-center">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function ActionCard({
  href,
  icon,
  title,
  description,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  primary?: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={`form-section h-full flex flex-col gap-3 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg ${
          primary ? "border-primary/30 hover:border-primary/50 hover:shadow-primary/10" : "hover:shadow-white/5"
        }`}
      >
        <div className={`${primary ? "text-primary" : "text-muted-foreground"}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            {title}
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}
