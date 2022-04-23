import {
  CustomMantineProvider,
  CustomQueryClientProvider,
  CustomReduxProvider,
} from '@provider/index.js';
import 'windi.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <CustomReduxProvider>
      <CustomQueryClientProvider>
        <CustomMantineProvider>
          <Component {...pageProps} />
        </CustomMantineProvider>
      </CustomQueryClientProvider>
    </CustomReduxProvider>,
  );
}

export default MyApp;
