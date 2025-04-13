import React from 'react';
import { Button, View, Platform } from 'react-native';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';

type Section = {
  order: number;
  text?: string;
  image?: boolean;
  src__?: string;
  alt?: string;
  caption?: string;
  blockquotes?: boolean;
  children?: Record<string, Section>;
  unorderedList?: boolean;
  listItems?: Record<string, { text: string; order: number }>;
  link?: boolean;
  url__?: string;
};

type Lesson = {
  order: number;
  title: string;
  sections: Record<string, Section>;
};

type LessonsData = {
  lessons: Record<string, Lesson>;
};

async function generatePdf(data: LessonsData): Promise<void> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a page to the document
  const page = pdfDoc.addPage([600, 800]);
  const { height } = page.getSize();

  // Embed a font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Helper function to draw text
  const drawText = (
    text: string,
    x: number,
    y: number,
    size = 12,
    options: { color?: [number, number, number] } = {}
  ) => {
    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: options.color ? rgb(...options.color) : rgb(0, 0, 0),
    });
  };

  // Start adding content from JSON
  let yPosition = height - 50; // Start from the top of the page
  const lesson = data.lessons.letters;

  // Add the lesson title
  drawText(lesson.title, 50, yPosition, 24, { color: [0, 0.53, 0.71] });
  yPosition -= 40;

  // Process sections
  const sections = Object.values(lesson.sections).sort(
    (a, b) => a.order - b.order
  );
  for (const section of sections) {
    if (section.text) {
      drawText(section.text, 50, yPosition, 12);
      yPosition -= 50;
    }

    if (section.image) {
      drawText(`[Image: ${section.alt}]`, 50, yPosition, 12, {
        color: [0.5, 0.5, 0.5],
      });
      yPosition -= 30;
    }

    if (section.blockquotes) {
      drawText(`"${section.text}"`, 50, yPosition, 12, {
        color: [0.2, 0.2, 0.2],
      });
      yPosition -= 40;

      if (section.children) {
        const children = Object.values(section.children).sort(
          (a, b) => a.order - b.order
        );
        for (const child of children) {
          drawText(`- ${child.text}`, 70, yPosition, 10, {
            color: [0.4, 0.4, 0.4],
          });
          yPosition -= 30;
        }
      }
    }

    if (section.unorderedList) {
      const items = Object.values(section.listItems || {}).sort(
        (a, b) => a.order - b.order
      );
      for (const item of items) {
        drawText(`• ${item.text}`, 50, yPosition, 12);
        yPosition -= 20;
      }
    }

    if (section.link) {
      drawText(`${section.text} (${section.url__})`, 50, yPosition, 12, {
        color: [0, 0, 1],
      });
      yPosition -= 30;
    }
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();

  if (Platform.OS === 'web') {
    // Web: Trigger browser download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'lesson.pdf';
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } else {
    // Native: Save and optionally share
    const base64Pdf = uint8ToBase64(pdfBytes);
    const path = `${FileSystem.cacheDirectory}lesson.pdf`;

    await FileSystem.writeAsStringAsync(path, base64Pdf, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(`PDF saved to: ${path}`);
  }
}

function uint8ToBase64(uint8Array: Uint8Array): string {
  let binary = '';
  const len = uint8Array.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

export default function PdfScreen() {
  const handleGeneratePdf = async () => {
    const data: LessonsData = {
      lessons: {
        letters: {
          order: 1,
          title: 'Letters',
          sections: {
            intro: {
              order: 1,
              text: 'This is an example introduction text.',
            },
            imageOne: {
              order: 2,
              image: true,
              alt: 'Example Image',
            },
            explanation: {
              order: 3,
              text: 'This is an explanation section.',
            },
          },
        },
      },
    };

    await generatePdf(data);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Generate PDF" onPress={handleGeneratePdf} />
    </View>
  );
}
