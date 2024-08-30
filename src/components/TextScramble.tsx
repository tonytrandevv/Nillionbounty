import React, { useState, useEffect, useRef } from 'react';
import '../TextScramble.css'; // Ensure this file exists and is correctly referenced

interface TextScrambleProps {
  texts: string[];
  scrambleSpeed?: number;  // Time per character scramble
  displayTime?: number;    // Time each text is displayed
}

const TextScramble: React.FC<TextScrambleProps> = ({
  texts,
  scrambleSpeed = 200,
  displayTime = 10000,
}) => {
  const [scrambledText, setScrambledText] = useState<string>(texts[0] || '');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isMounted = useRef<boolean>(true);
  const scrambleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const displayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isMounted.current = true;
    const characters = '.';
    let output = '';
    let i = 0;

    const scramble = () => {
      const text = texts[currentIndex];
      output = text
        .split('')
        .map((letter, pos) => {
          if (pos < i) {
            return text[pos];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      if (isMounted.current) {
        setScrambledText(output);
      }

      i++;

      if (i > text.length) {
        i = 0;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Cycle through texts
      }

      scrambleTimeoutRef.current = setTimeout(scramble, scrambleSpeed);
    };

    scramble();

    displayTimeoutRef.current = setTimeout(() => {
      isMounted.current = false; // Stop updating after the last display time
    }, displayTime * texts.length);

    return () => {
      if (scrambleTimeoutRef.current) {
        clearTimeout(scrambleTimeoutRef.current);
      }
      if (displayTimeoutRef.current) {
        clearTimeout(displayTimeoutRef.current);
      }
      isMounted.current = false;
    };
  }, [currentIndex, texts, scrambleSpeed, displayTime]);

  return (
    <p className="text-scramble">
      {scrambledText.split('').map((char, index) => (
        <span key={index} className="text-scramble__symbol">{char}</span>
      ))}
    </p>
  );
};

export default TextScramble;
