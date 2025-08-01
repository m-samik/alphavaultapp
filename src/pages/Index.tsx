import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletProviderWrapper } from '@/components/WalletProvider';
import { Fileupload } from '@/components/Fileupload';
import Comingsoon from '@/components/Comingsoon';
import { ModernHeader } from '@/components/ModernHeader';
import { ModernSidebar } from '@/components/ModernSidebar';
import { ModernWelcome } from '@/components/ModernWelcome';
import { ModernSeedPhraseManager } from '@/components/ModernSeedPhraseManager';
import { WalletMetadata } from '@/components/WalletMetadata';
import { TokenAllocations } from '@/components/TokenAllocations';
import Groupchat from '@/components/GroupChat';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { Button } from '@/components/ui/button';

const TOKEN_MINT_ADDRESS = new PublicKey('Arz4FEoHgmYFGqkpQYhTUGjvHGoahJbtzTUqFeJLbonk');
const MIN_REQUIRED_TOKENS = 100000;
const TOKEN_DECIMALS = 9; // Adjust if different

const VaultContent = () => {
  const [activeSection, setActiveSection] = useState('files');
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const { connected, publicKey } = useWallet();
  const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=b12fadd7-ee2f-47bf-a61e-4f6e9647b8e9');

  useEffect(() => {
    const checkTokenAccess = async () => {
      if (!publicKey) return;

      try {
        const ata = await getAssociatedTokenAddress(TOKEN_MINT_ADDRESS, publicKey);
        const tokenBalance = await connection.getTokenAccountBalance(ata);
        const tokenAmount = tokenBalance.value.uiAmount || 0;
        console.log("Token Amount:", tokenAmount);

        setHasAccess(tokenAmount >= MIN_REQUIRED_TOKENS);
      } catch (error) {
        console.error('Token access check failed:', error);
        setHasAccess(false);
      } finally {
        setCheckingAccess(false);
      }
    };

    if (connected && publicKey) {
      checkTokenAccess();
    }
  }, [connected, publicKey]);

  const renderSection = () => {
    switch (activeSection) {
      case 'files':
        return <Fileupload />;
      case 'seeds':
        return <ModernSeedPhraseManager />;
      case 'wallets':
        return <WalletMetadata />;
      case 'tokens':
        return <TokenAllocations />;
      case 'groupchat':
        return <Groupchat/>;
      case 'comingsoon':
        return <Comingsoon />;
      default:
        return <Fileupload />;
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen">
        <ModernHeader />
        <ModernWelcome />
      </div>
    );
  }

  if (checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Checking token balance...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center min-h-screen text-center px-6 animate-fade-in">  
        <ModernHeader />
        <div className="mt-20 max-w-2xl w-full bg-white/5 border border-vault-green/30 backdrop-blur-md rounded-3xl shadow-[0_0_35px_#00ff9580] p-8 sm:p-10 space-y-6 transition-all">
          <h2 className="text-4xl sm:text-5xl font-orbitron font-bold text-vault-green tracking-tight animate-pulse">
            Access Denied <span className="ml-2 text-red-500">🚫</span>
          </h2>
          <p className="text-vault-gray-light text-sm sm:text-base font-mono leading-relaxed animate-fade-in-up">
            This app is exclusively available to <span className="font-bold">$AV</span> holders.
            <br className="hidden sm:block" />
            To unlock full functionality, you must hold at least <strong>100,000 $AV</strong> tokens.
          </p>
          <a
            href="https://axiom.trade/meme/Arz4FEoHgmYFGqkpQYhTUGjvHGoahJbtzTUqFeJLbonk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              variant="web3"
              className="text-lg px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 animate-glow"
            >
              🚀 Buy $AV Token Now
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-2 font-mono italic">
            Holding $AV grants you full access to private, secure vault features.
          </p>
        </div>
        <div className="absolute bottom-6 text-xs text-vault-gray-light font-mono opacity-60 animate-fade-in-up">
          Made with ❤️ on Solana — Powered by $AV
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <div className="flex justify-end p-4">
        <button
          onClick={toggleDarkMode}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 py-2 rounded-full font-bold shadow-xl border border-yellow-300 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
        >
          🌗 Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      <div className="flex">
        <ModernSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 p-6">
          {renderSection()}
          <div className="pt-10 text-xs text-vault-gray-light opacity-50 font-mono text-center">
            Made with ❤️ on Solana — Powered by $AV
          </div>
        </main>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <WalletProviderWrapper>
      <VaultContent />
    </WalletProviderWrapper>
  );
};

export default Index;
