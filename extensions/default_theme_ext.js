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


    //----------------------------------------------------------------------------------
    // If your theme uses custom html you can set this to true. If not leave this false.
    customHTML: false,
    //----------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------
    // This is where you can place your custom html.
    // Note if you didn't set customHTML to true this wont load.
    // Also note this will be inside a form tags so all you need to do is add input tags
    html: function (data) {
        return `
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Background Type</label>
                    <select class="form-control" id="backgroundType" value="${data.backgroundType}">
                        <option value="Image">Image</option>
                        <option value="color">Solid Color</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="">Background</label><br>
                    <input class="form-control" type="text" placeholder="IMG link or img color">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Navigation</label>
                    <input class="form-control" placeholder="Text Color" value="${data.navTextColor}">
                </div>
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" placeholder="Background Color">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Background Color">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
                <div class="form-group col-md-6">
                    <label for="">Side Panel</label>
                    <input class="form-control" type="text" placeholder="Text Color">
                </div>
            </div>
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
    // Note this will only be used to create the config.
    // 
    config: function (data) {
        return {
            "themeName": '',
            "themeAuthor": '',
            "projectTemplate": '',
            "themeDescription": 'This is a test theme made with DBM Theme Creator.',
            "backgroundType": 'color',
            "backgroundIMGColor": '36393e',
            "navTextColor": 'ccc',
            "navBackgroundColor": '4676b9',
            "sidePanelText": 'ccc',
            "sidePanelBackground": '',
            "actionSectionText": 'ccc',
            "actionSectionBackground": '',
            "actionPanelText": 'ccc',
            "actionPaneBackground": ''
        }
    }
    //----------------------------------------------------------------------------------

}