import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Card, CardContent } from '@/components/ui/card';
import { Loader, Trophy, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { ModernHeader } from '@/components/ModernHeader';

interface Holder {
  wallet: string;
  balance: number;
}

const TOKEN_MINT = new PublicKey('Arz4FEoHgmYFGqkpQYhTUGjvHGoahJbtzTUqFeJLbonk');
const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=b12fadd7-ee2f-47bf-a61e-4f6e9647b8e9');

const HoldersPage = () => {
  const [holders, setHolders] = useState<Holder[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalHolders, setTotalHolders] = useState(0);

  useEffect(() => {
    const fetchTokenHolders = async () => {
      try {
        const res = await fetch(
          `https://mainnet.helius-rpc.com/?api-key=b12fadd7-ee2f-47bf-a61e-4f6e9647b8e9`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 1,
              method: 'getTokenLargestAccounts',
              params: [TOKEN_MINT.toBase58()],
            }),
          }
        );

        const result = await res.json();
        const value = result?.result?.value || [];
        setTotalHolders(value.length);

        const tokenAccounts = await Promise.all(
          value.slice(0, 20).map(async (acc: any, index: number) => {
            const accInfo = await connection.getParsedAccountInfo(new PublicKey(acc.address));
            const parsed = (accInfo.value?.data as any)?.parsed;
            return {
              wallet: parsed?.info?.owner || acc.address,
              balance: Number(acc.amount) / 1e9, // Using 9 decimals as specified in Index.tsx
            };
          })
        );

        setHolders(tokenAccounts);
      } catch (error) {
        console.error('Error fetching holders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenHolders();
  }, []);

  const formatBalance = (balance: number) => {
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}M`;
    } else if (balance >= 1000) {
      return `${(balance / 1000).toFixed(1)}K`;
    }
    return balance.toLocaleString();
  };

  const formatWallet = (wallet: string) => {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '💎';
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Top $AV Holders
            </h1>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Discover the whale wallets and diamond hands holding the $AV token
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground">{totalHolders}</h3>
              <p className="text-muted-foreground">Total Holders</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground">Top 20</h3>
              <p className="text-muted-foreground">Displayed Below</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground">
                {holders.length > 0 ? formatBalance(holders[0]?.balance || 0) : '---'}
              </h3>
              <p className="text-muted-foreground">Largest Holder</p>
            </CardContent>
          </Card>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="animate-spin text-primary mb-4" size={48} />
            <p className="text-muted-foreground text-lg">Loading whale wallets...</p>
          </div>
        ) : (
          /* Holders Grid */
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Leaderboard
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {holders.map((holder, index) => (
                <Card 
                  key={index} 
                  className={`
                    bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                    ${index < 3 ? 'border-primary/30 bg-primary/5' : 'border-border/50'}
                  `}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Rank and Wallet */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                            ${index < 3 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                          `}>
                            <span className="text-2xl">{getRankIcon(index)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-muted-foreground">
                              Rank #{index + 1}
                            </span>
                            <span className="text-xs text-muted-foreground/70 hidden sm:block">
                              {index === 0 ? 'Whale 🐋' : index < 3 ? 'Diamond Hand 💎' : 'Holder 👑'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Wallet Address */}
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <code className="text-sm font-mono bg-muted/50 px-3 py-1 rounded border text-foreground truncate">
                            {formatWallet(holder.wallet)}
                          </code>
                          <a
                            href={`https://solscan.io/account/${holder.wallet}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>

                      {/* Balance */}
                      <div className="flex items-center justify-end">
                        <div className={`
                          px-4 py-2 rounded-full text-sm font-bold border
                          ${index < 3 
                            ? 'bg-primary/10 text-primary border-primary/20' 
                            : 'bg-green-500/10 text-green-500 border-green-500/20'
                          }
                        `}>
                          {formatBalance(holder.balance)} $AV
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm">
            Data updated in real-time from Solana blockchain • Made with ❤️ for $AV holders
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoldersPage;