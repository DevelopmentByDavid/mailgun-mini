import React from 'react';
import NextHead from 'next/head';

export default function Head() {
    return (
        <NextHead>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
            {/* <!-- Compiled and minified CSS --> */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
            />

            {/* <!-- Compiled and minified JavaScript --> */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
        </NextHead>
    );
}
