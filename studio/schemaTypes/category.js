export default {
  name: 'category',
  title: 'Product Category (Catégorie)',
  type: 'document',
  fields: [
    {
      name: 'key',
      title: 'Key (unique code)',
      type: 'string',
      description: 'Code used in the code, e.g. interior, exterior, metal... Must be typed exactly the same in each product.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name (French)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'nameEn',
      title: 'Name (English)',
      type: 'string',
    },
    {
      name: 'nameAr',
      title: 'Name (Arabic)',
      type: 'string',
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
