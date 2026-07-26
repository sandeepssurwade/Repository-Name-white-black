import { Reveal } from "@/components/ui/Reveal";

export default function Craft() {
  return (
    <section className="relative bg-paper text-ink py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-content px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <p className="text-xs tracking-widest2 uppercase text-gold mb-4">The Atelier</p>
            <p className="text-ink/60 text-sm leading-relaxed max-w-xs">
              Every piece begins as a single hide, chosen by hand, before it ever meets a pattern.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={100}>
            <blockquote className="font-display text-3xl md:text-5xl leading-[1.15] text-balance">
              We do not chase seasons. We build the shoe a person will still be wearing the day
              they no longer need to prove anything.
            </blockquote>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-ink/10 pt-10">
              {[
                { label: "Hides Inspected", value: "1-in-40" },
                { label: "Hand-finishing Hours", value: "9+" },
                { label: "House Since", value: "Ranip" },
                { label: "Collections", value: "6" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl md:text-3xl text-gold">{s.value}</p>
                  <p className="text-ink/50 text-xs tracking-widest2 uppercase mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
