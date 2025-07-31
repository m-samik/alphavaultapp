import { useState } from 'react';
import { Shield, Key, Wallet, Coins, Settings, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ModernSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const menuItems = [
    {
      id: 'seeds',
      label: 'Seed Phrases',
      icon: Key,
      description: 'Secure seed storage',
      badge: 'Encrypted'
    },
    {
      id: 'wallets',
      label: 'Wallet Metadata',
      icon: Wallet,
      description: 'Wallet information',
      badge: 'Private'
    },
    {
      id: 'tokens',
      label: 'Token Allocations',
      icon: Coins,
      description: 'Portfolio tracking',
      badge: 'Live'
    }
  ];

  return (
    <aside className="w-64 border-r bg-card">
      <div className="p-6 space-y-6">
        {/* Security Status */}
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Vault Secured
              </p>
              <p className="text-xs text-green-700 dark:text-green-200">
                AES-256 Encryption Active
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation Menu */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Storage
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    isActive ? 'bg-primary/10 text-primary border border-primary/20' : ''
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Icon className="w-5 h-5" />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help & Support
          </Button>
        </div>
      </div>
    </aside>
  );
};