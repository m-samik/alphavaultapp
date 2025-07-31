import { Shield, Lock, Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoAlphaVault from '@/components/logo_alphavault.svg';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';



export const ModernWelcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img src={LogoAlphaVault} alt="AlphaVault Logo" className="w-40 h-40 object-contain" />
            </div>
          </div>
          <h1 className="text-4xl font-heading font-bold gradient-text mb-4">
            Welcome to ALPHA VAULT
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Secure, Decentralized Web3 Storage Protocol
          </p>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Zero-Knowledge • Client-Side Encryption
          </Badge>
          &nbsp;
          <br></br>
          <Badge variant="outline" className="bg-green-50 gradient-text border-green-800">
            CA to be posted
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="web3-shadow">
            <CardContent className="p-8">
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                <Shield className="w-6 h-6 text-primary mr-3" />
                Military-Grade Security
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  AES-256 client-side encryption
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Wallet signature authentication
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Zero-knowledge architecture
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  IPFS distributed storage
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="web3-shadow">
            <CardContent className="p-8">
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                <Zap className="w-6 h-6 text-blue-500 mr-3" />
                Key Features
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Secure seed phrase storage
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Wallet metadata management
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Token allocation tracking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  $AV token integration
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20 web3-shadow-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Connect Your Wallet to Begin
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Your wallet signature serves as your encryption key. Only you can access your stored data,
              ensuring complete privacy and security in a trustless environment.
            </p>
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-primary !text-primary-foreground !border-100 !rounded-md !font-medium !text-sm hover:!bg-primary/90 !transition-all !duration-200" />

            </div>
          </CardContent>
        </Card>
        <footer className="w-full text-center py-6 text-sm text-gray-500">
          <p>
            🔓 We’re open source —{' '}
            <a
              href="https://github.com/m-samik/alphavaultapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              view our code on GitHub
            </a>
          </p>
        </footer>

      </div>
    </div>
  );
};