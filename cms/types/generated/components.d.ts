import type { Schema, Struct } from '@strapi/strapi';

export interface LabelNavLinks extends Struct.ComponentSchema {
  collectionName: 'components_label_nav_links';
  info: {
    displayName: 'navLinks';
    icon: 'arrowRight';
  };
  attributes: {};
}

export interface TextParagraphs extends Struct.ComponentSchema {
  collectionName: 'components_text_paragraphs';
  info: {
    displayName: 'paragraphs';
  };
  attributes: {};
}

export interface TextRequirements extends Struct.ComponentSchema {
  collectionName: 'components_text_requirements';
  info: {
    displayName: 'requirements';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'label.nav-links': LabelNavLinks;
      'text.paragraphs': TextParagraphs;
      'text.requirements': TextRequirements;
    }
  }
}
