import { Card } from "@/components/ui/card";
import { Coins, Sprout, Lock, Repeat, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Coins,
    title: "Decentralized Exchange (DEX)",
    description: "Trade directly from your wallet with automated market makers and liquidity pools across multiple chains",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Sprout,
    title: "Yield Farming",
    description: "Maximize returns with automated yield farming strategies and liquidity mining rewards",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Lock,
    title: "Staking & Lending",
    description: "Stake tokens to earn rewards or lend assets to earn interest with transparent smart contracts",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Repeat,
    title: "Cross-Chain Bridges",
    description: "Seamlessly move assets between blockchains - Ethereum, BSC, Polygon, Avalanche, and more",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Users,
    title: "DAO Governance",
    description: "Participate in protocol governance with voting rights on proposals, upgrades, and treasury decisions",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Zap,
    title: "Smart Contract Audited",
    description: "All protocols audited by leading firms - transparent, secure, and battle-tested DeFi infrastructure",
    color: "from-indigo-500 to-purple-500"
  }
];

const Features = () => {
  return (
    <section className="py-24 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Complete DeFi{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to maximize your DeFi potential - from trading to yield farming in one decentralized platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-slate-900/50 backdrop-blur-xl border-slate-800 p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
