import { useState } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  onNavigateHome: () => void;
  onSearch: (query: string) => void;
}

export const Header = ({ onNavigateHome, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/40"
      style={{ 
        background: 'var(--header-bg)',
        boxShadow: '0 6px 20px hsl(var(--primary) / 0.25)'
      }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <h1 
          className="text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:drop-shadow-lg"
          style={{ 
            color: 'hsl(var(--magical))',
            textShadow: '0 2px 10px hsl(var(--magical) / 0.3)',
            padding: '0.5rem 1.5rem',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, hsl(var(--magical) / 0.1), hsl(var(--magical) / 0.05))',
            border: '2px solid hsl(var(--magical) / 0.2)',
            backdropFilter: 'blur(10px)'
          }}
          onClick={onNavigateHome}
        >
          مـنـصـة DHS
        </h1>
        
        <div className="flex-1 flex items-center gap-3 max-w-md">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن مدرس..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 pr-12 text-right bg-card/80 border-border/60 focus:border-primary/60"
              dir="rtl"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button 
            onClick={handleSearch}
            className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            بحث
          </Button>
        </div>

        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className="h-12 w-12 border-border/60 bg-card/80 hover:bg-accent/80"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};