import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GallerySection } from '../components/GallerySection';
import { Language } from '../i18n/translations';

interface GalleryPageProps {
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  lang,
  theme,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      <GallerySection
        onScrollToMenu={() => navigate('/menu')}
        lang={lang}
        theme={theme}
      />
    </motion.div>
  );
};
