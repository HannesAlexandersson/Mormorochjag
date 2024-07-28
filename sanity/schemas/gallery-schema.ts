const gallery = {
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Title',
        type: 'string',
        },
        {
        name: 'images',
        title: 'Images',
        type: 'image',
        options: {
            hotspot: true,
        },
        description: 'a short description of the image',
        },
        {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Text describing the image, what you want to be displayed',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'galleryCategories' }],
            description: 'Kategori för galleriet',
        }
    ],
    };
export default gallery;