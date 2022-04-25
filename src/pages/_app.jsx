import {
  CustomMantineProvider,
  CustomQueryClientProvider,
  CustomReduxProvider,
} from '@provider/index.js';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import 'windi.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <CustomReduxProvider>
      <SessionProvider session={session}>
        <CustomQueryClientProvider>
          <CustomMantineProvider>
            <NextNProgress />
            <Component {...pageProps} />
          </CustomMantineProvider>
        </CustomQueryClientProvider>
      </SessionProvider>
    </CustomReduxProvider>,
  );
}

export default MyApp;
