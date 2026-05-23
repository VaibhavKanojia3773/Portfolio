import { personalInfo } from "@/data/personal";

export default function Footer() {
  return (
    <footer className="py-8 section-padding border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p className="font-mono text-xs text-slate-400 dark:text-slate-500">
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </p>
      </div>
    </footer>
  );
}
