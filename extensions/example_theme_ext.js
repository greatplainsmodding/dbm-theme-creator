module.exports = {
    /* 

    - Theme Creator 
    - Version: 1.0.0 
    - Created by Great Plains Modding 
    - If you find any bugs please report them to me 

    */


    //----------------------------------------------------------------------------------
    // Change this to whatever you want to call your theme template. 
    themeName: 'Example',
    //----------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------
    // You can put your name here or the name of whoever created this extension.
    author: 'Great Plains Modding',
    //----------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------
    // Enter your custom theme description here.
    themeDescription: 'This is the base plate from DBM.',
    //----------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------
    // If your theme uses custom html you can set this to true. If not leave this false.
    customHTML: false,
    //----------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------
    // This is where you can place your custom html.
    // Note if you didn't set customHTML to true this wont load.
    // Also note this will be inside a form tags so all you need to do is add input tags
    html: function () {
        return `
            <input id="input1">
        `
    },
    //----------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------
    // Here you can place your custom css for the theme extension.
    css: function () {
        return `
            body { padding: 0px; }
        `
    },
    //----------------------------------------------------------------------------------



    //----------------------------------------------------------------------------------
    // Here you can define your config file needed for your theme extension.
    // 
    config: function (data) {
        return {
            input1: data.input1
        }
    }
    //----------------------------------------------------------------------------------

}