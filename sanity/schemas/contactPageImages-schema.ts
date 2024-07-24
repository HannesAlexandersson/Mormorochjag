
const contactPageImages = {
    title: 'Contact Page Images',
    name: 'contactPageImages',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            description: 'Namnet på bilden',
        },      
        
        {
            title: 'image',
            name: 'Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Bild för textsektionen',
        },
        {
            name: 'textsektion',
            title: 'Textsektion',
            type: 'reference',
            to: [{ type: 'contactPage' }],
            description: 'Vilken textsektion ska bilden tillhöra?'
        }
    ]
}

export default contactPageImages;