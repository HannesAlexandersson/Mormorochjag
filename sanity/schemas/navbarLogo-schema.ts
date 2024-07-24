const navbarLogo = {
    name: "navbarLogo",
    title: "Navbar Logo",
    type: "document",
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            description: 'Rubriken för logotypen, kommer INTE att visas på sidan'
        },
        {
            name: "logo",
            title: "Logo",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string',
                    description: 'Kort beskrivande text för bilden'
            },
        ],
            description: 'Logotypen som sitter längst upp till vänster på sidan'
        },
    ],
};
export default navbarLogo;