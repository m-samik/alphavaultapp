import { Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import LogoAlphaVault from '@/components/logo_alphavault.svg';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';

export const ModernWelcome = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src={LogoAlphaVault} alt="AlphaVault Logo" className="w-40 h-40 object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Welcome to ALPHA VAULT
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Secure. Decentralized. Private.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-300">
                Zero-Knowledge • Client-Side Encryption
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                CA to be posted
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                Built on Solana ⚡
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border border-violet-200 shadow-md backdrop-blur bg-white/60">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Shield className="w-5 h-5 text-primary mr-2" />
                  Military-Grade Security
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>AES-256 client-side encryption</li>
                  <li>Wallet signature authentication</li>
                  <li>Zero-knowledge architecture</li>
                  <li>IPFS distributed storage</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-cyan-200 shadow-md backdrop-blur bg-white/60">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Zap className="w-5 h-5 text-blue-500 mr-2" />
                  Key Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>Secure seed phrase storage</li>
                  <li>Wallet metadata manager</li>
                  <li>File uploads & encryption</li>
                  <li>Token allocations</li>
                  <li>$AV token integration</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/30 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Connect Your Wallet to Begin</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your wallet signature is your encryption key. Only you can access your data — no middlemen, no compromises.
              </p>
              <WalletMultiButton className="!bg-primary !text-white !rounded-md !text-sm px-6 py-2 hover:!bg-primary/90 transition" />
            </CardContent>
          </Card>

          <div className="pt-10 text-xs text-gray-400 text-center font-mono opacity-70">
            Made with ❤️ on Solana — Powered by $AV

          </div>
        </div>
      </div>
    </div>
  );
};