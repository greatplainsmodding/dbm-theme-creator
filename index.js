const electron = require('electron');
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

app.on('ready', function () {
    // Create mainWindow
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'bin', 'mainWindow.html'),
        protocol: 'file:',
        slashes: true,
    }));

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', function () {
        app.quit()
    })
});

// catch
ipcMain.on('createProjectName', function (e, data) {
    let filePath = path.join(__dirname, 'data', 'themes', `${data.projectName}.json`);

    let newProjectData = {
        "themeName": data.projectName,
        "themeAuthor": data.projectAuthor,
        "projectTemplate": data.projectTemplate,
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

    let newProjectDataFinal = JSON.stringify(newProjectData)
    fs.writeFileSync(filePath, newProjectDataFinal, 'utf-8');
    newProject.close()
    loadProject()
})

ipcMain.on('createProjectWindow', function () {
    createProject();
})

async function loadProject() {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'bin', 'projectWindow.html'),
        protocol: 'file:',
        slashes: true,
    }));

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', function () {
        app.quit()
    });
}

async function createProject() {
    newProject = new BrowserWindow({
        width: 550,
        height: 300,
        title: 'Create Project',
        webPreferences: {
            nodeIntegration: true
        }
    });

    newProject.loadURL(url.format({
        pathname: path.join(__dirname, 'bin', 'newProject.html'),
        protocol: 'file:',
        slashes: true
    }));

    newProject.on('close', function () {
        newProject = null;
    })

    newProject.setMenuBarVisibility(false);
}

// Menu
const menuTemplate = [{
        label: 'File',
        submenu: [{
                label: 'Create Project',
                click() {
                    createProject()
                }
            },
            {
                label: 'Open Project',
                click() {

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
            label: 'View Project',
            click() {

            }
        }, {
            label: 'Export Project',
            click() {

            }
        }]
    },
    {
        label: 'Other',
        submenu: [{
            label: 'About',
            click() {

            }
        }, {
            label: 'Documentation',
            click() {

            }
        }]
    }, {
        label: 'Extensions',
        submenu: [

        ]
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