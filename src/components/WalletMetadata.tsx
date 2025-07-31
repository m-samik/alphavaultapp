import { useEffect, useState } from 'react';
import { Wallet, Plus, Edit3, Trash2, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface WalletMetadata {
  id: string;
  name: string;
  address: string;
  balance?: string;
  network: string;
  type: string;
  description: string;
  tags: string[];
  createdAt: Date;
}

const HELIUS_API_KEY = 'b12fadd7-ee2f-47bf-a61e-4f6e9647b8e9';
const STORAGE_KEY = 'walletMetadataList';

export const WalletMetadata = () => {
  const [wallets, setWallets] = useState<WalletMetadata[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newWallet, setNewWallet] = useState({
    name: '',
    address: '',
    network: 'Solana Mainnet',
    type: 'Phantom',
    description: '',
    tags: ''
  });

  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: WalletMetadata[] = JSON.parse(stored);
      setWallets(parsed);
      parsed.forEach(async (wallet) => {
        const bal = await fetchSolBalance(wallet.address);
        setWallets((prev) => prev.map((w) => w.id === wallet.id ? { ...w, balance: bal } : w));
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wallets.map(w => ({ ...w, balance: undefined }))));
  }, [wallets]);

  const fetchSolBalance = async (address: string) => {
    try {
      const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [address]
        })
      });
      const json = await res.json();
      const balance = json.result?.value || 0;
      return (balance / 1e9).toFixed(4) + ' SOL';
    } catch (error) {
      console.error('Balance fetch error:', error);
      return 'Error';
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({ title: 'Address copied', description: 'Wallet address copied to clipboard' });
  };

  const addWallet = () => {
    if (!newWallet.name || !newWallet.address) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }

    const wallet: WalletMetadata = {
      id: Date.now().toString(),
      name: newWallet.name,
      address: newWallet.address,
      network: newWallet.network,
      type: newWallet.type,
      description: newWallet.description,
      tags: newWallet.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date()
    };

    fetchSolBalance(newWallet.address).then((bal) => {
      wallet.balance = bal;
      setWallets(prev => [...prev, wallet]);
    });

    setNewWallet({ name: '', address: '', network: 'Solana Mainnet', type: 'Phantom', description: '', tags: '' });
    setIsAddingNew(false);
    toast({ title: 'Wallet added', description: 'Wallet metadata stored' });
  };

  const deleteWallet = (id: string) => {
    setWallets(prev => prev.filter(wallet => wallet.id !== id));
    toast({ title: 'Wallet deleted', description: 'Wallet metadata removed' });
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-vault-green neon-text">Wallet Metadata</h2>
          <p className="text-sm text-vault-gray-light font-mono mt-1">Manage wallet addresses and metadata</p>
        </div>
        <Button variant="web3" onClick={() => setIsAddingNew(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Wallet
        </Button>
      </div>

      {isAddingNew && (
        <Card className="bg-vault-dark border-vault-purple/40 terminal-border">
          <CardHeader><CardTitle className="text-vault-purple font-orbitron">Add New Wallet</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wallet-name" className="text-vault-green font-mono">Wallet Name</Label>
                <Input id="wallet-name" value={newWallet.name} onChange={(e) => setNewWallet(prev => ({ ...prev, name: e.target.value }))} className="bg-vault-darker border-vault-green/40 text-vault-green font-mono" />
              </div>
              <div>
                <Label htmlFor="wallet-type" className="text-vault-green font-mono">Wallet Type</Label>
                <Input id="wallet-type" value={newWallet.type} onChange={(e) => setNewWallet(prev => ({ ...prev, type: e.target.value }))} className="bg-vault-darker border-vault-green/40 text-vault-green font-mono" />
              </div>
            </div>
            <div>
              <Label htmlFor="wallet-address" className="text-vault-green font-mono">Wallet Address</Label>
              <Input id="wallet-address" value={newWallet.address} onChange={(e) => setNewWallet(prev => ({ ...prev, address: e.target.value }))} className="bg-vault-darker border-vault-green/40 text-vault-green font-mono" />
            </div>
            <div>
              <Label htmlFor="wallet-description" className="text-vault-green font-mono">Description</Label>
              <Textarea id="wallet-description" value={newWallet.description} onChange={(e) => setNewWallet(prev => ({ ...prev, description: e.target.value }))} className="bg-vault-darker border-vault-green/40 text-vault-green font-mono" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wallet-network" className="text-vault-green font-mono">Network</Label>
                <Input id="wallet-network" value={newWallet.network} onChange={(e) => setNewWallet(prev => ({ ...prev, network: e.target.value }))} className="bg-vault-darker border-vault-green/40 text-vault-green font-mono" />
              </div>
              <div>
                <Label htmlFor="wallet-tags" className="text-vault-green font-mono">Tags</Label>
                <Input id="wallet-tags" value={newWallet.tags} onChange={(e) => setNewWallet(prev => ({ ...prev, tags: e.target.value }))} className="bg-vault-darker border-vault-green/40 text-vault-green font-mono" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="web3" onClick={addWallet}>Add Wallet</Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="bg-vault-dark border-vault-green/40 terminal-border group hover:border-vault-green/60 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-vault-green/10 rounded-sm border border-vault-green/30">
                    <Wallet className="w-5 h-5 text-vault-green" />
                  </div>
                  <div>
                    <CardTitle className="text-vault-green font-orbitron text-lg">{wallet.name}</CardTitle>
                    <p className="text-xs text-vault-gray-light font-mono">{wallet.type} • {wallet.network}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon"><Edit3 className="w-4 h-4" /></Button>
                  <Button variant="destructive" size="icon" onClick={() => deleteWallet(wallet.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {wallet.balance && (
                <div className="flex items-center justify-between p-3 bg-vault-darker border border-vault-green/40 rounded-sm">
                  <span className="text-xs font-mono text-vault-gray-light">BALANCE</span>
                  <span className="font-mono text-vault-green font-bold">{wallet.balance}</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-vault-gray-light">ADDRESS</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => copyAddress(wallet.address)}><Copy className="w-3 h-3" /></Button>
                    <Button variant="outline" size="sm"><ExternalLink className="w-3 h-3" /></Button>
                  </div>
                </div>
                <div className="bg-vault-darker border border-vault-green/40 rounded-sm p-3 font-mono text-xs text-vault-green break-all">{wallet.address}</div>
              </div>
              {wallet.description && (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-vault-gray-light">DESCRIPTION</span>
                  <p className="text-sm text-vault-gray-light font-mono">{wallet.description}</p>
                </div>
              )}
              {wallet.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {wallet.tags.map((tag, index) => (
                    <span key={index} className="bg-vault-purple/20 text-vault-purple text-xs px-2 py-1 rounded-sm border border-vault-purple/40 font-mono">{tag}</span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {wallets.length === 0 && !isAddingNew && (
        <Card className="bg-vault-darker border-vault-gray/40 border-dashed">
          <CardContent className="p-12 text-center">
            <div className="text-vault-gray-light">
              <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-orbitron text-lg mb-2">No Wallets Added</h3>
              <p className="text-sm font-mono mb-4">Add your wallet metadata for easy management</p>
              <Button variant="web3" onClick={() => setIsAddingNew(true)}>Add Your First Wallet</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
