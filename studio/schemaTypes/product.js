export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // --- أضف حقل معرض الصور هنا ---
    {
      name: 'gallery',
      title: 'معرض الصور (صور متعددة)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        }
      ],
      options: {
        layout: 'grid',
      },
    },
    // ----------------------------
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    // --- Catalogue PDF (per product) ---
    {
      name: 'catalog',
      title: 'Catalogue PDF',
      description: 'الكتالوج الخاص بهذا المنتج — Fichier PDF du catalogue de ce produit. Uploadé depuis Sanity, affiché sur la carte du produit.',
      type: 'file',
      options: {
        accept: 'application/pdf',
        storeOriginalFilename: true,
      },
    },
    {
      name: 'catalogLabel',
      title: 'Catalogue Button Text (optional)',
      description: 'Texte du bouton catalogue (défaut : "Catalogue"). نص زر الكتالوج (افتراضياً: "الكتالوج").',
      type: 'string',
    },
    // ----------------------------
    {
      name: 'category',
      title: 'Catégorie (key)',
      type: 'string',
      initialValue: 'interior',
      description: 'Use the Key of a Product Category document (e.g. interior, exterior, metal...). Manage categories in "Product Category".',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}