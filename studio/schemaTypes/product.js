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
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Intérieure', value: 'interior'},
          {title: 'Extérieure', value: 'exterior'}
        ],
        layout: 'radio'
      }
    },
  ],
}