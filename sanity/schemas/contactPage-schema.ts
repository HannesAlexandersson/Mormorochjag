
const contactPage = {
    title: 'Contact Page Textsections',
    name: 'contactPage',
    type: 'document',
    fields: [
        {
        title: 'Title',
        name: 'title',
        type: 'string',
        description: 'Rubriken för textsektionen',       
        },
        {
        title: 'Description',
        name: 'description',
        type: 'text',       
        description: 'Paragraftexten för textsektionen',
        }, 
        {
            title: 'Position',
            name: 'position',
            type: 'number',
            description: 'Positionen för textsektionen, ju högre siffra desto längre ner på sidan',
        },
        
    ],
}
export default contactPage;