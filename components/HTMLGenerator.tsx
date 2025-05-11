import React from 'react';
import { Button, View } from 'react-native';
import { Platform } from 'react-native';
import { t, getFixedT } from 'i18next';

const defaultLanguge = 'en-US';

export const generateHeader = (text: string, language: string) => {
  const fixedT = getFixedT(language);
  return `
        <h1>${fixedT(text, { lng: 'en-US' })}</h1>
        <hr/>
        <h1>${t(text, language)}</h1> 
    `;
  //add lookup for the metadata file for the language and append emoji based on if the string is machine translated or human translated.
};

export const generateParagraph = (text: string, language: string) => {
  const fixedT = getFixedT(language);
  return `
            <p>${fixedT(text, { lng: 'en-US' })}</p>
            <hr/>
            <p>${t(text, language)}</p>
        `;
};

export const generateTable = () => {};

export const generateExample = () => {};

export const generateImage = () => {};

export const generateCaption = () => {};
