'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const cardColors = [
  '#F6D6D6', '#F6F7C4', '#A1EEBD', '#B9E5E8', '#7BD3EA', '#DFF2EB',
  '#FFF7F7', '#4E31AA', '#0B2F9F', '#FFC7ED', '#FAA4BD', '#670D2F',
  '#8E7DBE', '#F2C078', '#27548A', '#4ED7F1', '#332D56', '#E9A319',
  '#EAE4D5', '#B0DB9C', '#73946B', '#ECFAE5', '#DDF6D2', '#F1BA88',
  '#604652', '#DBDBDB', '#1DCD9F',
];

const cardIcons = [
  "M 20 20 L 80 20 L 80 80 L 20 80 Z", // square
  "M 50 20 L 80 80 L 20 80 Z", // triangle
  "M 50 20 L 80 50 L 50 80 L 20 50 Z", // diamond
  "M 50 20 Q 80 20 80 50 Q 80 80 50 80 Q 20 80 20 50 Q 20 20 50 20", // blob
];

const FallingCards = () => {
  const [enabled, setEnabled] = useState(true);
  const [cardSize, setCardSize] = useState(120);

  useEffect(() => {
    if (!enabled) return;

    const numCards = 20;
    const cardInterval = 1.2;

    if (document.getElementById('falling-cards-container')) return;

    const container = document.createElement('div');
    container.id = 'falling-cards-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    const createCard = () => {
      const existing = document.getElementById('falling-cards-container');
      if (!existing) return;

      const randomX = Math.random() * window.innerWidth;
      const randomDelay = Math.random() * 2;
      const randomRotation = Math.random() * 360;
      const randomSize = cardSize * (0.8 + Math.random() * 0.5);
      const cardId = `card-${Math.random().toString(36).substr(2, 9)}`;
      const bgColor = cardColors[Math.floor(Math.random() * cardColors.length)];
      const iconPath = cardIcons[Math.floor(Math.random() * cardIcons.length)];

      const card = document.createElement('div');
      card.id = cardId;
      card.style.position = 'absolute';
      card.style.left = `${randomX}px`;
      card.style.top = '-200px';
      card.style.width = `${randomSize}px`;
      card.style.height = `${randomSize}px`;
      card.style.borderRadius = '16px';
      card.style.pointerEvents = 'auto';
      card.style.cursor = 'pointer';
      card.style.transform = `rotate(${randomRotation}deg)`;
      card.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
      card.style.background = bgColor;
      card.style.boxShadow = `
        0 10px 20px rgba(0, 0, 0, 0.15),
        inset 0 -5px 15px rgba(0, 0, 0, 0.1),
        inset 0 5px 15px rgba(255, 255, 255, 0.3)
      `;

      // Gloss overlay
      const glossOverlay = document.createElement('div');
      glossOverlay.style.position = 'absolute';
      glossOverlay.style.top = '0';
      glossOverlay.style.left = '0';
      glossOverlay.style.width = '100%';
      glossOverlay.style.height = '100%';
      glossOverlay.style.background = `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.5) 0%, 
        rgba(255, 255, 255, 0.2) 30%, 
        rgba(255, 255, 255, 0) 60%, 
        rgba(255, 255, 255, 0.1) 100%)`;
      glossOverlay.style.borderRadius = '16px';
      glossOverlay.style.zIndex = '1';
      card.appendChild(glossOverlay);

      // SVG icon
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.zIndex = '2';

      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", iconPath);
      path.setAttribute("fill", "rgba(255, 255, 255, 0.6)");
      svg.appendChild(path);
      card.appendChild(svg);

      container.appendChild(card);

      // Animate falling
      const tl = gsap.timeline();

      tl.to(card, {
        y: window.innerHeight + randomSize,
        x: randomX + (Math.random() * 200 - 100),
        rotation: randomRotation + (Math.random() * 180 - 90),
        duration: 5 + Math.random() * 3,
        delay: randomDelay,
        ease: 'power1.inOut',
        onComplete: () => {
          if (card && card.parentNode) {
            card.parentNode.removeChild(card);
          }
        }
      });

      // Hover interaction
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.1,
          rotation: `+=${Math.random() * 20 - 10}`,
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25), inset 0 -5px 15px rgba(0, 0, 0, 0.1), inset 0 5px 15px rgba(255, 255, 255, 0.5)',
          duration: 0.3
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15), inset 0 -5px 15px rgba(0, 0, 0, 0.1), inset 0 5px 15px rgba(255, 255, 255, 0.3)',
          duration: 0.3
        });
      });

      // Click to fly away
      card.addEventListener('click', () => {
        const flyDirection = Math.random() > 0.5 ? 1 : -1;

        gsap.to(card, {
          x: `+=${flyDirection * (window.innerWidth / 2 + 200)}`,
          y: `-=${200 + Math.random() * 300}`,
          rotation: `+=${flyDirection * (720 + Math.random() * 360)}`,
          scale: 0.2,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
          onComplete: () => {
            if (card && card.parentNode) {
              card.parentNode.removeChild(card);
            }
          }
        });
      });
    };

    const intervalId = setInterval(createCard, cardInterval * 1000);

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(createCard, i * 200);
    }

    return () => {
      clearInterval(intervalId);
      const existing = document.getElementById('falling-cards-container');
      if (existing) {
        existing.remove();
      }
    };
  }, [enabled, cardSize]);

  return <></>; // Must return something to make the component mount
};

export default FallingCards;
