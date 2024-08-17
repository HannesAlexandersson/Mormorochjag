const buttonImagesSchema = {
    name: 'buttonImages',
    title: 'Button Images',
    type: 'document',
    fields: [
        {
        title: 'Image Title',
        name: 'sectionTitle',
        type: 'string',
        description: 'Namn för sektionen som bilderna tillhör'
        },
        {
        name: 'buttonImage',
        title: 'buttonImage ',
        type: 'image',
        options: {
            hotspot: true
        },
        fields: [
            {
                name: 'alt',
                title: 'Alt',
                type: 'string',
                description: 'Kort beskrivande text för bilden'
            }
        ]
        },
    ]
}

export default buttonImagesSchema;