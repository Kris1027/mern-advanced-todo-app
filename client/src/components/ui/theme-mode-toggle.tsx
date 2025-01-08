import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Theme = 'light' | 'dark' | 'system';

const THEMES = {
    light: { label: 'Light', icon: Sun },
    dark: { label: 'Dark', icon: Moon },
    system: { label: 'System', icon: Monitor },
} as const;

const ICON_SIZE = 'h-[1.2rem] w-[1.2rem]';
const TRANSITION = 'rotate-0 scale-100 transition-all';

const ThemeModeToggle = () => {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' aria-label='Toggle theme'>
                    <Sun className={`${ICON_SIZE} ${TRANSITION} dark:-rotate-90 dark:scale-0`} />
                    <Moon
                        className={`absolute ${ICON_SIZE} rotate-90 scale-0 ${TRANSITION} dark:rotate-0 dark:scale-100`}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {Object.entries(THEMES).map(([themeKey, { label }]) => (
                    <DropdownMenuItem
                        key={themeKey}
                        onClick={() => setTheme(themeKey as Theme)}
                        className={theme === themeKey ? 'bg-accent' : ''}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeModeToggle;
