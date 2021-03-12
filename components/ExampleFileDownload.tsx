import React from 'react';

export default function ExampleFileDownload() {
    return (
        <a
            className="transition-colors uppercase text-blue-400 ring-blue-400 ring-1 p-1 hover:shadow-md mb-8 rounded shadow hover:bg-blue-50"
            href="/example.csv"
        >
            Download Example file
        </a>
    );
}
