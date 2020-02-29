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
    console.log(data)
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