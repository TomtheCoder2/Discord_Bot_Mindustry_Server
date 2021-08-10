module.exports = {
    color: 0x0099ff,
    title: 'Some title',
    url: 'https://discord.js.org',
    author: {
        name: 'Some name',
        icon_url: 'http://188.155.170.60/Pictures/example.png',
        url: 'https://discord.js.org',
    },
    description: 'Some description here',
    thumbnail: {
        url: 'http://188.155.170.60/Pictures/example.png',
    },
    fields: [
        {
            name: 'Regular field title',
            value: 'Some value here',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
    ],
    image: {
        url: 'http://188.155.170.60/Pictures/example.png',
    },
    timestamp: new Date(),
    footer: {
        text: 'Some footer text here',
        icon_url: 'http://188.155.170.60/Pictures/example.png',
    },
};