import { Shield, Zap, Copy } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LogoAlphaVault from '@/components/logo_alphavault.svg';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const ModernWelcome = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        {/* Logo and Headings */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex justify-center mb-6">
            <img
              src={LogoAlphaVault}
              alt="AlphaVault Logo"
              className="w-28 sm:w-36 md:w-40 h-auto object-contain animate-bounce"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold gradient-text mb-4">
            Welcome to ALPHA VAULT
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3">
            Secure. Decentralized. Private.
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Zero-Knowledge • Client-Side Encryption
              </Badge>
              <Badge variant="outline" className="bg-yellow-100 border-purple-500 text-black border-yellow-100">
                Built on Solana ⚡
              </Badge>
            </div>

            {/* Animated Gradient CA Box */}
            <div className="relative mt-2 flex flex-col items-center">
              <div className="inline-flex items-center px-4 py-[6px] rounded-full text-white font-mono text-sm border border-white/20 shadow-md animate-gradient bg-gradient-to-r from-purple-600 via-green-400 to-purple-500">
                <span className="mr-2 font-semibold">CA :</span>
                <span className="mr-3">{contractAddress}</span>
                <button
                  onClick={handleCopy}
                  className="bg-white text-purple-700 p-1.5 rounded-full hover:bg-purple-200 transition-all"
                  title="Copy CA"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copied && (
                <span className="absolute -bottom-6 text-xs text-green-400 font-medium">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-10 sm:mb-12">
          {/* Security Card */}
          <Card className="web3-shadow">
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-3" />
                Military-Grade Security
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3" />AES-256 client-side encryption</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3" />Wallet signature authentication</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3" />Zero-knowledge architecture</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3" />IPFS distributed storage</li>
              </ul>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card className="web3-shadow">
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-vault-purple mr-3" />
                Key Features
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />Secure seed phrase storage</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />Wallet metadata manager</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />File uploads & encryption</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />Token allocations</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />$AV token integration</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-vault-purple/10 border border-primary/20 web3-shadow-xl">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4">
              Connect Your Wallet to Begin
            </h3>
            <p className="text-muted-foreground mb-5 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Your wallet signature serves as your encryption key. Only you can access your stored data — no intermediaries, no compromise.
            </p>
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-primary !text-white !rounded-lg !text-sm sm:!text-base !font-semibold hover:!bg-primary/90" />
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="pt-8 sm:pt-10 text-xs sm:text-sm text-vault-gray-light opacity-60 font-mono text-center">
          Made with ❤️ on Solana — Powered by $AV
        </div>
      </div>
    </div>
  );
};
