const keramikCategory = {
  name: 'kermaikCategory',
  title: 'kermaikCategory',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Namn på kategorin',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug autogenereras från titeln',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
    {
      title: 'Button Image',
      name: 'buttonImage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
      
    },
  ],
}

export default keramikCategory
