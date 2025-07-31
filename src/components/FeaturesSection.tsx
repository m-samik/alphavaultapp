const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-20">
      <h2 className="text-3xl font-orbitron font-bold text-vault-green mb-6">AlphaVault Features</h2>
      <ul className="space-y-4 text-vault-gray-light font-mono">
        <li>🔐 AES-256 Encrypted Seed Storage</li>
        <li>📡 On-chain Token Gating</li>
        <li>🌐 IPFS Decentralized Backup</li>
        <li>👁️‍🗨️ Privacy-first Architecture</li>
      </ul>
    </section>
  );
};

export default FeaturesSection;
