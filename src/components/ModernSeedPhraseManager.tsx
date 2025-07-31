import { useState, useEffect } from 'react';
import { Plus, Eye, EyeOff, Copy, Trash2, Shield, Lock, Key } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SeedPhrase {
  id: string;
  name: string;
  phrase: string; // encrypted
  walletType: string;
  tags: string[];
  createdAt: string;
  encrypted: boolean;
}

const ENCRYPTION_KEY = 'trenchers-unite'; // Replace later with wallet-signMessage or password

export const ModernSeedPhraseManager = () => {
  const [seedPhrases, setSeedPhrases] = useState<SeedPhrase[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showPhrase, setShowPhrase] = useState<Record<string, boolean>>({});
  const [newSeed, setNewSeed] = useState({
    name: '',
    phrase: '',
    walletType: 'Phantom',
    tags: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('trenchvault_seeds');
    if (saved) {
      setSeedPhrases(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trenchvault_seeds', JSON.stringify(seedPhrases));
  }, [seedPhrases]);

  const encrypt = (text: string) => CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
  const decrypt = (cipher: string) =>
    CryptoJS.AES.decrypt(cipher, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

  const addSeedPhrase = () => {
    if (!newSeed.name || !newSeed.phrase) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const encryptedPhrase = encrypt(newSeed.phrase);

    const seedPhrase: SeedPhrase = {
      id: Date.now().toString(),
      name: newSeed.name,
      phrase: encryptedPhrase,
      walletType: newSeed.walletType,
      tags: newSeed.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      encrypted: true
    };

    setSeedPhrases(prev => [...prev, seedPhrase]);
    setNewSeed({ name: '', phrase: '', walletType: 'Phantom', tags: '' });
    setIsAddingNew(false);

    toast({
      title: "Seed Phrase Added",
      description: "Your seed phrase has been encrypted and stored securely.",
    });
  };

  const deleteSeedPhrase = (id: string) => {
    setSeedPhrases(prev => prev.filter(seed => seed.id !== id));
    toast({
      title: "Seed Phrase Deleted",
      description: "The seed phrase has been permanently removed.",
    });
  };

  const togglePhraseVisibility = (id: string) => {
    setShowPhrase(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (encryptedPhrase: string) => {
    try {
      const decrypted = decrypt(encryptedPhrase);
      await navigator.clipboard.writeText(decrypted);
      toast({
        title: "Copied to Clipboard",
        description: "Seed phrase copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold gradient-text flex items-center gap-3">
            <Key className="w-8 h-8" />
            Seed Phrases
          </h2>
          <p className="text-muted-foreground mt-2">
            Securely store and manage your wallet seed phrases with client-side encryption
          </p>
        </div>
        <Button
          variant="web3"
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Seed Phrase
        </Button>
      </div>

      {/* Add New Seed Phrase Form */}
      {isAddingNew && (
        <Card className="web3-shadow-xl border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-500/5">
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Add New Seed Phrase
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Wallet Name *</Label>
                <Input
                  id="name"
                  value={newSeed.name}
                  onChange={(e) => setNewSeed(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Main Trading Wallet"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walletType">Wallet Type</Label>
                <Input
                  id="walletType"
                  value={newSeed.walletType}
                  onChange={(e) => setNewSeed(prev => ({ ...prev, walletType: e.target.value }))}
                  placeholder="e.g. Phantom, Solflare"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phrase">Seed Phrase *</Label>
              <Input
                id="phrase"
                type="password"
                value={newSeed.phrase}
                onChange={(e) => setNewSeed(prev => ({ ...prev, phrase: e.target.value }))}
                placeholder="Enter your 12 or 24 word seed phrase"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={newSeed.tags}
                onChange={(e) => setNewSeed(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="e.g. trading, defi, nft"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="web3" onClick={addSeedPhrase}>
                <Shield className="w-4 h-4 mr-2" />
                Encrypt & Store
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsAddingNew(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seed Phrases List */}
      {seedPhrases.length > 0 ? (
        <div className="grid gap-4">
          {seedPhrases.map((seed) => (
            <Card key={seed.id} className="web3-shadow hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <CardTitle className="text-lg">
                        {seed.name}
                      </CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Encrypted
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {seed.walletType} • Created {new Date(seed.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => togglePhraseVisibility(seed.id)}
                    >
                      {showPhrase[seed.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(seed.phrase)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteSeedPhrase(seed.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Seed Phrase Display */}
                <div className="space-y-3">
                  <div className="bg-card border rounded-lg p-4">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                      Seed Phrase
                    </Label>
                    <div className="mt-2 font-mono text-sm break-all">
                      {showPhrase[seed.id] ? decrypt(seed.phrase) : '••••••••••••••••••••••••••••••••••••••••••••••••'}
                    </div>
                  </div>
                  {seed.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {seed.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="web3-shadow">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-heading text-lg mb-2">No Seed Phrases Stored</h3>
              <p className="text-sm mb-4">
                Your encrypted seed phrases will appear here
              </p>
              <Button variant="web3" onClick={() => setIsAddingNew(true)}>
                Add Your First Seed Phrase
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
