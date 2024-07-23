const trippleImage = {
    name: 'trippleImage',
    title: 'Tripple Image',
    type: 'document',
    fields: [
        {
        title: 'Section Title',
        name: 'sectionTitle',
        type: 'string',
        description: 'Rubriken för sektionen som bilderna tillhör'
        },
        {
        name: 'image1',
        title: 'Image 1',
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
        {
        name: 'image2',
        title: 'Image 2',
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
        {
        name: 'image3',
        title: 'Image 3',
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
        {
            title: 'Section',
            name: 'section',
            type: 'reference',
            to: [{type: 'landingPageTextsections'}],
            description: 'Vilken textsektion som bilden ska tillhöra'
        }
    ],    
};
export default trippleImage;