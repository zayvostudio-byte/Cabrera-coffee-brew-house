import React from 'react';
import { RoasteryStory } from '../components/RoasteryStory';
import { Language } from '../i18n/translations';

interface OurStoryPageProps {
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({
  lang,
  theme,
}) => {
  return (
    <div className="min-h-screen opacity-100">
      <RoasteryStory
        lang={lang}
        theme={theme}
      />
    </div>
  );
};
