import { ModernHeader } from "@/components/ModernHeader";
import { Users, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Groupchat = () => {
  return (
    <div className="top-100 min-h-screen bg-background text-black flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl text-center space-y-8 animate-fade-in-up">
          <div className="flex justify-center">
            <Users className="w-16 h-16 text-vault-green animate-bounce" />
          </div>

          <h1 className="text-5xl font-orbitron font-bold text-vault-green drop-shadow-glow">
            Holder-Only Group Chat 💬
          </h1>

          <p className="text-vault-gray-light font-mono text-lg">
            Talk wallet-to-wallet with other <strong>Alphavaultians</strong>. This is your encrypted hangout built for $AV holders.
            <br />
            Decentralized identity meets real-time conversations — no signups, just wallet power.
          </p>

          <div className="rounded-2xl overflow-hidden border border-vault-green/20 shadow-[0_0_25px_#00ff9580]">
            <iframe
              src="https://deadsimplechat.com/1923YDGat"
              title="AlphaVault Group Chat"
              width="100%"
              height="500"
              className="rounded-none"
            />
          </div>

          <div className="flex justify-center pt-6">
            <Button
              variant="ghost"
              size="lg"
              className="border border-vault-green/50 text-vault-green hover:bg-vault-green/10"
              asChild
            >
              <a href="/features">
                <Sparkles className="mr-2 w-4 h-4" />
                Explore All Vault Features
              </a>
            </Button>
          </div>

          
        </div>
      </main>
    </div>
  );
};

export default Groupchat;
