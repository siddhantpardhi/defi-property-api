import { Card } from "@/components/ui/card";

const stats = [
  {
    value: "$2.4B+",
    label: "Total Value Locked (TVL)",
  },
  {
    value: "150K+",
    label: "DeFi Users",
  },
  {
    value: "50+",
    label: "DeFi Protocols",
  },
  {
    value: "12.5%",
    label: "Average APY",
  }
];

const Stats = () => {
  return (
    <section id="stats" className="py-20 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="bg-slate-900/50 backdrop-blur-xl border-slate-800 p-8 text-center hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
