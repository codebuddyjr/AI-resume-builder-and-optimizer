"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { User, Briefcase, GraduationCap, Code, Sparkles, Download, Eye } from "lucide-react";

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
      {/* Left Pane - Editor */}
      <div className="w-full md:w-[450px] lg:w-[500px] border-r border-border/50 bg-black/20 flex flex-col h-full">
        {/* Editor Tabs */}
        <div className="flex border-b border-border/50 overflow-x-auto hide-scrollbar p-2 gap-2">
          <TabButton active={activeTab === "personal"} onClick={() => setActiveTab("personal")} icon={<User className="w-4 h-4"/>} label="Personal" />
          <TabButton active={activeTab === "experience"} onClick={() => setActiveTab("experience")} icon={<Briefcase className="w-4 h-4"/>} label="Experience" />
          <TabButton active={activeTab === "education"} onClick={() => setActiveTab("education")} icon={<GraduationCap className="w-4 h-4"/>} label="Education" />
          <TabButton active={activeTab === "skills"} onClick={() => setActiveTab("skills")} icon={<Code className="w-4 h-4"/>} label="Skills" />
        </div>

        {/* Editor Form Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === "personal" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="text-primary" /> Personal Details
                </h2>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <Input placeholder="e.g. Jane Doe" defaultValue="Jane Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Professional Title</label>
                    <Input placeholder="e.g. Senior Software Engineer" defaultValue="Full Stack Developer" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <Input placeholder="jane@example.com" type="email" defaultValue="jane@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <Input placeholder="+1 234 567 890" defaultValue="+1 234 567 890" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Professional Summary</label>
                    <div className="relative">
                      <Textarea 
                        placeholder="Write a brief summary of your professional background..." 
                        className="min-h-[120px]"
                        defaultValue="Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Strong expertise in React, Next.js, and Node.js. Proven ability to lead teams and deliver complex projects on time."
                      />
                      <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 rounded-full h-8 w-8" title="Optimize with AI">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Click the sparkle icon to let AI enhance your summary.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Placeholders for other tabs */}
          {activeTab !== "personal" && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground opacity-50 space-y-4 animate-in fade-in">
              <Briefcase className="w-12 h-12" />
              <p>More form fields will go here</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane - Live Preview */}
      <div className="hidden md:flex flex-1 flex-col bg-zinc-950 h-full relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="outline" size="sm" className="glass gap-2">
            <Eye className="w-4 h-4" /> Preview Mode
          </Button>
          <Button size="sm" className="gap-2 shadow-lg shadow-primary/20">
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>

        {/* PDF Canvas Area */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start custom-scrollbar">
          {/* Simulated A4 Paper */}
          <div className="w-[800px] min-h-[1131px] bg-white text-black shadow-2xl rounded-sm p-12 transition-all">
            {/* Real-time Rendered Resume Content */}
            <div className="border-b-2 border-zinc-200 pb-6 mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-2">Jane Doe</h1>
              <h2 className="text-xl text-primary font-medium mb-4">Full Stack Developer</h2>
              <div className="flex gap-4 text-sm text-zinc-600 font-medium">
                <span>jane@example.com</span>
                <span>•</span>
                <span>+1 234 567 890</span>
                <span>•</span>
                <span>San Francisco, CA</span>
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-zinc-700 leading-relaxed">
                Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Strong expertise in React, Next.js, and Node.js. Proven ability to lead teams and deliver complex projects on time.
              </p>
            </div>
            
            {/* Experience Placeholder in Preview */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-4">Experience</h3>
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-zinc-900 font-bold">Senior Software Engineer</h4>
                  <span className="text-zinc-500 text-sm font-medium">2021 - Present</span>
                </div>
                <div className="text-primary font-medium text-sm mb-3">TechNova Inc.</div>
                <ul className="list-disc list-outside ml-4 text-zinc-700 space-y-2 text-sm leading-relaxed">
                  <li>Led the frontend architecture for the core SaaS product using Next.js, reducing load times by 40%.</li>
                  <li>Mentored a team of 4 junior developers and established code review best practices.</li>
                  <li>Integrated AI features that increased user engagement by 25% over a 3-month period.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        active 
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
