import exp from "constants";

const galleryCategories = {
    title: 'Gallery Categories',
    name: 'galleryCategories',
    type: 'document',
    fields: [
        {
        title: 'Category Name',
        name: 'categoryName',
        type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Slug autogenereras från namnet',
            options: {
                source: 'categoryName',
                maxLength: 96
            }
        },
        {
        title: 'Category Description',
        name: 'categoryDescription',
        type: 'text',
        },
        {
        title: 'Category Image',
        name: 'categoryImage',
        type: 'image',
        options: {
            hotspot: true,
        },
        description: 'A short description of the image',
        },        
    ],
    };
    export default galleryCategories;