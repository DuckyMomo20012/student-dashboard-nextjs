import 'windi.css';

import { CustomMantineProvider } from '@provider/CustomMantineProvider.jsx';
import { CustomQueryClientProvider } from '@provider/CustomQueryClientProvider.jsx';

function MyApp({ Component, pageProps }) {
  return (
    <CustomQueryClientProvider>
      <CustomMantineProvider>
        <Component {...pageProps} />
      </CustomMantineProvider>
    </CustomQueryClientProvider>
  );
}

export default MyApp;
