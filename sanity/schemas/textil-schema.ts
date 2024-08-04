
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
            options: {
                source: 'title',
                maxLength: 96
            }
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
        },
        {
            name: 'position',
            title: 'Position',
            type: 'number',
            description: 'Position i ordningen, lägst först. Om två har samma position sorteras de alfabetiskt. Om lämnas tom hamnar objectet sist.'
        }
    ]
};
export default textil;
