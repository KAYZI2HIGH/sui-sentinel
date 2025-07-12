import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  "Free Tier Available",
  "Pro Features",
  "Team Collaboration",
  "Real-time Monitoring",
  "Developer-First Design",
];

export const ComingSoon = () => {
  return (
    <section className="py-16 px-5">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 px-6 py-10 md:flex-row lg:px-20 lg:py-16">
              <div className="md:w-1/2">
                <h4 className="mb-1 text-2xl font-bold md:text-3xl">
                  Plans Coming Soon
                </h4>
                <p className="text-muted-foreground">
                  We&apos;re launching with free and pro tiers for developers of all
                  sizes. Get early access to Sui Sentinel.
                </p>
                <Button
                  className="mt-6"
                  asChild
                >
                  <a
                    href={"/"}
                    target="_blank"
                  >
                    Join Waitlist <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-2 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li
                      className="flex items-center"
                      key={idx}
                    >
                      <Check className="mr-4 size-4 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
