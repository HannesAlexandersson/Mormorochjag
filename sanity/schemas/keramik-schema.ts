
const keramik = {
    name: 'keramik',
    title: 'Keramik',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Namnet på keramiken'
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
            description: 'Beskrivning av keramiken'
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
            description: 'Bild på keramiken'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Pris på keramiken'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'kermaikCategory' }],
            description: 'Kategori för keramiken'
        }
    ]
}

export default keramik;