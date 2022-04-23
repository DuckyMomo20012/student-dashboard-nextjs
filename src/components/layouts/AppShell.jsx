import { AppShell as MantineAppShell } from '@mantine/core';
import { DoubleNavbar as MainNavbar } from '@module/MainNavbar.jsx';
import { CustomReduxProvider } from '@provider/index.js';

const AppShell = ({ children }) => {
  return (
    <MantineAppShell
      padding={0}
      navbar={
        <CustomReduxProvider>
          <MainNavbar />
        </CustomReduxProvider>
      }
    >
      {children}
    </MantineAppShell>
  );
};

export { AppShell };
