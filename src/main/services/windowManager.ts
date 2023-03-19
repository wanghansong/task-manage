import setIpc from './ipcMain';
import { IsUseSysTitle, UseStartupChart } from '../config/const';
import menuconfig from '../config/menu';
import { app, BrowserWindow, Menu, dialog, Tray } from 'electron';
import { winURL, loadingURL } from '../config/StaticPath';
import { mainWindowConfig } from '../config/windowsConfig';
import path from 'path';

class MainInit {
    public winURL = '';
    public shartURL = '';
    public loadWindow: BrowserWindow = null;
    public mainWindow: BrowserWindow = null;
    public willQuitApp = false;

    constructor () {
        this.winURL = winURL;
        this.shartURL = loadingURL;
        if (process.env.NODE_ENV === 'development') {
            menuconfig.push({
                label: '开发者设置',
                submenu: [
                    {
                        label: '切换到开发者模式',
                        accelerator: 'CmdOrCtrl+I',
                        role: 'toggledevtools',
                    },
                ],
            });
        }
        // 启用协议
        setIpc.Mainfunc();
    }

    // 主窗口函数
    createMainWindow () {
        if(this.mainWindow) {
            return;
        }
        this.mainWindow = new BrowserWindow({
            titleBarStyle: IsUseSysTitle ? 'default' : 'hidden',
            ...Object.assign(mainWindowConfig, {}),
        });
        // 赋予模板
        const menu = Menu.buildFromTemplate(menuconfig as any);
        // 加载模板
        Menu.setApplicationMenu(menu);
        // 加载主窗口
        this.mainWindow.loadURL(this.winURL);
        // ready-to-show之后显示界面
        this.mainWindow.once('ready-to-show', () => {
            this.mainWindow.show();
            // 开发模式下自动开启devtools
            if (process.env.NODE_ENV === 'development') {
                this.mainWindow.webContents.openDevTools({
                    mode: 'undocked',
                    activate: true,
                });
            }
            if (UseStartupChart) this.loadWindow.destroy();
        });

        // 不知道什么原因，反正就是这个窗口里的页面触发了假死时执行
        this.mainWindow.on('unresponsive', () => {
            dialog
                .showMessageBox(this.mainWindow, {
                    type: 'warning',
                    title: '警告',
                    buttons: ['重载', '退出'],
                    message: '图形化进程失去响应，是否等待其恢复？',
                    noLink: true,
                })
                .then((res) => {
                    if (res.response === 0) this.mainWindow.reload();
                    else this.mainWindow.close();
                });
        });

        app.on('before-quit', () => {
            this.willQuitApp = true;
        });

        this.mainWindow.on('close', (event) => {
            if(this.willQuitApp) {
                this.mainWindow = null;
                app.quit();
            } else {
                event.preventDefault(); // 阻止默认关闭行为
                this.mainWindow.hide(); // 隐藏窗口
            }
        });
        // 在窗口关闭时销毁 mainWindow 对象
        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });

        this.setTray();
    }

    setTray() {
        const tray = new Tray(path.resolve(process.env.__packedBasePath, 'static/icon/icon.png'));

        const contextMenu = Menu.buildFromTemplate([
            {
                label: '退出',
                click: () => {
                    this.mainWindow.destroy(); // 销毁窗口，而不是隐藏
                    app.quit();
                },
            },
        ]);

        tray.setToolTip('日程管理');

        // 当点击托盘图标时，显示或隐藏窗口
        tray.on('click', () => {
            if (this.mainWindow.isVisible()) {
                this.mainWindow.hide();
            } else {
                this.mainWindow.show();
            }
        });
        tray.on('right-click', () => {
            tray.popUpContextMenu(contextMenu);
        });
    }

    // 加载窗口函数
    loadingWindow (loadingURL: string) {
        this.loadWindow = new BrowserWindow({
            width: 400,
            height: 600,
            frame: false,
            skipTaskbar: true,
            transparent: true,
            resizable: false,
            webPreferences: { experimentalFeatures: true },
        });

        this.loadWindow.loadURL(loadingURL);
        this.loadWindow.show();
        this.loadWindow.setAlwaysOnTop(true);
        // 延迟两秒可以根据情况后续调快，= =，就相当于个，sleep吧，就那种。 = =。。。
        setTimeout(() => {
            this.createMainWindow();
        }, 1500);
    }

    // 初始化窗口函数
    initWindow () {
        if (UseStartupChart) {
            this.loadingWindow(this.shartURL); 
        } else {
            this.createMainWindow(); 
        }
    }
}
export default MainInit;
