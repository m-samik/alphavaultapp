import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Card, CardContent } from '@/components/ui/card';
import { Loader, Trophy, Users, TrendingUp, ExternalLink, Crown, Sparkles, Flame } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <ModernHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-4 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <div className="relative p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm">
                  <Crown className="h-10 w-10 text-purple-400" />
                </div>
              </div>
              <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
                Whale Watch
              </h1>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse delay-300"></div>
                <div className="relative p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/30 backdrop-blur-sm">
                  <Sparkles className="h-10 w-10 text-blue-400" />
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto mb-4 animate-fade-in delay-200">
              Track the biggest <span className="text-purple-400 font-bold">$AV</span> whales and diamond hands 🐋💎
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-semibold">
              <Flame className="h-5 w-5 text-orange-500 animate-bounce" />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Live Blockchain Data
              </span>
              <Flame className="h-5 w-5 text-orange-500 animate-bounce delay-150" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 text-center relative z-10">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Users className="h-12 w-12 text-purple-400 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">{totalHolders}</h3>
              <p className="text-muted-foreground font-semibold">Total Holders</p>
              <div className="absolute top-4 right-4">
                <Sparkles className="h-4 w-4 text-purple-400/50 animate-pulse" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 backdrop-blur-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 text-center relative z-10">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">Top 20</h3>
              <p className="text-muted-foreground font-semibold">Elite Whales</p>
              <div className="absolute top-4 right-4">
                <Flame className="h-4 w-4 text-green-400/50 animate-bounce" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 text-center relative z-10">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Trophy className="h-12 w-12 text-blue-400 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {holders.length > 0 ? formatBalance(holders[0]?.balance || 0) : '---'}
              </h3>
              <p className="text-muted-foreground font-semibold">Biggest Whale</p>
              <div className="absolute top-4 right-4">
                <Crown className="h-4 w-4 text-blue-400/50 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <Loader className="animate-spin text-primary mb-4 relative z-10" size={64} />
            </div>
            <p className="text-muted-foreground text-xl font-semibold mb-2">Loading whale wallets...</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Scanning Solana blockchain</span>
              <Sparkles className="h-4 w-4 animate-pulse delay-150" />
            </div>
          </div>
        ) : (
          /* Holders Grid */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
                <Crown className="h-8 w-8 text-purple-400" />
                Elite Leaderboard
                <Flame className="h-8 w-8 text-orange-500" />
              </h2>
              <p className="text-muted-foreground">The most legendary $AV holders on Solana</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {holders.map((holder, index) => {
                const isTopThree = index < 3;
                const isWhale = index === 0;
                
                return (
                  <Card 
                    key={index} 
                    className={`
                      group relative overflow-hidden backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02]
                      ${isWhale 
                        ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border-purple-400/50 hover:border-purple-300/70 shadow-[0_0_30px_rgba(168,85,247,0.4)]' 
                        : isTopThree 
                        ? 'bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-green-500/15 border-blue-400/40 hover:border-blue-300/60 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                        : 'bg-card/30 border-border/40 hover:border-border/60 hover:bg-card/50'
                      }
                    `}
                  >
                    {/* Glow effect for top holders */}
                    {isTopThree && (
                      <div className={`
                        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        ${isWhale 
                          ? 'bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10' 
                          : 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5'
                        }
                      `}></div>
                    )}
                    
                    <CardContent className="p-6 md:p-8 relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        {/* Rank and Wallet */}
                        <div className="flex items-center gap-6 flex-1 min-w-0">
                          <div className="flex items-center gap-4">
                            <div className={`
                              relative w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-transform duration-300 group-hover:scale-110
                              ${isWhale 
                                ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]' 
                                : isTopThree 
                                ? 'bg-gradient-to-br from-blue-500/30 to-green-500/30 border-2 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                                : 'bg-muted/50 border border-muted'
                              }
                            `}>
                              {isWhale && (
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-md animate-pulse"></div>
                              )}
                              <span className="relative z-10 text-3xl">{getRankIcon(index)}</span>
                            </div>
                            
                            <div className="flex flex-col">
                              <span className={`
                                text-lg font-bold mb-1
                                ${isWhale 
                                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' 
                                  : isTopThree 
                                  ? 'bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'
                                  : 'text-foreground'
                                }
                              `}>
                                Rank #{index + 1}
                              </span>
                              <span className={`
                                text-sm font-semibold
                                ${isWhale 
                                  ? 'text-purple-400' 
                                  : isTopThree 
                                  ? 'text-blue-400'
                                  : 'text-muted-foreground'
                                }
                              `}>
                                {index === 0 ? '🐋 Legendary Whale' : index === 1 ? '🥈 Alpha Whale' : index === 2 ? '🥉 Diamond Whale' : index < 10 ? '💎 Diamond Hand' : '👑 Elite Holder'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Wallet Address */}
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <code className={`
                              text-sm font-mono px-4 py-2 rounded-lg border text-foreground transition-all duration-300 group-hover:scale-105
                              ${isTopThree 
                                ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/30' 
                                : 'bg-muted/50 border-muted'
                              }
                            `}>
                              {formatWallet(holder.wallet)}
                            </code>
                            <a
                              href={`https://solscan.io/account/${holder.wallet}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-all duration-300 hover:scale-110 flex-shrink-0"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          </div>
                        </div>

                        {/* Balance */}
                        <div className="flex items-center justify-end">
                          <div className={`
                            px-6 py-3 rounded-xl text-lg font-bold border transition-all duration-300 group-hover:scale-105 relative overflow-hidden
                            ${isWhale 
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                              : isTopThree 
                              ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-400 border-blue-400/40 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                              : 'bg-green-500/10 text-green-500 border-green-500/20'
                            }
                          `}>
                            {isTopThree && (
                              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                              {formatBalance(holder.balance)} $AV
                              {isWhale && <Crown className="h-5 w-5 text-purple-400 animate-pulse" />}
                              {index === 1 && <Trophy className="h-5 w-5 text-blue-400" />}
                              {index === 2 && <Sparkles className="h-5 w-5 text-green-400" />}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    {/* Special effects for whale */}
                    {isWhale && (
                      <div className="absolute top-2 right-2">
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                          <span className="text-xs text-purple-400 font-bold">WHALE</span>
                          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse delay-150" />
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
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