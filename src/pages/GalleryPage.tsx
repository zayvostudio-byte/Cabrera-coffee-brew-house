import React from 'react';
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
    <div className="min-h-screen opacity-100">
      <GallerySection
        onScrollToMenu={() => navigate('/menu')}
        lang={lang}
        theme={theme}
      />
    </div>
  );
};
