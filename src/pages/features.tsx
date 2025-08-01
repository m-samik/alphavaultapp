import { ModernHeader } from '@/components/ModernHeader';


const FeaturesSection = () => {
    const features = [
        {
            title: 'Client-Side Encryption',
            description:
                'All your sensitive data is encrypted in your browser before it ever touches the internet. We never see your keys.',
            icon: '🔐',
        },
        {
            title: 'Token-Gated Access',
            description:
                'Only users who hold the required amount of $AV tokens can unlock and interact with the vault tools.',
            icon: '🪙',
        },
        {
            title: 'Seed Phrase Manager',
            description:
                'Securely store and organize your seed phrases in a private, encrypted vault. Accessible only to you.',
            icon: '🌱',
        },
        {
            title: 'Wallet Metadata Tracker',
            description:
                'Tag, describe, and monitor wallet activity in an intuitive interface built for advanced users.',
            icon: '📊',
        },
        {
            title: 'Decentralized Storage',
            description:
                'Your vault is stored on IPFS, ensuring censorship resistance and full decentralization.',
            icon: '📡',
        },
        {
            title: 'No Backend Needed',
            description:
                'AlphaVault is a true dApp: there are no servers, no databases, and no risks of server-side breaches',
            icon: '🚫🖥️',
        },
    ];

    return (
        <div className="min-h-screen bg-background text-black">
            <ModernHeader />
            <section className="max-w-5xl mx-auto px-4 py-20">
                <h2 className="text-4xl md:text-5xl gradient-text font-orbitron font-bold text-center mb-16 text-vault-green animate-fade-in">
                    Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in-up">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="border border-vault-green/30 rounded-lg p-6 backdrop-blur bg-vault-dark/40 shadow-[0_0_20px_#a855f766] hover:scale-[1.02] transition-transform"
                        >
                            <div className="text-3xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-vault-green font-orbitron">
                                {feature.title}
                            </h3>
                            <p className="text-vault-gray-light font-mono text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <center><h1>More Features Comming Soon</h1></center>
            
        </div>
        
        
    );
};

export default FeaturesSection;
