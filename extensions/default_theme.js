module.exports = {
    /* 

    - Theme Creator 
    - Version: 1.0.0 
    - Created by Great Plains Modding 
    - If you find any bugs please report them to me 

    */


    //----------------------------------------------------------------------------------
    // Change this to whatever you want to call your theme template. 
    themeName: 'Default',
    //----------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------
    // You can put your name here or the name of whoever created this extension.
    author: 'Great Plains Modding',
    //----------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------
    // Enter your custom theme description here.
    themeDescription: 'This is the base plate from DBM.',
    //----------------------------------------------------------------------------------

    data: {
        "createNewCommandTextColor": "#e3e5e8",
        "createNewCommandBackgroundColor": "#ccc",
        "navTabsTextColor": "#e3e5e8",
        "navTabsBackgroundColor": "#4676b9",
        "pageText": '#e3e5e8'
    },

    fields: [],

    customFields: function (data) {
        return `

        `
    },

    //----------------------------------------------------------------------------------
    modals: function (data) {
        return `

        `
    },
    //----------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------
    // Here you can place your custom css for the theme extension.
    html: function (data) {
        return `

        `
    }

    //----------------------------------------------------------------------------------

}