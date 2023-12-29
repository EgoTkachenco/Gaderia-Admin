import React from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { Switch } from '@nextui-org/react';

export const DarkModeSwitch = () => {
  const { setTheme, theme } = useNextTheme();
  return (
    <Switch
      isSelected={theme === 'dark' ? true : false}
      onValueChange={(e) => setTheme(e ? 'dark' : 'light')}
    >
      <div className="text-sm whitespace-nowrap">
        {theme === 'dark' ? 'Темна' : 'Світла'} тема
      </div>
    </Switch>
  );
};
