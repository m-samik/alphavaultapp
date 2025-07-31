import { Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoAlphaVault from '@/components/logo_alphavault.svg';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const ModernWelcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative animate-bounce">
              <img
                src={LogoAlphaVault}
                alt="AlphaVault Logo"
                className="w-32 sm:w-36 md:w-40 h-auto object-contain"
              />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-4 animate-fade-in">
            Welcome to ALPHA VAULT
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-3">
            Secure. Decentralized. Private.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Zero-Knowledge • Client-Side Encryption
            </Badge>
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
              CA to be posted
            </Badge>
            <Badge variant="outline" className="bg-yellow-100 border-purple-500 text-black-200">
              Built on Solana ⚡
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card className="web3-shadow">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                <Shield className="w-6 h-6 text-primary mr-3" />
                Military-Grade Security
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3" /> AES-256 client-side encryption
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3" /> Wallet signature authentication
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3" /> Zero-knowledge architecture
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3" /> IPFS distributed storage
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="web3-shadow">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                <Zap className="w-6 h-6 text-vault-purple mr-3" />
                Key Features
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" /> Secure seed phrase storage
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" /> Wallet metadata manager
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" /> File uploads & encryption
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" /> Token allocations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" /> $AV token integration
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-vault-purple/10 border border-primary/20 web3-shadow-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Connect Your Wallet to Begin
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm">
              Your wallet signature serves as your encryption key. Only you can access your stored data — no intermediaries, no compromise.
            </p>
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-primary !text-white !rounded-lg !text-sm !font-semibold hover:!bg-primary/90" />
            </div>
          </CardContent>
        </Card>

        <div className="pt-10 text-xs text-vault-gray-light opacity-60 font-mono text-center">
          Made with ❤️ on Solana — Powered by $AV
        </div>
      </div>
    </div>
  );
};
