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
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { Button } from '@/components/ui/button';



const TOKEN_MINT_ADDRESS = new PublicKey('AhBxUsbkoRW1hPpX7eNGtHFLxRnC7y7XZAcBNuY2bonk');
const MIN_REQUIRED_TOKENS = 40000;
const TOKEN_DECIMALS = 9; // Adjust if different

const VaultContent = () => {
  const [activeSection, setActiveSection] = useState('seeds');
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

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
      case 'comingsoon':
        return <Comingsoon />;
      default:
        return <Fileupload />;
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
        <div className="mt-16 max-w-2xl border border-vault-green/30 rounded-xl shadow-[0_0_25px_#00ff9533] p-8">
          <h2 className="text-5xl font-orbitron font-bold text-vault-green mb-6 animate-bounce">
            Access Denied 🚫
          </h2>
          <p className="text-vault-gray-light font-mono text-base leading-relaxed mb-8 animate-fade-in-up">
            This app is exclusively available to $AV holders. To unlock its full functionality,
            you must hold at least <strong>1M $AV</strong> tokens . <br />
          </p>
          <a href="https://raydium.io/swap" target="_blank" rel="noopener noreferrer">
            <Button variant="web3" className="text-lg px-6 py-3 animate-pulse shadow-vault-green shadow-md">
              Buy $AV Token
            </Button>
          </a>
        </div>
        <div className="absolute bottom-6 text-xs text-vault-gray-light font-mono opacity-60 animate-fade-in-up">
          Powered by Solana ✦ Vault Protocol
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
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
      {/* <footer className="w-full text-center py-6 text-sm text-gray-500">
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
      </footer> */}



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
