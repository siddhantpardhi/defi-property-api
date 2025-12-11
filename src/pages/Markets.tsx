import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketsAPI } from "@/services/api";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpDown,
  Activity,
} from "lucide-react";

const Markets = () => {
  const navigate = useNavigate();
  const [markets, setMarkets] = useState<any[]>([]);
  const [topGainers, setTopGainers] = useState<any[]>([]);
  const [topLosers, setTopLosers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("favorites") || "[]"))
  );

  useEffect(() => {
    loadMarkets();
    const interval = setInterval(loadMarkets, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadMarkets = async () => {
    try {
      setLoading(true);
      const [marketsRes, gainersRes, losersRes] = await Promise.all([
        marketsAPI.getAllMarkets(),
        marketsAPI.getTopGainers(),
        marketsAPI.getTopLosers(),
      ]);
      setMarkets(marketsRes.data);
      setTopGainers(gainersRes.data);
      setTopLosers(losersRes.data);
    } catch (error) {
      console.error("Error loading markets:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (pair: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(pair)) {
      newFavorites.delete(pair);
    } else {
      newFavorites.add(pair);
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
  };

  const filteredMarkets = markets.filter(
    (market) =>
      market.pair.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteMarkets = markets.filter((market) => favorites.has(market.pair));

  const MarketRow = ({ market }: { market: any }) => {
    const isPositive = market.priceChangePercent24h >= 0;
    const isFavorite = favorites.has(market.pair);

    return (
      <TableRow
        className="hover:bg-slate-800/50 cursor-pointer transition-colors"
        onClick={() => navigate(`/trading?pair=${market.pair}`)}
      >
        <TableCell>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(market.pair);
            }}
          >
            <Star
              className={`h-4 w-4 ${
                isFavorite ? "fill-yellow-500 text-yellow-500" : "text-slate-400"
              }`}
            />
          </Button>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {market.pair.split("/")[0].charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold">{market.pair}</p>
              <p className="text-slate-400 text-sm">{market.name || market.pair.split("/")[0]}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-white font-semibold">
          ${market.price?.toLocaleString() || "0.00"}
        </TableCell>
        <TableCell>
          <Badge
            variant={isPositive ? "default" : "destructive"}
            className={
              isPositive
                ? "bg-green-500/20 text-green-400 border-green-500/50"
                : "bg-red-500/20 text-red-400 border-red-500/50"
            }
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {market.priceChangePercent24h?.toFixed(2)}%
          </Badge>
        </TableCell>
        <TableCell className="text-white">
          ${market.volume24h?.toLocaleString() || "0"}
        </TableCell>
        <TableCell className="text-white">
          ${market.marketCap?.toLocaleString() || "0"}
        </TableCell>
        <TableCell>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trading?pair=${market.pair}`);
            }}
          >
            Trade
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading markets...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Markets</h1>
          <p className="text-slate-400">
            Explore and trade cryptocurrencies on CoreX
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">
                Total Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold text-white">{markets.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">
                24h Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-white">
                  $
                  {markets
                    .reduce((sum, m) => sum + (m.volume24h || 0), 0)
                    .toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-white">{favorites.size}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Gainers and Losers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Top Gainers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topGainers.slice(0, 5).map((market) => (
                  <div
                    key={market.pair}
                    className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/trading?pair=${market.pair}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {market.pair.split("/")[0].charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{market.pair}</p>
                        <p className="text-slate-400 text-sm">
                          ${market.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {market.priceChangePercent24h?.toFixed(2)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                Top Losers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topLosers.slice(0, 5).map((market) => (
                  <div
                    key={market.pair}
                    className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/trading?pair=${market.pair}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {market.pair.split("/")[0].charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{market.pair}</p>
                        <p className="text-slate-400 text-sm">
                          ${market.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {market.priceChangePercent24h?.toFixed(2)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Markets Table */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle className="text-white">All Markets</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-slate-800/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="hover:bg-slate-800/50">
                        <TableHead className="w-12"></TableHead>
                        <TableHead className="text-slate-300">Market</TableHead>
                        <TableHead className="text-slate-300">Price</TableHead>
                        <TableHead className="text-slate-300">24h Change</TableHead>
                        <TableHead className="text-slate-300">24h Volume</TableHead>
                        <TableHead className="text-slate-300">Market Cap</TableHead>
                        <TableHead className="text-slate-300">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMarkets.map((market) => (
                        <MarketRow key={market.pair} market={market} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                {favoriteMarkets.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No favorites yet</p>
                    <p className="text-slate-500 text-sm mt-2">
                      Click the star icon to add markets to your favorites
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-800 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-800/50">
                        <TableRow className="hover:bg-slate-800/50">
                          <TableHead className="w-12"></TableHead>
                          <TableHead className="text-slate-300">Market</TableHead>
                          <TableHead className="text-slate-300">Price</TableHead>
                          <TableHead className="text-slate-300">24h Change</TableHead>
                          <TableHead className="text-slate-300">24h Volume</TableHead>
                          <TableHead className="text-slate-300">Market Cap</TableHead>
                          <TableHead className="text-slate-300">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {favoriteMarkets.map((market) => (
                          <MarketRow key={market.pair} market={market} />
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Markets;

