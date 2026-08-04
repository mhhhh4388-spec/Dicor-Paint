export default {
  name: 'siteSettings',
  title: 'Site Settings (Contact Numbers)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
    },
    {
      name: 'whatsapp',
      title: 'Main WhatsApp (digits with country code)',
      type: 'string',
      description: 'e.g. 21650224490 — shown in the top bar.',
    },
    {
      name: 'phone1',
      title: 'Phone 1',
      type: 'string',
      description: 'e.g. 21620603970',
    },
    {
      name: 'phone2',
      title: 'Phone 2',
      type: 'string',
      description: 'e.g. 21625474035',
    },
    {
      name: 'facebook',
      title: 'Facebook Page URL',
      type: 'url',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'slideshowEnabled',
      title: 'Slideshow images (auto-rotate) / تشغيل تغيّر الصور',
      description: 'Rotate the images inside each product card (image + gallery). Turn OFF to stop the rotation (إيقاف).',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'slideshowInterval',
      title: 'Change interval (seconds) / مدة تغيّر الصورة (ثواني)',
      description: 'How often the image changes inside the cards. Default 3 seconds.',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(60),
    },
    {
      name: 'slideshowPauseOnHover',
      title: 'Pause on hover / إيقاف مؤقت عند المرور بالفأرة',
      description: 'Pause the rotation while the visitor keeps the mouse over a card.',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'baPairs',
      title: 'Before / After Pairs / صور قبل وبعد',
      description: 'Image pairs for the Before/After comparison section. They rotate automatically.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'before', title: 'Before Image / صورة قبل', type: 'image', options: { hotspot: true }, validation: R => R.required() },
            { name: 'after',  title: 'After Image / صورة بعد',  type: 'image', options: { hotspot: true }, validation: R => R.required() },
          ],
          preview: {
            select: { before: 'before.asset->url', after: 'after.asset->url' },
            prepare(sel) {
              return { title: 'Before / After', subtitle: sel.before && sel.after ? '✓ 2 images' : 'Missing image' };
            },
          },
        },
      ],
    },
  ],
}
