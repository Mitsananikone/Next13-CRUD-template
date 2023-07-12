import { Html, Head, Main, NextScript } from 'next/document'

export default Document;

function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" /> */}
            </Head>

            <body>
                <Main />
                <NextScript />

                {/* credits */}
                <div className="flex items-center justify-center mx-auto w-3/5 absolute bottom-0 left-0 right-0">
                    <p>
                        <a href="https://jasonwatmore.com/next-js-13-mongodb-user-registration-and-login-tutorial-with-example-app" target="_top">Phoenique Life</a>
                    </p>
                    
                    {/* <p style={{display: 'inline-block'}}>
                        <a href="https://jasonwatmore.com" target="_top">Mitsananikone2023</a>
                    </p> */}
                </div>
            </body>
        </Html>
    );
}
