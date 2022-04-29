import { AppShell as MantineAppShell } from '@mantine/core';
import { DoubleNavbar as MainNavbar } from '@module/MainNavbar.jsx';
import { CustomReduxProvider } from '@provider/index.js';

const AppShell = ({ children }) => {
  return (
    <MantineAppShell
      navbar={
        <CustomReduxProvider>
          <MainNavbar />
        </CustomReduxProvider>
      }
      padding={0}
    >
      {children}
    </MantineAppShell>
  );
};

export { AppShell };
