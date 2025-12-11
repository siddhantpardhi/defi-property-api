import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { tradingAPI, marketsAPI } from "@/services/api";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";

const Trading = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pair, setPair] = useState(searchParams.get("pair") || "BTC/USDT");
  const [orderBook, setOrderBook] = useState<any>(null);
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<any>(null);
  const [orderType, setOrderType] = useState<"market" | "limit">("limit");
  const [loading, setLoading] = useState(false);

  // Buy form state
  const [buyAmount, setBuyAmount] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  // Sell form state
  const [sellAmount, setSellAmount] = useState("");
  const [sellPrice, setSellPrice] = useState("");

  useEffect(() => {
    loadTradingData();
    // Set up polling for real-time updates
    const interval = setInterval(loadTradingData, 5000);
    return () => clearInterval(interval);
  }, [pair]);

  const loadTradingData = async () => {
    try {
      const [orderBookRes, tradesRes, marketRes] = await Promise.all([
        tradingAPI.getOrderBook(pair),
        tradingAPI.getRecentTrades(pair),
        marketsAPI.getMarket(pair),
      ]);
      setOrderBook(orderBookRes.data);
      setRecentTrades(tradesRes.data);
      setMarketData(marketRes.data);
    } catch (error: any) {
      console.error("Error loading trading data:", error);
    }
  };

  const handleBuy = async () => {
    if (!buyAmount || (orderType === "limit" && !buyPrice)) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await tradingAPI.placeOrder({
        pair,
        type: "buy",
        orderType,
        amount: parseFloat(buyAmount),
        price: orderType === "limit" ? parseFloat(buyPrice) : undefined,
      });
      toast.success("Buy order placed successfully!");
      setBuyAmount("");
      setBuyPrice("");
      loadTradingData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleSell = async () => {
    if (!sellAmount || (orderType === "limit" && !sellPrice)) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await tradingAPI.placeOrder({
        pair,
        type: "sell",
        orderType,
        amount: parseFloat(sellAmount),
        price: orderType === "limit" ? parseFloat(sellPrice) : undefined,
      });
      toast.success("Sell order placed successfully!");
      setSellAmount("");
      setSellPrice("");
      loadTradingData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const currentPrice = marketData?.price || 0;
  const priceChange = marketData?.priceChange24h || 0;
  const priceChangePercent = marketData?.priceChangePercent24h || 0;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header with Market Info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Select value={pair} onValueChange={(value) => {
              setPair(value);
              setSearchParams({ pair: value });
            }}>
              <SelectTrigger className="w-[200px] bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                <SelectItem value="BNB/USDT">BNB/USDT</SelectItem>
                <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                <SelectItem value="ADA/USDT">ADA/USDT</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <h2 className="text-3xl font-bold text-white">
                ${currentPrice.toLocaleString()}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={priceChange >= 0 ? "default" : "destructive"}
                  className={
                    priceChange >= 0
                      ? "bg-green-500/20 text-green-400 border-green-500/50"
                      : "bg-red-500/20 text-red-400 border-red-500/50"
                  }
                >
                  {priceChange >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {priceChangePercent.toFixed(2)}%
                </Badge>
                <span className="text-slate-400 text-sm">24h Change</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-slate-400 text-sm">24h High</p>
              <p className="text-white font-semibold">
                ${marketData?.high24h?.toLocaleString() || "0"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">24h Low</p>
              <p className="text-white font-semibold">
                ${marketData?.low24h?.toLocaleString() || "0"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">24h Volume</p>
              <p className="text-white font-semibold">
                ${marketData?.volume24h?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Book & Recent Trades */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Book */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Order Book
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Asks (Sell orders) */}
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Sell Orders</p>
                    <div className="space-y-1 max-h-[200px] overflow-y-auto">
                      {orderBook?.asks?.slice(0, 10).map((ask: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm hover:bg-red-500/10 px-2 py-1 rounded cursor-pointer"
                        >
                          <span className="text-red-400">{ask.price}</span>
                          <span className="text-slate-400">{ask.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Price */}
                  <div className="py-2 px-3 bg-slate-800/50 rounded-lg text-center">
                    <span className="text-lg font-bold text-white">
                      ${currentPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Bids (Buy orders) */}
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Buy Orders</p>
                    <div className="space-y-1 max-h-[200px] overflow-y-auto">
                      {orderBook?.bids?.slice(0, 10).map((bid: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm hover:bg-green-500/10 px-2 py-1 rounded cursor-pointer"
                        >
                          <span className="text-green-400">{bid.price}</span>
                          <span className="text-slate-400">{bid.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Trades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-[300px] overflow-y-auto">
                  {recentTrades.map((trade: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm py-1 px-2 hover:bg-slate-800/50 rounded"
                    >
                      <span
                        className={
                          trade.type === "buy" ? "text-green-400" : "text-red-400"
                        }
                      >
                        {trade.price}
                      </span>
                      <span className="text-slate-400">{trade.amount}</span>
                      <span className="text-slate-500 text-xs">
                        {new Date(trade.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trading Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Trade {pair}</CardTitle>
                  <Select value={orderType} onValueChange={(value: any) => setOrderType(value)}>
                    <SelectTrigger className="w-[150px] bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      <SelectItem value="limit">Limit Order</SelectItem>
                      <SelectItem value="market">Market Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="buy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                    <TabsTrigger
                      value="buy"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      Buy
                    </TabsTrigger>
                    <TabsTrigger
                      value="sell"
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                    >
                      Sell
                    </TabsTrigger>
                  </TabsList>

                  {/* Buy Tab */}
                  <TabsContent value="buy" className="space-y-4 mt-6">
                    {orderType === "limit" && (
                      <div className="space-y-2">
                        <Label htmlFor="buy-price" className="text-slate-400">
                          Price (USDT)
                        </Label>
                        <Input
                          id="buy-price"
                          type="number"
                          placeholder="0.00"
                          value={buyPrice}
                          onChange={(e) => setBuyPrice(e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="buy-amount" className="text-slate-400">
                        Amount ({pair.split("/")[0]})
                      </Label>
                      <Input
                        id="buy-amount"
                        type="number"
                        placeholder="0.00"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Total</span>
                        <span className="text-white font-semibold">
                          {buyAmount && (orderType === "market" || buyPrice)
                            ? `${(
                                parseFloat(buyAmount) *
                                (orderType === "market" ? currentPrice : parseFloat(buyPrice))
                              ).toFixed(2)} USDT`
                            : "0.00 USDT"}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={handleBuy}
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6"
                    >
                      {loading ? "Processing..." : `Buy ${pair.split("/")[0]}`}
                    </Button>
                  </TabsContent>

                  {/* Sell Tab */}
                  <TabsContent value="sell" className="space-y-4 mt-6">
                    {orderType === "limit" && (
                      <div className="space-y-2">
                        <Label htmlFor="sell-price" className="text-slate-400">
                          Price (USDT)
                        </Label>
                        <Input
                          id="sell-price"
                          type="number"
                          placeholder="0.00"
                          value={sellPrice}
                          onChange={(e) => setSellPrice(e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="sell-amount" className="text-slate-400">
                        Amount ({pair.split("/")[0]})
                      </Label>
                      <Input
                        id="sell-amount"
                        type="number"
                        placeholder="0.00"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Total</span>
                        <span className="text-white font-semibold">
                          {sellAmount && (orderType === "market" || sellPrice)
                            ? `${(
                                parseFloat(sellAmount) *
                                (orderType === "market" ? currentPrice : parseFloat(sellPrice))
                              ).toFixed(2)} USDT`
                            : "0.00 USDT"}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={handleSell}
                      disabled={loading}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6"
                    >
                      {loading ? "Processing..." : `Sell ${pair.split("/")[0]}`}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Trading;

