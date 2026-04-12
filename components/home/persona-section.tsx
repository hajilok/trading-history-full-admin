import { CheckIcon, InsightsIcon, ShieldIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const personas = [
  {
    title: "For Individual Traders",
    description:
      "An intuitive editorial interface designed for visual review of market activity. Move beyond grids into a narrative of your own trading history.",
    points: ["Quick Archive Integration", "Visual Performance Ribbons"],
    buttonLabel: "Explore Interface",
    icon: InsightsIcon,
    iconClassName: "bg-primary-fixed text-primary",
  },
  {
    title: "For Administrators",
    description:
      "Robust tools for compliance, auditability, and governance. Keep every submission secure, searchable, and elegantly organized at scale.",
    points: ["Immutable Audit Logs", "API Token Governance"],
    buttonLabel: "Manage Access",
    icon: ShieldIcon,
    iconClassName: "bg-secondary-container text-secondary",
  },
];

export function PersonaSection() {
  return (
    <section className="px-4 py-[4.5rem] md:px-6 md:py-24">
      <div className="mx-auto max-w-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-editorial text-on-surface md:text-5xl">
            Tailored for your Perspective
          </h2>
          <p className="mt-4 text-lg leading-8 text-on-surface-variant">
            Whether you are executing trades or overseeing infrastructure, the interface keeps
            the signal high and the friction low.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {personas.map((persona) => {
            const Icon = persona.icon;

            return (
              <Card
                className="flex h-full flex-col border border-white/60 bg-surface-container-lowest/95 p-8 md:p-10"
                key={persona.title}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-[1.35rem] ${persona.iconClassName}`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-8 text-3xl font-bold tracking-tight text-on-surface">
                  {persona.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-7 text-on-surface-variant">
                  {persona.description}
                </p>
                <ul className="mt-8 space-y-4 text-sm font-medium text-on-surface">
                  {persona.points.map((point) => (
                    <li className="flex items-center gap-3" key={point}>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Button className="mt-10 w-full" variant="secondary">
                  {persona.buttonLabel}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
