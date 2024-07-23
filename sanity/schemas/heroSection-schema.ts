const heroSection = {
    title: 'Hero Section',
    name: 'heroSection',
    type: 'document',
    fields: [
        {
        title: 'Title',
        name: 'title',
        type: 'string',
        description: 'Rubriken för hero-sektionen, dvs första sektionen på sidan'
        },
        {
        title: 'Subtitle',
        name: 'subtitle',
        type: 'string',
        description: 'Underrubriken för hero-sektionen, kan lämnas tom om du inte vill ha en underrubrik'
        },        
        {
        title: 'Background Image Desktop',
        name: 'backgroundImage',
        type: 'image',
        options: { hotspot: true },
        fields: [
            {
                name: 'alt',
                title: 'Alt',
                type: 'string',
                description: 'Kort beskrivande text för bilden'
        },
    ],
    description: 'Bakgrundsbild för hero-sektionen i desktop format'
    },    
    {
        title: 'Background Image Mobile',
        name: 'backgroundImageMobile',
        type: 'image',
        options: { hotspot: true },
        fields: [
            {
                name: 'alt',
                title: 'Alt',
                type: 'string',
                description: 'Kort beskrivande text för bilden'
        },
    ],
    description: 'Bakgrundsbild för hero-sektionen i mobil format'
    },   
    ]
};

export default heroSection;