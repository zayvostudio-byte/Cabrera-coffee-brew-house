import React from 'react';

interface CabreraLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  variant?: 'monochrome' | 'gold' | 'luxury-dark' | 'luxury-light';
  showSubtitle?: boolean;
}

export const CabreraLogo: React.FC<CabreraLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'gold',
  showSubtitle = true,
}) => {
  // Theme color palettes based on "logo 3.jpeg" official artwork
  const palettes = {
    'gold': {
      mark: '#b58548',
      cupFill: '#ffffff',
      title: '#b58548',
      subtitle: '#8f6837',
      rule: '#d4a872',
    },
    'monochrome': {
      mark: 'currentColor',
      cupFill: '#ffffff',
      title: 'currentColor',
      subtitle: 'currentColor',
      rule: 'currentColor',
    },
    'luxury-dark': {
      mark: '#161412',
      cupFill: '#ffffff',
      title: '#161412',
      subtitle: '#3d3732',
      rule: '#8f7b6b',
    },
    'luxury-light': {
      mark: '#f7f4ee',
      cupFill: '#161412',
      title: '#f7f4ee',
      subtitle: '#d4ccbf',
      rule: '#baa993',
    },
  };

  const c = palettes[variant];

  // Scale map
  const scales = {
    xs: { iconH: 26, fontSize: 13, subSize: 6.5, estSize: 6 },
    sm: { iconH: 36, fontSize: 18, subSize: 8, estSize: 7 },
    md: { iconH: 52, fontSize: 24, subSize: 9.5, estSize: 8 },
    lg: { iconH: 74, fontSize: 34, subSize: 12.5, estSize: 10 },
    hero: { iconH: 100, fontSize: 46, subSize: 15, estSize: 12 },
  };

  const s = scales[size];

  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      {/* 
        Official SVG Icon faithfully transcribed from logo 3.jpeg:
        - Portafilter basket on left with dual spouts
        - Horizontal connector neck and handle on right
        - Goat standing atop the handle looking left
        - White coffee cup with handle nestled between the goat's legs
      */}
      <svg
        viewBox="0 0 160 110"
        style={{ height: `${s.iconH}px`, width: 'auto' }}
        className="transition-transform duration-300 hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={c.mark}>
          {/* PORTAFILTER BASKET (Left side) */}
          {/* Rim top lip */}
          <rect x="14" y="62" width="36" height="4.5" rx="1.5" />
          {/* Basket body */}
          <path d="M 17 66.5 L 47 66.5 L 46 80 Q 45 84 39 84 L 25 84 Q 19 84 18 80 Z" />
          
          {/* Dual Spout underneath basket */}
          {/* Left spout */}
          <path d="M 27 84 Q 24 93 21 95 Q 22 97 26 96 Q 28 92 30 84 Z" />
          {/* Right spout */}
          <path d="M 34 84 Q 36 92 38 96 Q 42 97 43 95 Q 40 93 37 84 Z" />

          {/* NECK / CONNECTOR */}
          <rect x="47" y="68" width="13" height="5.5" rx="1" />
          <path d="M 57 65 L 67 61 L 70 79 L 60 77 Z" />

          {/* PORTAFILTER HANDLE (Right side) */}
          {/* Thick horizontal handle where the goat stands */}
          <rect x="67" y="61" width="65" height="18.5" rx="9" />

          {/* THE CABRERA GOAT (Facing Left, perched atop the handle) */}
          {/* Hind leg (right) */}
          <path d="M 112 61 L 115 45 L 118 43 Q 120 40 118 36 L 114 36 L 110 46 L 107 61 Z" />
          {/* Fore leg (left) */}
          <path d="M 72 61 L 76 43 L 80 43 L 78 61 Z" />
          {/* Torso & arched back */}
          <path d="M 76 43 Q 75 32 82 25 Q 94 22 108 26 Q 116 30 118 36 L 123 37 Q 124 39 121 42 L 117 41 L 115 45 Z" />
          {/* Upright neck and head tilted up-left */}
          <path d="M 83 26 L 68 15 Q 63 11 59 13 Q 56 16 57 19 L 60 21 L 55 24 Q 57 26 62 25 L 67 23 L 74 38 Z" />
          {/* Pointed ear */}
          <path d="M 68 14 Q 74 9 78 12 Q 74 15 69 15 Z" />
          {/* Horn sweeping backwards */}
          <path d="M 73 13 Q 86 0 102 7 Q 88 7 76 15 Z" />
          
          {/* Tail on right */}
          <path d="M 118 36 Q 124 35 125 38 Q 122 41 117 40 Z" />
        </g>

        {/* 
          WHITE COFFEE CUP (Nestled right under the goat's belly and resting on the handle) 
          As uniquely featured in logo 3.jpeg!
        */}
        <g>
          {/* Cup Bowl */}
          <path
            d="M 83 45 L 105 45 Q 104 59 94 59 Q 84 59 83 45 Z"
            fill={c.cupFill}
          />
          {/* Cup Rim highlight */}
          <line x1="82.5" y1="45" x2="105.5" y2="45" stroke={c.cupFill} strokeWidth="1.5" />
          {/* Cup Handle on right */}
          <path
            d="M 103 48 Q 110 49 108 55 Q 103 57 101 54"
            fill="none"
            stroke={c.cupFill}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* TYPOGRAPHY (CABRERA with stencil detail, COFFEE BREW HOUSE, ESTD 2018) */}
      <div className="flex flex-col items-center mt-1">
        {/* CABRERA */}
        <span
          className="font-serif font-black tracking-[0.24em] uppercase leading-none"
          style={{
            fontSize: `${s.fontSize}px`,
            color: c.title,
            letterSpacing: '0.24em',
          }}
        >
          CABRERA
        </span>

        {showSubtitle && (
          <>
            {/* – COFFEE BREW HOUSE – */}
            <div className="flex items-center gap-1.5 mt-1 opacity-90">
              <span
                className="h-[1.2px] w-3"
                style={{ backgroundColor: c.rule }}
              />
              <span
                className="font-sans font-bold tracking-[0.28em] uppercase"
                style={{
                  fontSize: `${s.subSize}px`,
                  color: c.subtitle,
                }}
              >
                COFFEE BREW HOUSE
              </span>
              <span
                className="h-[1.2px] w-3"
                style={{ backgroundColor: c.rule }}
              />
            </div>

            {/* ESTD 2018 */}
            <span
              className="font-sans font-bold tracking-[0.3em] uppercase mt-0.5 opacity-80"
              style={{
                fontSize: `${s.estSize}px`,
                color: c.subtitle,
              }}
            >
              ESTD 2018
            </span>
          </>
        )}
      </div>
    </div>
  );
};
