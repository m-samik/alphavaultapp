import { Shield, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import LogoAlphaVault from '@/components/logo_alphavault.svg';

export const ModernHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="relative">

            <a href="/" className="flex items-center">
              <img
                src={LogoAlphaVault}
                alt="AlphaVault Logo"
                className="w-12 h-12 object-contain"
              />
            </a>

          </div>
          <div>
            <h1 className="text-xl font-heading font-bold gradient-text">
              ALPHA VAULT
            </h1>
            <p className="text-xs text-muted-foreground">
              Secure Web3 Storage
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="/security" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Security
          </a>
          <a href="/whitepaper_alphavault.pdf" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Whitepaper
          </a>
        </nav>

        {/* $VAULT Token & Wallet */}
        <div className="flex items-center space-x-4">
          <Button variant="web3" size="sm" className="hidden sm:flex">
            <span className="text-lg px-6 py-3 animate-pulse shadow-vault-green shadow-md">$AV</span>
          </Button>
          <div className="wallet-adapter-button-trigger">
            <WalletMultiButton className="!bg-primary !text-primary-foreground !border-100 !rounded-md !font-medium !text-sm hover:!bg-primary/90 !transition-all !duration-200" />
          </div>
        </div>
      </div>
    </header>
  );
};