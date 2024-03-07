import Head from 'next/head';

import Logo from "@/public/MovieDogLogo.png"
import { Fragment } from 'react';

interface MetaProps {
  title: string;
  description: string;
  url: string;
}
const Meta = ({ title, description, url }: MetaProps) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={Logo.src} />
        <meta property="og:article:author" content="년도별 페이지" />
      </Head>
    </Fragment>
  );
};


export default Meta;