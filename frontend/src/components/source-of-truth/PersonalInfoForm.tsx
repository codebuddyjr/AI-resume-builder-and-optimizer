"use client";

import { Input } from "@/components/ui/Input";
import type { PersonalInfo } from "@/lib/api";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: Props) {
  const update = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value || (field === "name" || field === "email" || field === "phone" || field === "location" ? "" : null) });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <p className="text-sm text-muted-foreground">Basic contact details for your resume header.</p>

      <div className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Full Name *</label>
            <Input
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Joshil"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Email *</label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Phone</label>
            <Input
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Location</label>
            <Input
              value={data.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">LinkedIn</label>
            <Input
              value={data.linkedin ?? ""}
              onChange={(e) => update("linkedin", e.target.value)}
              placeholder="linkedin.com/in/..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">GitHub</label>
            <Input
              value={data.github ?? ""}
              onChange={(e) => update("github", e.target.value)}
              placeholder="github.com/..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Website</label>
            <Input
              value={data.website ?? ""}
              onChange={(e) => update("website", e.target.value)}
              placeholder="yoursite.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
