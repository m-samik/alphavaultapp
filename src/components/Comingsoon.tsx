import { ModernHeader } from "@/components/ModernHeader";
import { Rocket, Sparkles, Construction, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const Comingsoon = () => {
  return (
    <div className="min-h-screen bg-background text-black flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-3xl text-center space-y-8 animate-fade-in-up">
          <div className="flex justify-center">
            <Rocket className="w-16 h-16 text-vault-purple animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-5xl font-orbitron font-bold text-vault-purple drop-shadow-glow">
            Something Big is Brewing ☕
          </h1>
          <p className="text-vault-gray-light font-mono text-lg">
            AlphaVault is evolving. More powerful features are in development and will be unlocked exclusively for $AV holders.
            <br />
            We’re building encrypted file vaults, biometric access, auto-sync with hardware wallets — and that’s just the beginning.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button variant="web3" size="lg" className="shadow-vault-purple animate-pulse">
              <Construction className="mr-2 w-4 h-4" />
              Under Development
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="border border-vault-purple/50 text-vault-purple hover:bg-vault-purple/10"
              asChild
            >
              <a href="/features">
                <Sparkles className="mr-2 w-4 h-4" />
                See Current Features
              </a>
            </Button>
          </div>

          <div className="pt-10 text-xs text-vault-gray-light opacity-50 font-mono">
            Made with ❤️ on Solana — Powered by $AV
          </div>
        </div>
      </main>
    </div>
  );
};

export default Comingsoon;
