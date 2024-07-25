const storePageTextsectionsSchema = {
    name: 'storePageTextsections',
    title: 'StorePageTextsections',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Rubriken för stycket',
        },
        {
        name: 'text',
        title: 'Text',
        type: 'text',
        description: 'texten för stycket',
        },
        {
            name: 'position',
            title: 'Position',
            type: 'number',
            description: 'Positionen för stycket',
        }
    ],
};
export default storePageTextsectionsSchema;