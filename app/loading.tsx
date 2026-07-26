export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center gap-6">
      <p className="font-display text-2xl tracking-[0.3em] text-paper">W&nbsp;&amp;&nbsp;B</p>
      <div className="w-40 h-px bg-line-inverse overflow-hidden">
        <div className="h-full w-1/3 bg-gold-bright animate-[loadbar_1.1s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes loadbar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
}
