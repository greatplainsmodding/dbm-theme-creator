const electron = require('electron');
const ejs = require('ejs-electron')
const url = require('url');
const path = require('path');
const fs = require('fs');

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    dialog
} = electron;

let mainWindow;
let newProject;
let currentProject;
let menuTemplate;

let extensions = new Map()

fs.readdirSync(path.join(__dirname, "extensions")).forEach(dir => {
    const extensionFiles = fs.readdirSync(path.join(__dirname, "extensions")).filter(file => file.endsWith('.js'));
    for (let extension of extensionFiles) {
        let pull = require(path.join(__dirname, `extensions/${extension}`));
        extensions.set(pull.themeName, pull);
    }
})

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 690,
        minWidth: 1000,
        minHeight: 690,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'bin', 'views', 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', function () {
        app.quit()
    })
});

ipcMain.on('createProjectWindow', function () {
    createProjectWindow();
})

ipcMain.on('createNewProject', function (e, data) {
    newProject.close()
    openProject(true, data)
})


ipcMain.on('openExistingProject', async function () {
    let FolderPath = path.join(__dirname, 'data', 'themes');

    let options = {
        title: "DBM Theme Creator",
        defaultPath: FolderPath,
        buttonLabel: "Open Project",
        filters: [{
            name: 'json',
            extensions: ['json'],
        }]
    }

    let file = await dialog.showOpenDialog(newProject, options);

    if (file.canceled) return;
    openProject(false, file)
})

ipcMain.on('saveProject', function (e, data) {
    let themeSettings = require(currentProject)
    themeSettings.projectData = data;
    console.log(themeSettings)
    let dataFinal = JSON.stringify(themeSettings)
    fs.writeFileSync(currentProject, dataFinal, 'utf-8');
})

ipcMain.on('exportProject', function (e, data) {
    exportProject(data)
})

// Menu
menuTemplate = [{
        label: 'File',
        submenu: [{
                label: 'Create Project',
                click() {
                    createProjectWindow()
                }
            },
            {
                label: 'Open Project',
                click() {
                    openProjectDialog()
                }
            },
            {
                label: 'Save Project',
                click() {

                }
            }
        ]
    },
    {
        label: 'Window',
        submenu: [{
            label: 'Restart Program',
            click() {

            }
        }, {
            label: 'Minimize To Tray',
            click() {

            }
        }, {
            label: 'Close',
            click() {
                app.quit()
            }
        }]
    },
    {
        label: 'Project',
        submenu: [{
            label: 'Export Project',
            click() {

            }
        }]
    },
    {
        label: 'Developer Tools',
        submenu: [{
            label: 'Insect',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }]
    }
]

async function exportProject(data) {
    let FolderPath = path.join(__dirname, 'exports', 'themes');

    let options = {
        title: "DBM Theme Creator",
        defaultPath: FolderPath,
        buttonLabel: "Export Project",
        filters: [{
            name: 'css',
            extensions: ['css'],
        }]
    }

    let file = await dialog.showSaveDialog(newProject, options);

    if (file.canceled) return;

    let themeSettings = require(currentProject);
    let css = `
    p#settings-description {
        color: #222;
    }
    
    .ui.multiple.dropdown > .label {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: inline-block;
        vertical-align: top;
        white-space: normal;
        font-size: 1em;
        padding: 0.35714286em 0.78571429em;
        margin: 0.14285714rem 0.28571429rem 0.14285714rem 0em;
        box-shadow: 0px 0px 0px 1px rgba(34, 36, 38, 0.15) inset;
    }
    
    body {
        color: #afafaf;
        background-color: #36393e;
        overflow: hidden;
        transition: 0.5s;
    }
    
    body.running {
        background-color: #001427 !important;
    }
    
    a:link {
        color: #99b3ff;
    }
    
    div.action-holder {
        width: 240px; 
        float: left; 
        max-width: 240px; 
        padding-top: 22px;
    }
    
    div.event-action-holder {
        width: 240px; 
        float: left; 
        max-width: 240px; 
        padding-top: 22px;
    }
    
    select#commands {
        overflow: hidden;
        height: 120px;
    }
    
    select#actions {
        overflow: hidden;
        position: static;
    }
    
    div.footer {
        position: static;
        float: right;
        width: 100%;
        height: 100%;
        right: 0px;
        bottom: 100px;
        left: 220px;
        /*top: 400px;*/
        text-align: left;
    }
    
    div.infooter {
        padding-top: 49px;
    }
    
    div.einfooter {
        padding-top: 77px;
    }
    
    div.actionButtonDiv {
        width: 90%; 
        padding: 10px 10px 10px 0px;
        text-align: left;
    }
    
    button.actionButtons {
        width: 120px;
        padding-right: 20px;
        padding-left: 20px;
        float: right;
    }
    
    div.tabs {
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
    }
    
    div.tabs button {
        width: 33%;
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 12px 20px;
        transition: 0.2s;
    }
    
    div.tabs button:hover {
        background-color: #ddd;
    }
    
    div.tabs button.active {
        background-color: #ccc;
    }
    
    div.myactions {
        overflow-y: auto;
        overflow-x: hidden;
        border: 1px solid #ccc;
        background-color: #53585f;
    }
    
    div.myactions button {
        overflow: hidden;
        width: 100%;
        height: 20px;
        text-align: left;
        color: #e3e5e8;
        background-color: #53585f;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.2s;
    }
    
    div.myactions button:hover {
        background-color: #777e88;
    }
    
    div.myactions button.active {
        background-color: #4676b9;
    }
    
    div.emyactions {
        overflow: auto;
        overflow-x: hidden;
        border: 1px solid #ccc;
        background-color: #53585f;
    }
    
    div.emyactions button {
        overflow: hidden;
        width: 100%;
        height: 20px;
        text-align: left;
        color: #e3e5e8;
        background-color: #53585f;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.2s;
    }
    
    div.emyactions button:hover {
        background-color: #777e88;
    }
    
    div.emyactions button.active {
        background-color: #4676b9;
    }
    
    .page {
        display: none;
    }
    
    input {
        color: #e3e5e8;
        background-color: #53585f;
        padding-bottom: 2px;
    }
    
    textarea {
        color: #e3e5e8;
        background-color: #53585f;
        border: 1px solid #eee;
        border-radius: 4px;
        box-sizing: border-box;
        display: block;
        padding-left: 8px;
    }
    
    textarea:focus {
        outline-width: 0;
    }
    
    textarea::selection {
        background: #b8dbff;
    }
    
    select {
        color: #e3e5e8;
        background-color: #53585f;
    }
    
    button#a_tab_com, button#a_tab_eve, button#a_tab_sets {
        background-color: #4676b9;
    }
    
    button#a_tab_com.active, button#a_tab_com.active:hover,
    button#a_tab_eve.active, button#a_tab_eve.active:hover,
    button#a_tab_sets.active, button#a_tab_sets.active:hover {
        background-color: #315381;
    }
    
    button#a_tab_com:hover,
    button#a_tab_eve:hover,
    button#a_tab_sets:hover {
        background-color: #3f6aa6;
    }
    
    input::selection {
        background: #b8dbff;
    }
    
    input:focus {
        outline-width: 0;
    }
    
    input#name, input#alias-input, input#ename, input#etemp, input#etemp2 {
        border: 1px solid #eee;
        border-radius: 4px;
        box-sizing: border-box;
        display: block;
        height: 28px;
        padding-left: 8px;
    }
    
    input.settings {
        font-family: monospace;
        width: 100%;
        border: 1px solid #eee;
        border-radius: 4px;
        box-sizing: border-box;
        display: block;
        height: 28px;
        padding-left: 8px;
    }
    
    input.round {
        width: 100%;
        border: 1px solid #eee;
        border-radius: 4px;
        box-sizing: border-box;
        display: block;
        height: 28px;
        padding-left: 8px;
    }
    
    select.round {
        width: 100%;
        border: 1px solid #eee;
        border-radius: 4px;
        box-sizing: border-box;
        display: block;
        height: 28px;
        padding-left: 8px;
    }
    
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #36393e;
    }
    
    ::-webkit-scrollbar-track {
        background-color: #36393e;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #e0e1e2;
    }
    
    #aliases, #moduleManager {
        height: 380px;
        border-radius: 10px;
        background-color: #36393e;
        border: 2px solid black;
    }
    
    .modalChild {
        height: 240px;
        margin-left: 70px;
        margin-top: 15px;
        overflow-y: scroll;
    }
    
    
    
    .customLabel {
        background: black;
        padding: 3px 6px;
        color: white;
    }
    
    .tooltip {
      position: relative;
      display: inline-block;
    }
    
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: rgb(0, 0, 0);
      color: #b8b8b8;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -60px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .tooltip .tooltiptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
    
    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
    `
    console.log(file.filePath)
    fs.writeFileSync(file.filePath, css, 'utf-8');

}

async function openProjectDialog() {
    let FolderPath = path.join(__dirname, 'data', 'themes');
    let options = {
        title: "DBM Theme Creator",
        defaultPath: FolderPath,
        buttonLabel: "Open Project",
        filters: [{
            name: 'json',
            extensions: ['json'],
        }]
    }

    let file = await dialog.showOpenDialog(newProject, options);
    if (file.canceled) return;
    openProject(false, file)
}


async function openProject(isNewProject, file) {
    let menuButton = {
        label: 'Project',
        submenu: [{
            label: 'Export Project',
            click() {
                exportProject('test')
            }
        }]
    }

    menuTemplate.push(menuButton)

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    if (isNewProject) {
        let themeExtension = extensions.get(file.projectTemplate);

        let themeConfig = {
            "themeName": file.projectName,
            "themeAuthor": file.projectAuthor,
            "projectTemplate": file.projectTemplate,
            "themeDescription": file.themeDescription,
        };

        themeConfig.projectData = themeExtension.data

        let newProjectDataFinal = JSON.stringify(themeConfig);
        let filePath = path.join(__dirname, 'data', 'themes', `${file.projectName}.json`);
        fs.writeFileSync(filePath, newProjectDataFinal, 'utf-8');
        ejs.data('themeExtension', themeExtension);
        ejs.data('themeConfig', themeConfig)

        currentProject = filePath
        currentTheme = file.projectTemplate;

        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'data', "dbmFiles", "html", 'index.ejs'),
            protocol: 'file:',
            slashes: true
        }));

        ipcMain.on('loadProject', (event, arg) => {
            const projectData = newProjectDataFinal
            event.reply('loadProjectReply', projectData)
        })
    } else {
        const theme = require(file.filePaths[0])
        let themeExtension = extensions.get(theme.projectTemplate)

        ejs.data('themeExtension', themeExtension);
        ejs.data('themeConfig', theme)

        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'data', "dbmFiles", "html", 'index.ejs'),
            protocol: 'file:',
            slashes: true
        }));

        currentProject = file.filePaths[0]
        currentTheme = theme.projectTemplate;

        ipcMain.on('loadProject', (event, arg) => {
            const projectData = require(file.filePaths[0])
            event.reply('loadProjectReply', projectData)
        })
    }
}


async function createProjectWindow() {
    newProject = new BrowserWindow({
        width: 500,
        height: 530,
        minWidth: 500,
        minHeight: 530,
        maxHeight: 530,
        maxWidth: 500,
        title: 'Create Project',
        webPreferences: {
            nodeIntegration: true
        }
    });

    ejs.data('extensions', extensions)

    newProject.loadURL(url.format({
        pathname: path.join(__dirname, 'bin', 'views', 'newProject.ejs'),
        protocol: 'file:',
        slashes: true
    }));

    newProject.on('close', function () {
        newProject = null;
    })

    newProject.setMenuBarVisibility(false);
}