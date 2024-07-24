const contactInfoSchema = {
    name: 'contactInfo',
    title: 'Contact Info',
    type: 'document',
    fields: [
        {
        name: 'email',
        title: 'Email',
        type: 'string',
        },
        {
        name: 'phone',
        title: 'Phone',
        type: 'string',
        },
        {
        name: 'address',
        title: 'Address',
        type: 'string',
        },
        {
            name: 'socialMedia',
            title: 'Social Media',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            description: 'Namnet på sociala medie-plattformen',
                        },
                        {
                            name: 'link',
                            title: 'Link',
                            type: 'string',
                            description: 'Länk till din profil på den sociala medie-plattformen',
                        },
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                            description: 'Namnet på ikonen för sociala medier från lucid-icons',
                        }
                    ],
                },
            ],
        },
    ],
};

export default contactInfoSchema;
