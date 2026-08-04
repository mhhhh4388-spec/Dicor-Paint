export default {
  name: 'siteSettings',
  title: 'Site Settings / إعدادات الموقع',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact Info / معلومات الاتصال' },
    { name: 'location', title: 'Location & GPS / الموقع والخرائط' },
    { name: 'media', title: 'Images & Media / الصور والوسائط' },
    { name: 'social', title: 'Social Links / روابط التواصل' },
    { name: 'slideshow', title: 'Slideshow / تغيّر الصور' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
    },
    /* ── Contact Info ─────────────────────────────── */
    {
      name: 'whatsapp',
      title: 'Main WhatsApp (digits with country code)',
      type: 'string',
      description: 'e.g. 21650224490 — shown in the top bar.',
      group: 'contact',
    },
    {
      name: 'phone1',
      title: 'Main Phone',
      type: 'string',
      description: 'e.g. 21620603970',
      group: 'contact',
    },
    {
      name: 'phone2',
      title: 'Secondary Phone',
      type: 'string',
      description: 'e.g. 21625474035',
      group: 'contact',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Shown in the contact section and footer.',
      group: 'contact',
    },
    /* ── Location & GPS ───────────────────────────── */
    {
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      rows: 3,
      description: 'e.g. 001. Hssan Ennouri Ksar Said 2009 — Mannouba, Tunisia.',
      group: 'location',
    },
    {
      name: 'mapsLink',
      title: 'Google Maps GPS Link',
      type: 'url',
      description: 'Link opened when clicking the address, e.g. https://www.google.com/maps?q=36.8123728433215,10.11717353428965',
      group: 'location',
    },
    {
      name: 'mapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Use Google Maps → Share → Embed a map → copy the iframe src, e.g. https://www.google.com/maps/embed?pb=…',
      group: 'location',
    },
    /* ── Images & Media ───────────────────────────── */
    {
      name: 'heroImages',
      title: 'Hero Banner Images / صور الواجهة',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Images for the hero section. The first one is used as the main hero image.',
      group: 'media',
    },
    {
      name: 'baPairs',
      title: 'Before / After Pairs / صور قبل وبعد',
      description: 'Image pairs for the Before/After comparison section. Each pair is an interactive drag-to-compare slider.',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Project Title / عنوان المشروع',
              type: 'string',
              description: 'Optional short name shown above the slider, e.g. "Salon", "Chambre", "Villa".',
            },
            {
              name: 'category',
              title: 'Project / Category / المشروع',
              type: 'string',
              description: 'Optional label shown as a badge, e.g. "Appartement", "Villa", "Bureau".',
            },
            { name: 'before', title: 'Before Image / صورة قبل', type: 'image', options: { hotspot: true }, validation: R => R.required() },
            { name: 'after',  title: 'After Image / صورة بعد',  type: 'image', options: { hotspot: true }, validation: R => R.required() },
          ],
          preview: {
            select: { title: 'title', category: 'category', before: 'before.asset->url', after: 'after.asset->url' },
            prepare(sel) {
              const label = [sel.title, sel.category].filter(Boolean).join(' — ') || 'Before / After';
              return { title: label, subtitle: sel.before && sel.after ? '✓ 2 images' : 'Missing image' };
            },
          },
        },
      ],
    },
    {
      name: 'catalogPdf',
      title: 'Catalog PDF / كتالوج PDF',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload the full product catalog PDF. Replaces the hardcoded catalogue-decor-peint.pdf everywhere.',
      group: 'media',
    },
    /* ── Social Links ─────────────────────────────── */
    {
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    },
    /* ── Slideshow ────────────────────────────────── */
    {
      name: 'slideshowEnabled',
      title: 'Slideshow images (auto-rotate) / تشغيل تغيّر الصور',
      description: 'Rotate the images inside each product card (image + gallery). Turn OFF to stop the rotation (إيقاف).',
      type: 'boolean',
      initialValue: true,
      group: 'slideshow',
    },
    {
      name: 'slideshowInterval',
      title: 'Change interval (seconds) / مدة تغيّر الصورة (ثواني)',
      description: 'How often the image changes inside the cards. Default 3 seconds.',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(60),
      group: 'slideshow',
    },
    {
      name: 'slideshowPauseOnHover',
      title: 'Pause on hover / إيقاف مؤقت عند المرور بالفأرة',
      description: 'Pause the rotation while the visitor keeps the mouse over a card.',
      type: 'boolean',
      initialValue: true,
      group: 'slideshow',
    },
  ],
  preview: {
    select: { title: 'title', phone1: 'phone1', email: 'email' },
    prepare(sel) {
      return { title: sel.title || 'Site Settings / إعدادات الموقع', subtitle: [sel.phone1, sel.email].filter(Boolean).join(' — ') };
    },
  },
}
