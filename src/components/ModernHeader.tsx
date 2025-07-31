import { Shield, Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import LogoAlphaVault from '@/components/logo_alphavault.svg';

export const ModernHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center">
            <img src={LogoAlphaVault} alt="AlphaVault Logo" className="w-10 h-10 object-contain" />
            <div className="ml-2">
              <h1 className="text-lg font-heading font-bold gradient-text">ALPHA VAULT</h1>
              <p className="text-[10px] text-muted-foreground leading-none">Secure Web3 Storage</p>
            </div>
          </a>
        </div>

        {/* Desktop Nav */}
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

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Button variant="web3" size="sm" className="hidden sm:flex">
            <span className="text-lg px-6 py-3 animate-pulse shadow-vault-green shadow-md">$AV</span>
          </Button>
          <div className="hidden sm:block">
            <WalletMultiButton className="!bg-primary !text-white !rounded-md !font-medium !text-sm hover:!bg-primary/90 transition-all duration-200" />
          </div>
          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background px-4 pb-4 pt-2 border-t">
          <nav className="flex flex-col space-y-2">
            <a href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="/security" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Security
            </a>
            <a href="/whitepaper_alphavault.pdf" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Whitepaper
            </a>
            <WalletMultiButton className="!bg-primary !text-white !rounded-md !font-medium !text-sm hover:!bg-primary/90 transition-all duration-200 mt-3" />
          </nav>
        </div>
      )}
    </header>
  );
};
