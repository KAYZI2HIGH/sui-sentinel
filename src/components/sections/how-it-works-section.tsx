"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WorkflowStep {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface HowItWorksProps {
  steps?: WorkflowStep[];
}

const defaultSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Connect & Configure Your Sources",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    description:
      "Start by connecting your Web3 wallet or smart contract addresses on the Sui blockchain. For Web2 monitoring, integrate your applications using our REST API or webhooks. Configure authentication and set up secure connections to your data sources in minutes.",
  },
  {
    id: 2,
    title: "Define Events & Triggers",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    description:
      "Choose exactly what to monitor from our comprehensive event library. Track on-chain activities like NFT mints, token transfers, DeFi swaps, or governance votes. For Web2 apps, monitor user signups, payment failures, system errors, or custom business events. Set up complex filtering rules and conditions.",
  },
  {
    id: 3,
    title: "Configure Alert Channels",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    description:
      "Set up your preferred notification channels to receive real-time alerts. Connect Discord webhooks for team notifications, configure email alerts for critical events, or use direct API callbacks for automated responses. Customize message formats and set different alert priorities for different event types.",
  },
  {
    id: 4,
    title: "Monitor & Respond in Real-Time",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description:
      "Receive instant notifications when your monitored events occur. View detailed event logs with full transaction data, timestamps, and context. Set up automated responses to trigger actions in your systems, or use our dashboard to manually investigate and respond to important events as they happen.",
  },
  {
    id: 5,
    title: "Analytics & Optimization",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    description:
      "Access comprehensive analytics to understand patterns in your monitored events. Track alert frequency, response times, and system performance. Use historical data to optimize your monitoring setup, adjust alert thresholds, and identify trends that help you make better decisions for your Web3 or Web2 applications.",
  },
];

const HowItWorksSection = ({ steps = defaultSteps }: HowItWorksProps) => {
  const [activeStepId, setActiveStepId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(steps[0].image);

  return (
    <section className="py-20">
      <div className="max-w-[1000px]  mx-auto px-6">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            How Sui Sentinel Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From setup to monitoring, discover how Sui Sentinel helps you stay
            on top of your Web3 and Web2 applications with comprehensive
            real-time monitoring and alerting.
          </p>
        </div>

        <div className="flex w-full items-start justify-between gap-12">
          <div className="w-full md:w-1/2">
            <Accordion
              type="single"
              className="w-full"
            >
              {steps.map((step) => (
                <AccordionItem
                  key={step.id}
                  value={`item-${step.id}`}
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(step.image);
                      setActiveStepId(step.id);
                    }}
                    className="cursor-pointer py-6 !no-underline transition hover:no-underline"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                        {step.id}
                      </div>
                      <h3
                        className={`text-xl font-semibold text-left ${
                          step.id === activeStepId
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-4 text-muted-foreground leading-relaxed ml-12">
                      {step.description}
                    </p>
                    <div className="mt-6 md:hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-background border md:block">
            <img
              src={activeImage}
              alt="Workflow step preview"
              className="aspect-[4/3] rounded-md object-cover transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { HowItWorksSection };
