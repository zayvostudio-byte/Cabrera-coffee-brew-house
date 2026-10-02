import React from 'react';
import { motion } from 'motion/react';
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
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      <RoasteryStory
        lang={lang}
        theme={theme}
      />
    </motion.div>
  );
};
