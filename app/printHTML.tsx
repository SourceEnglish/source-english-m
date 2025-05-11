import React from 'react';
import { Button, View } from 'react-native';
import { Platform } from 'react-native';
import { t, getFixedT } from 'i18next';

import { generateHeader, generateParagraph } from '@/components/HTMLGenerator';

export default function App() {
  // Generate the header dynamically

  const header = generateHeader('home.title', 'es-MX');
  const paragraph = generateParagraph('home.description', 'es-MX');

  const htmlContent = `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400&display=swap');

          @media print {
             @page {
      size: letter portrait;
      margin-left: 1in;
margin-right: 1in;
margin-top: 1in;
margin-bottom: 1in;
      

    }
            .page-break {
              page-break-after: always;
            }
          }
            hr {
            padding:0;
            margin: 0;
            }

          html,body {
          width: 6.5in;
            font-family: 'Lexend', Arial, sans-serif;
             font-size: 12pt;
              line-height: 1.5;
            margin: 0;
            padding: 0;
          }

    
        </style>
      </head>
      <body>
        ${generateHeader('home.title', 'es-MX')}
        ${generateParagraph('home.description', 'es-MX')} 
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
