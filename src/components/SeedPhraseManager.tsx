import { useEffect, useState } from 'react';
import { Coins, Plus, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TokenAllocation {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  percentage: number;
  price: number;
  change24h: number;
  color: string;
}

const HELIUS_API_KEY = 'b12fadd7-ee2f-47bf-a61e-4f6e9647b8e9';

export const TokenAllocations = () => {
  const [tokens, setTokens] = useState<TokenAllocation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('walletMetadataList');
    if (stored) {
      const wallets = JSON.parse(stored);
      const fetchData = async () => {
        const balances = await Promise.all(wallets.map((w: any) => fetchTokenData(w.address)));
        const merged = balances.flat().filter(t => t.amount > 0);
        const total = merged.reduce((acc, t) => acc + t.value, 0);
        const updated = merged.map(t => ({ ...t, percentage: total ? parseFloat(((t.value / total) * 100).toFixed(2)) : 0 }));
        setTokens(updated);
      };
      fetchData();
    }
  }, []);

  const fetchTokenData = async (address: string): Promise<TokenAllocation[]> => {
    try {
      const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            address,
            { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
            { encoding: 'jsonParsed' }
          ]
        })
      });
      const json = await res.json();
      const accounts = json.result.value;
      const tokens: TokenAllocation[] = [];

      for (const acc of accounts) {
        const mint = acc.account.data.parsed.info.mint;
        const amount = parseFloat(acc.account.data.parsed.info.tokenAmount.uiAmount || 0);
        if (!amount || amount <= 0) continue;

        const meta = await fetch(`https://token.jup.ag/strict/${mint}`).then(r => r.json());
        const price = meta.price || 0;
        const value = amount * price;

        if (value <= 0) continue;

        tokens.push({
          id: mint,
          symbol: meta.symbol || 'UNKNOWN',
          name: meta.name || 'Unknown Token',
          amount,
          value,
          price,
          change24h: meta.change24h || 0,
          color: 'vault-green',
          percentage: 0
        });
      }
      return tokens;
    } catch (err) {
      console.error('Token fetch error:', err);
      return [];
    }
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toFixed(decimals);
  };

  const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-vault-green neon-text">Token Allocations</h2>
          <p className="text-sm text-vault-gray-light font-mono mt-1">Track your portfolio distribution and performance</p>
        </div>
        <Button variant="web3" className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> Add Token
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-vault-dark border-vault-green/40 terminal-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-vault-green/10 rounded-sm">
                <DollarSign className="w-5 h-5 text-vault-green" />
              </div>
              <div>
                <p className="text-xs font-mono text-vault-gray-light">TOTAL VALUE</p>
                <p className="text-xl font-orbitron font-bold text-vault-green">${formatNumber(totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-vault-dark border-vault-purple/40 terminal-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-vault-purple/10 rounded-sm">
                <Coins className="w-5 h-5 text-vault-purple" />
              </div>
              <div>
                <p className="text-xs font-mono text-vault-gray-light">TOKENS</p>
                <p className="text-xl font-orbitron font-bold text-vault-purple">{tokens.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-vault-dark border-vault-cyan/40 terminal-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-vault-cyan/10 rounded-sm">
                <TrendingUp className="w-5 h-5 text-vault-cyan" />
              </div>
              <div>
                <p className="text-xs font-mono text-vault-gray-light">24H CHANGE</p>
                <p className="text-xl font-orbitron font-bold text-vault-cyan">+7.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-vault-dark border-vault-green/40 terminal-border">
        <CardHeader>
          <CardTitle className="text-vault-green font-orbitron">Portfolio Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tokens.map(token => (
              <div key={token.id} className="space-y-2">
                <div className="flex flex-wrap justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-sm bg-${token.color}`}></div>
                    <span className="font-mono text-vault-green">{token.symbol}</span>
                    <span className="text-vault-gray-light font-mono">{token.name}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-vault-green">{token.percentage}%</span>
                    <span className="font-mono text-vault-gray-light">${formatNumber(token.value)}</span>
                  </div>
                </div>
                <Progress value={token.percentage} className="h-2 bg-vault-darker" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
