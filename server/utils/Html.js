/* eslint-disable react/no-danger*/
import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';

function Html({ content, state, scriptHash, vendorHash, cssHash, styles }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Personly - Invest in the future</title>
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1074379859491729408/Bkl1xAGr_bigger.jpg" type="image/png" sizes="16x16" />
        <meta name="title" content="Personly - Invest in the future" />
        <meta name="description" content="" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://personly.app/" />
        <meta property="og:title" content="Personly - Invest in the future" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1518600506278-4e8ef466b810?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=858391bd28bf4aadaa5b3e0750edb485&auto=format&fit=crop&w=1293&q=80" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://personly.app/" />
        <meta property="twitter:title" content="Personly - Invest in the future" />
        <meta property="twitter:description" content="" />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1518600506278-4e8ef466b810?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=858391bd28bf4aadaa5b3e0750edb485&auto=format&fit=crop&w=1293&q=80" />
        <script src="https://js.stripe.com/v3/"></script>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,700|Raleway:400,300,700|Lato:400,300,700" rel="stylesheet" type="text/css" />
        <link href={`${cssHash}`} rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>

        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${serialize(state, { isJSON: true })};`,
          }}
          charSet="UTF-8"
        />
        <script src={`${scriptHash}`} charSet="UTF-8" />
        <script src={`${vendorHash}`} type="text/javascript" />
      </body>
    </html>
  );
}

Html.propTypes = {
  scriptHash: PropTypes.string.isRequired,
  cssHash: PropTypes.string.isRequired,
  vendorHash: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  styles: PropTypes.string,
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Html;
