import type { AppProps } from 'next/app';
import Script from 'next/script';
// import NextNProgress from 'nextjs-progressbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <NextNProgress  /> */}
      <Script
        strategy='lazyOnload'
        src='https://www.googletagmanager.com/gtag/js?id=G-SRKFG0GY1M'
      />
      <Script
        id='google-analytics'
        strategy='lazyOnload'
      >{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-SRKFG0GY1M');`}</Script>
      <Component {...pageProps} />;
    </>
  );
}
