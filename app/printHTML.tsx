import React from 'react';
import { Button, View } from 'react-native';
import { Platform } from 'react-native';

export default function App() {
  const rat = 1.5; // Example ratio, adjust as needed
  const htmlContent = `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400&display=swap');

          @media print {
            .page-break {
              page-break-after: always;
            }
          }

          body {
            font-family: 'Lexend', Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }

          h1 {
            color: darkblue;
          }
        </style>
      </head>
      <body>
        <h1>Hello, World! ${rat}</h1>
        <p>This is a test document for printing.</p>
        <a href="#another-section">Go to Another Section</a> <!-- Internal link -->
        <div class="page-break"></div>
        <h2>New Section</h2>
        <p>This is another section that will appear on a new page when printed.</p>
        <div class="page-break"></div>
        <h2 id="another-section">Another Section</h2> <!-- Anchor target -->
        <p>This is yet another section that will appear on a new page when printed.</p>
      </body>
    </html>
  `;

  const print = () => {
    const bodyChildNodes = [...document.body.childNodes];
    document.body.innerHTML = htmlContent;
    window.print();
    document.body.innerHTML = '';
    bodyChildNodes.forEach((childNode) => document.body.appendChild(childNode));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {Platform.OS === 'web' ? (
        <Button title="Print Document" onPress={print} />
      ) : null}
    </View>
  );
}
