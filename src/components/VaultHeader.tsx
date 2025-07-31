import { Shield, Lock, Cpu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const VaultHeader = () => {
  return (
    <header className="relative border-b border-vault-green/20 bg-vault-dark/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Shield className="w-10 h-10 text-vault-green cyber-glow" />
              <Lock className="w-4 h-4 text-vault-cyan absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-orbitron font-bold neon-text">
                DEGEN VAULT
              </h1>
              <p className="text-xs text-vault-gray-light font-mono tracking-wider">
                ZERO-KNOWLEDGE STORAGE PROTOCOL
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-vault-green">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-mono">ENCRYPTION: ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2 text-vault-cyan">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-mono">IPFS: CONNECTED</span>
            </div>
          </div>

          {/* $VAULT Token & Wallet */}
          <div className="flex items-center space-x-4">
            <Button variant="web3" size="sm" className="hidden sm:flex">
              <span className="font-bold">$VAULT</span>
            </Button>
            <div className="wallet-adapter-button-trigger">
              <WalletMultiButton className="!bg-vault-darker !border !border-vault-green/40 !text-vault-green hover:!bg-vault-green/10 !font-mono !text-sm !rounded-sm terminal-border" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};