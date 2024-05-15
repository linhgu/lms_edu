import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-500/20">
      <Loader2 className="h-6 w-6 animate-spin text-emerald-800" />
    </div>
  );
}
