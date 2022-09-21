import Script from 'next/script';
import { AppWrapper } from '../Hooks/useAppContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <AppWrapper>
    <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

    <Script strategy="lazyOnload" id='google'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
    </Script>
    <Component {...pageProps} />
  </AppWrapper>;
}

export default MyApp;
