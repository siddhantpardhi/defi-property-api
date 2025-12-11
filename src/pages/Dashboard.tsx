import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { walletAPI, tradingAPI, marketsAPI } from "@/services/api";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  Clock,
  DollarSign,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [topMarkets, setTopMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, ordersRes, marketsRes] = await Promise.all([
        walletAPI.getWalletSummary(),
        tradingAPI.getUserOrders({ status: "open" }),
        marketsAPI.getTopGainers(),
      ]);
      setSummary(summaryRes.data);
      setRecentOrders(ordersRes.data.slice(0, 5));
      setTopMarkets(marketsRes.data.slice(0, 5));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const stats = [
    {
      title: "Total Balance",
      value: `$${summary?.totalBalance?.toLocaleString() || "0.00"}`,
      icon: Wallet,
      change: "+12.5%",
      positive: true,
      description: "From last month",
    },
    {
      title: "Total Profit/Loss",
      value: `$${summary?.totalProfitLoss?.toLocaleString() || "0.00"}`,
      icon: TrendingUp,
      change: "+8.2%",
      positive: true,
      description: "This month",
    },
    {
      title: "Active Orders",
      value: recentOrders.length.toString(),
      icon: Activity,
      change: "3 pending",
      positive: null,
      description: "Currently open",
    },
    {
      title: "Today's Volume",
      value: `$${summary?.dailyVolume?.toLocaleString() || "0.00"}`,
      icon: DollarSign,
      change: "+15.3%",
      positive: true,
      description: "Last 24 hours",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back! 👋</h1>
          <p className="text-slate-400">Here's what's happening with your portfolio</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-slate-900/50 border-slate-800 backdrop-blur-xl hover:bg-slate-900/70 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  {stat.positive !== null && (
                    <Badge
                      variant={stat.positive ? "default" : "destructive"}
                      className={
                        stat.positive
                          ? "bg-green-500/20 text-green-400 border-green-500/50"
                          : "bg-red-500/20 text-red-400 border-red-500/50"
                      }
                    >
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-slate-500 text-xs">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Markets */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Top Performers
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => navigate("/markets")}
              >
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topMarkets.map((market) => (
                  <div
                    key={market.pair}
                    className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/trading?pair=${market.pair}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {market.pair.split("/")[0].charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{market.pair}</p>
                        <p className="text-slate-400 text-sm">${market.price?.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {market.priceChangePercent24h?.toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Recent Orders
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => navigate("/trading")}
              >
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 mb-2">No open orders</p>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate("/trading")}
                  >
                    Start Trading
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={order.type === "buy" ? "default" : "destructive"}
                            className={
                              order.type === "buy"
                                ? "bg-green-500/20 text-green-400 border-green-500/50"
                                : "bg-red-500/20 text-red-400 border-red-500/50"
                            }
                          >
                            {order.type}
                          </Badge>
                          <span className="text-white font-semibold">{order.pair}</span>
                        </div>
                        <p className="text-slate-400 text-sm">
                          {order.amount} @ ${order.price}
                        </p>
                      </div>
                      <Badge variant="outline" className="border-slate-700 text-yellow-400">
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => navigate("/trading")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Start Trading
              </Button>
              <Button
                onClick={() => navigate("/wallet")}
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800/50 py-6"
              >
                <Wallet className="w-5 h-5 mr-2" />
                View Wallet
              </Button>
              <Button
                onClick={() => navigate("/markets")}
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800/50 py-6"
              >
                <Activity className="w-5 h-5 mr-2" />
                Explore Markets
              </Button>
              <Button
                onClick={() => navigate("/settings")}
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800/50 py-6"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Deposit Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

