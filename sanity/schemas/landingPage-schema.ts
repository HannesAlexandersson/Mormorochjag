
const landingPage = {
    title: 'LandingPage textsections',
    name: 'landingPageTextsections',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            description: 'Rubriken fö textsektionen'
        },
        {
            title: 'Paragraph',
            name: 'paragraph',
            type: 'array', 
            of: [{type: 'block'}],
            description: 'Paragraftexten i textsektionen'           
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            description: 'Bild till textsektionen',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string',
                    description: 'Kort beskrivande text för bilden'
                },
            ], 
        },
        {
            title: 'Position',
            name: 'position',
            type: 'number',
            description: 'Position för ordningen av texten på sidan, lägst nummer kommer först. Lämnas detta fältet tomt hamnar texten längst ner på sidan.'
        },
    ]
}
export default landingPage;