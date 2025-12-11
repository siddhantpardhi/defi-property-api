import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { walletAPI } from "@/services/api";
import {
  Wallet as WalletIcon,
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  EyeOff,
  Copy,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Wallet = () => {
  const [balances, setBalances] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  // Deposit form state
  const [depositCoin, setDepositCoin] = useState("BTC");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositNetwork, setDepositNetwork] = useState("ERC20");

  // Withdraw form state
  const [withdrawCoin, setWithdrawCoin] = useState("BTC");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawNetwork, setWithdrawNetwork] = useState("ERC20");

  useEffect(() => {
    loadWalletData();
    const interval = setInterval(loadWalletData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const [balancesRes, summaryRes, transactionsRes] = await Promise.all([
        walletAPI.getBalances(),
        walletAPI.getWalletSummary(),
        walletAPI.getTransactionHistory({ limit: 20 }),
      ]);
      setBalances(balancesRes.data);
      setSummary(summaryRes.data);
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error("Error loading wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await walletAPI.createDeposit({
        coin: depositCoin,
        amount: parseFloat(depositAmount),
        network: depositNetwork,
      });
      toast.success("Deposit initiated successfully!");
      setDepositDialogOpen(false);
      setDepositAmount("");
      loadWalletData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create deposit");
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!withdrawAddress) {
      toast.error("Please enter a wallet address");
      return;
    }

    try {
      await walletAPI.createWithdrawal({
        coin: withdrawCoin,
        amount: parseFloat(withdrawAmount),
        address: withdrawAddress,
        network: withdrawNetwork,
      });
      toast.success("Withdrawal initiated successfully!");
      setWithdrawDialogOpen(false);
      setWithdrawAmount("");
      setWithdrawAddress("");
      loadWalletData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create withdrawal");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading wallet...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
            <p className="text-slate-400">Manage your digital assets</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <ArrowDownToLine className="w-4 h-4 mr-2" />
                  Deposit
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 text-white">
                <DialogHeader>
                  <DialogTitle>Deposit Crypto</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Deposit crypto to your CoreX wallet
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="deposit-coin">Select Coin</Label>
                    <Select value={depositCoin} onValueChange={setDepositCoin}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="USDT">Tether (USDT)</SelectItem>
                        <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit-network">Network</Label>
                    <Select value={depositNetwork} onValueChange={setDepositNetwork}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="ERC20">ERC20</SelectItem>
                        <SelectItem value="BEP20">BEP20</SelectItem>
                        <SelectItem value="TRC20">TRC20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount">Amount</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      placeholder="0.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-lg">
                    <p className="text-sm text-slate-400 mb-2">Deposit Address:</p>
                    <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded">
                      <code className="text-sm text-white">
                        0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
                      </code>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb")
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleDeposit}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Confirm Deposit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <ArrowUpFromLine className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 text-white">
                <DialogHeader>
                  <DialogTitle>Withdraw Crypto</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Withdraw crypto from your CoreX wallet
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-coin">Select Coin</Label>
                    <Select value={withdrawCoin} onValueChange={setWithdrawCoin}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="USDT">Tether (USDT)</SelectItem>
                        <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-network">Network</Label>
                    <Select value={withdrawNetwork} onValueChange={setWithdrawNetwork}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="ERC20">ERC20</SelectItem>
                        <SelectItem value="BEP20">BEP20</SelectItem>
                        <SelectItem value="TRC20">TRC20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-address">Withdrawal Address</Label>
                    <Input
                      id="withdraw-address"
                      type="text"
                      placeholder="Enter wallet address"
                      value={withdrawAddress}
                      onChange={(e) => setWithdrawAddress(e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount">Amount</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleWithdraw}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Confirm Withdrawal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Total Balance */}
        <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <WalletIcon className="w-5 h-5 text-white" />
                <span className="text-white/80">Total Balance</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setHideBalance(!hideBalance)}
              >
                {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">
              {hideBalance ? "••••••" : `$${summary?.totalBalance?.toLocaleString() || "0.00"}`}
            </h2>
            <p className="text-white/80 text-sm">
              Available: {hideBalance ? "••••••" : `$${summary?.availableBalance?.toLocaleString() || "0.00"}`}
            </p>
          </CardContent>
        </Card>

        {/* Balances */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Your Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {balances.map((balance) => (
                <div
                  key={balance.coin}
                  className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {balance.coin.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{balance.coin}</p>
                      <p className="text-slate-400 text-sm">
                        {hideBalance ? "••••••" : balance.available} {balance.coin}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {hideBalance ? "••••••" : `$${balance.usdValue?.toLocaleString() || "0.00"}`}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Locked: {hideBalance ? "••••" : balance.locked}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-slate-800/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposit">Deposits</TabsTrigger>
                <TabsTrigger value="withdraw">Withdrawals</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="hover:bg-slate-800/50">
                        <TableHead className="text-slate-300">Type</TableHead>
                        <TableHead className="text-slate-300">Coin</TableHead>
                        <TableHead className="text-slate-300">Amount</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Date</TableHead>
                        <TableHead className="text-slate-300">TX Hash</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id} className="hover:bg-slate-800/50">
                          <TableCell>
                            <Badge
                              variant={tx.type === "deposit" ? "default" : "secondary"}
                              className={
                                tx.type === "deposit"
                                  ? "bg-green-500/20 text-green-400 border-green-500/50"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/50"
                              }
                            >
                              {tx.type === "deposit" ? (
                                <ArrowDownToLine className="w-3 h-3 mr-1" />
                              ) : (
                                <ArrowUpFromLine className="w-3 h-3 mr-1" />
                              )}
                              {tx.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white font-semibold">
                            {tx.coin}
                          </TableCell>
                          <TableCell className="text-white">
                            {tx.amount} {tx.coin}
                          </TableCell>
                          <TableCell>{getStatusBadge(tx.status)}</TableCell>
                          <TableCell className="text-slate-400">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300"
                              onClick={() => copyToClipboard(tx.txHash || "")}
                            >
                              {tx.txHash?.substring(0, 10)}...
                              <Copy className="w-3 h-3 ml-1" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="deposit" className="mt-6">
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="hover:bg-slate-800/50">
                        <TableHead className="text-slate-300">Coin</TableHead>
                        <TableHead className="text-slate-300">Amount</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Date</TableHead>
                        <TableHead className="text-slate-300">TX Hash</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions
                        .filter((tx) => tx.type === "deposit")
                        .map((tx) => (
                          <TableRow key={tx.id} className="hover:bg-slate-800/50">
                            <TableCell className="text-white font-semibold">
                              {tx.coin}
                            </TableCell>
                            <TableCell className="text-white">
                              {tx.amount} {tx.coin}
                            </TableCell>
                            <TableCell>{getStatusBadge(tx.status)}</TableCell>
                            <TableCell className="text-slate-400">
                              {new Date(tx.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => copyToClipboard(tx.txHash || "")}
                              >
                                {tx.txHash?.substring(0, 10)}...
                                <Copy className="w-3 h-3 ml-1" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="withdraw" className="mt-6">
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="hover:bg-slate-800/50">
                        <TableHead className="text-slate-300">Coin</TableHead>
                        <TableHead className="text-slate-300">Amount</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Date</TableHead>
                        <TableHead className="text-slate-300">TX Hash</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions
                        .filter((tx) => tx.type === "withdraw")
                        .map((tx) => (
                          <TableRow key={tx.id} className="hover:bg-slate-800/50">
                            <TableCell className="text-white font-semibold">
                              {tx.coin}
                            </TableCell>
                            <TableCell className="text-white">
                              {tx.amount} {tx.coin}
                            </TableCell>
                            <TableCell>{getStatusBadge(tx.status)}</TableCell>
                            <TableCell className="text-slate-400">
                              {new Date(tx.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => copyToClipboard(tx.txHash || "")}
                              >
                                {tx.txHash?.substring(0, 10)}...
                                <Copy className="w-3 h-3 ml-1" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Wallet;

