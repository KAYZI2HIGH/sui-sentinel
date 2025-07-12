import { Building2, Code, Globe, Shield, TrendingUp, Users } from 'lucide-react';

export function Features() {
    return (
      <section className="py-12 ">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <div className="relative z-10 mx-auto max-w-4xl space-y-4 md:space-y-8">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-regular max-md:text-balance">
              Built for Developers, Traders, and Teams
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              Designed for both Web3 and Web2 workflows, Sui Sentinel helps
              builders stay ahead of what&apos;s happening across their apps,
              users, and on-chain assets.
            </p>
           
          </div>

          <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3 cursor-default">
            <div className="space-y-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code className="size-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">
                  Blockchain Developers
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monitor smart contract events, track transaction flows, and
                debug dApps with real-time Sui blockchain insights.
              </p>
            </div>

            <div className="space-y-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="size-5 text-green-600" />
                </div>
                <h3 className="text-base font-semibold">Crypto Traders</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get instant alerts on price movements, large transactions, and
                market opportunities across Sui ecosystem tokens.
              </p>
            </div>

            <div className="space-y-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="size-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold">DAOs & Communities</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track governance proposals, member activities, and treasury
                movements with automated Discord notifications.
              </p>
            </div>

            <div className="space-y-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Building2 className="size-5 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold">Web2 Teams</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bridge traditional applications with blockchain data using
                familiar tools and monitoring workflows.
              </p>
            </div>

            <div className="space-y-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Globe className="size-5 text-orange-600" />
                </div>
                <h3 className="text-base font-semibold">DeFi Protocols</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monitor liquidity pools, yield farming rewards, and protocol
                health metrics with custom alert thresholds.
              </p>
            </div>

            <div className="space-y-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Shield className="size-5 text-red-600" />
                </div>
                <h3 className="text-base font-semibold">Security Teams</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Detect suspicious activities, monitor wallet behaviors, and
                receive immediate alerts for potential security threats.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}