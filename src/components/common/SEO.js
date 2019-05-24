import React from 'react';
import Helmet from 'react-helmet';

const SEO_DATA = {
  description: 'React Ladies is a supportive community for women and non-binary ReactJS enthusiasts to grow as technologists and meet other ReactJS developers.',
  title: 'React Ladies',
  url: 'www.reactladies.com',
  author: 'Monica Powell',
  keywords: ['gatsby', 'site'],
  twitter: {
    id: '@waterproofheart',
    img: 'src/images/team/React-icon.png',
  },
};

const SEO = () => {
  return (
    <Helmet>
      <meta property="og:title" content={SEO_DATA.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SEO_DATA.url} />
      <meta property="og:image" content={SEO_DATA.twitter.img} />
      <meta property="og:description" content={SEO_DATA.description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@hackinoutco" />
      <meta name="twitter:site" content="@hackinoutco" />
      <meta name="twitter:title" content={SEO_DATA.title} />
      <meta name="twitter:description" content={SEO_DATA.description} />
      <meta name="twitter:domain" content={SEO_DATA.url} />
      <meta name="twitter:image:src" content={SEO_DATA.img} />

      <meta name="description" content={SEO_DATA.description} />
      <meta name="keywords" content={SEO_DATA.keywords.join(', ')} />
      <meta name="author" content={SEO_DATA.author} />
      <title>{SEO_DATA.title}</title>
      <html lang="en" />
    </Helmet>
  );
};

export default SEO;
