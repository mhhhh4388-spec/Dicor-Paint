export default {
  name: 'branch',
  title: 'Branch (Agence)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Branch Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'nameEn',
      title: 'Branch Name (English)',
      type: 'string',
    },
    {
      name: 'nameAr',
      title: 'Branch Name (Arabic)',
      type: 'string',
    },
    {
      name: 'region',
      title: 'Region / Gouvernorat (French)',
      type: 'string',
    },
    {
      name: 'regionEn',
      title: 'Region (English)',
      type: 'string',
    },
    {
      name: 'regionAr',
      title: 'Region (Arabic)',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'e.g. +216 20 603 970 or 21620603970',
    },
    {
      name: 'whatsapp',
      title: 'WhatsApp Number (digits with country code)',
      type: 'string',
      description: 'e.g. 21650224490',
    },
    {
      name: 'gps',
      title: 'GPS Location',
      type: 'geopoint',
      description: 'Click "Set from map" to place the marker on the branch location.',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
}
