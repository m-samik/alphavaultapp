import { ModernHeader } from '@/components/ModernHeader';

const securityFeatures = [
    {
        title: 'Client-Side Encryption',
        description:
            'Your sensitive data is encrypted locally on your device using AES-256 before it ever touches our servers. Only you hold the decryption key.',
    },
    {
        title: 'Token-Gated Access',
        description:
            'Only wallets holding the required amount of $AV tokens can unlock access, ensuring a community of trusted users.',
    },
    {
        title: 'IPFS Distributed Storage',
        description:
            'All vault data is stored across the InterPlanetary File System (IPFS), removing centralized points of failure.',
    },
    {
        title: 'Immutable Logs',
        description:
            'Every vault activity is recorded in tamper-proof logs, ensuring full transparency and accountability.',
    },
    {
        title: 'No Middlemen, No Surveillance',
        description:
            'AlphaVault is 100% decentralized. No third parties. No hidden data collection. You own and control everything',
    },
];

const SecuritySection = () => {
    return (
        <div className="min-h-screen bg-background text-black">
            <ModernHeader />
            <div className="max-w-5xl mx-auto mt-12">
                <h1 className="text-4xl font-bold gradient-text font-orbitron text-center text-vault-green mb-8">
                    Security at AlphaVault 🔐
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {securityFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="border border-vault-green/30 rounded-lg p-6 backdrop-blur bg-vault-dark/40 shadow-[0_0_20px_#a855f766] hover:scale-[1.02] transition-transform"
                        >
                            <h3 className="text-xl font-semibold text-vault-purple mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-vault-gray-light font-mono">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecuritySection;
