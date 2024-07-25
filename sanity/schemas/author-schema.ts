const authorSchema = {
    title: 'Author',
    name: 'author',
    type: 'document',
    fields: [
        {
        title: 'Name',
        name: 'name',
        type: 'string',
        },
        {
        title: 'Image',
        name: 'image',
        type: 'image',
        },
    ],
    };
    export default authorSchema;