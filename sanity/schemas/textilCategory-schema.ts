
const textilCategory = {
    title: 'textilCategory',
    name: 'textilCategory',
    type: 'document',
    fields: [
        {
        title: 'category',
        name: 'Category',
        type: 'string',
       description: 'Namn på kategorin'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Slug autogenereras från titeln',
            options: {
                source: 'title',
                maxLength: 96
            }
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
        }
    ]
}

export default textilCategory;