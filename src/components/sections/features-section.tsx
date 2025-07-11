import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <div className="w-full py-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge variant="secondary">Developer Tools</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              Features Built for Developers
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              Real-time alerts and monitoring that keep you ahead of critical
              blockchain and Web2 events.
            </p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-1 items-start lg:grid-cols-2 xl:grid-cols-3 gap-8">
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Smart Contract Event Tracking</p>
                  <p className="text-muted-foreground text-sm">
                    Monitor NFT sales, DeFi liquidations, token swaps, and
                    custom contract events in real-time across Sui and other
                    blockchains.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Wallet Transaction Monitoring</p>
                  <p className="text-muted-foreground text-sm">
                    Track large token transfers, unusual activity patterns, and
                    specific wallet behaviors with customizable thresholds.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Web2 Event Integration</p>
                  <p className="text-muted-foreground text-sm">
                    Monitor user signups, API errors, database changes, and
                    other Web2 events alongside your blockchain data.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Multi-Channel Alerts</p>
                  <p className="text-muted-foreground text-sm">
                    Receive notifications via Discord, email, webhooks, or
                    direct logging with customizable alert rules and priorities.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Automated Action Triggers</p>
                  <p className="text-muted-foreground text-sm">
                    Execute custom scripts, API calls, or smart contract
                    interactions automatically when specific conditions are met.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Developer-First API</p>
                  <p className="text-muted-foreground text-sm">
                    RESTful API with comprehensive documentation, SDKs, and
                    GraphQL support for seamless integration into your workflow.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Real-Time Dashboard</p>
                  <p className="text-muted-foreground text-sm">
                    Live monitoring interface with customizable widgets, event
                    history, and performance metrics for all your tracked
                    events.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Advanced Filtering & Queries</p>
                  <p className="text-muted-foreground text-sm">
                    Complex event filtering with SQL-like queries, regex pattern
                    matching, and conditional logic for precise monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
