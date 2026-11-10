import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NewApplicationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
        <PlusCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">New Tailored Resume</h1>
      <p className="text-muted-foreground max-w-lg mx-auto mb-8">
        The resume tailoring flow is currently under construction. Check back soon to start pasting job descriptions and generating perfectly targeted resumes!
      </p>
      <Link href="/">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
