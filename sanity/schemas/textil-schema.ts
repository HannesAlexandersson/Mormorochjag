
const textil = {
    name: 'textil',
    title: 'Textil',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Nanmet på textilen'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Slug autogenereras från titeln',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Beskrivning av textilen'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                name: 'alt',
                title: 'Alt text',
                type: 'string',
                description: 'Kort beskrivande text för bilden'
                },
            ],
            description: 'Bild på textilen'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Pris på textilen'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'textilCategory' }],
            description: 'Kategori för textilen'
        }
    ]
};
export default textil;
