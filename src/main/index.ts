'use strict';

import { app, session, dialog } from 'electron';
import InitWindow from './services/windowManager';
import DisableButton from './config/DisableButton';

const windowInstance = new InitWindow();

function onAppReady () {
    windowInstance.initWindow();
    DisableButton.Disablef12();
    if (process.env.NODE_ENV === 'development') {
        const { VUEJS3_DEVTOOLS } = require('electron-devtools-vendor');
        session.defaultSession.loadExtension(VUEJS3_DEVTOOLS, {
            allowFileAccess: true,
        });
        console.log('已安装: vue-devtools');
    }
}

app.whenReady().then(onAppReady);

// 由于9.x版本问题，需要加入该配置关闭跨域问题
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// 当确定渲染进程卡死时，分类型进行告警操作
app.on('render-process-gone', (event, webContents, details) => {
    const message = {
        title: '',
        buttons: [],
        message: '',
    };
    switch (details.reason) {
    case 'crashed':
        message.title = '警告';
        message.buttons = ['确定', '退出'];
        message.message = '图形化进程崩溃，是否进行软重启操作？';
        break;
    case 'killed':
        message.title = '警告';
        message.buttons = ['确定', '退出'];
        message.message =
            '由于未知原因导致图形化进程被终止，是否进行软重启操作？';
        break;
    case 'oom':
        message.title = '警告';
        message.buttons = ['确定', '退出'];
        message.message = '内存不足，是否软重启释放内存？';
        break;

    default:
        break;
    }
    dialog
        .showMessageBox(windowInstance.mainWindow, {
            type: 'warning',
            title: message.title,
            buttons: message.buttons,
            message: message.message,
            noLink: true,
        })
        .then((res) => {
            if (res.response === 0) windowInstance.mainWindow.reload();
            else windowInstance.mainWindow.close();
        });
});
/**
* 新的gpu崩溃检测，详细参数详见：http://www.electronjs.org/docs/api/app
* @returns {void}
* @author zmr (wanghansong)
* @date 2020-11-27
*/
app.on('child-process-gone', (event, details) => {
    const message = {
        title: '',
        buttons: [],
        message: '',
    };
    switch (details.type) {
    case 'GPU':
        switch (details.reason) {
        case 'crashed':
            message.title = '警告';
            message.buttons = ['确定', '退出'];
            message.message = '硬件加速进程已崩溃，是否关闭硬件加速并重启？';
            break;
        case 'killed':
            message.title = '警告';
            message.buttons = ['确定', '退出'];
            message.message =
        '硬件加速进程被意外终止，是否关闭硬件加速并重启？';
            break;
        default:
            break;
        }
        break;

    default:
        break;
    }
    dialog
        .showMessageBox(windowInstance.mainWindow, {
            type: 'warning',
            title: message.title,
            buttons: message.buttons,
            message: message.message,
            noLink: true,
        })
        .then((res) => {
            // 当显卡出现崩溃现象时使用该设置禁用显卡加速模式。
            if (res.response === 0) {
                if (details.type === 'GPU') app.disableHardwareAcceleration();
                windowInstance.mainWindow.reload();
            } else {
                windowInstance.mainWindow.close();
            }
        });
});
       

app.on('activate', () => {
    if (windowInstance.mainWindow === null) {
        windowInstance.createMainWindow();
    } else if(!windowInstance.mainWindow.isDestroyed()) {
        windowInstance.mainWindow.show(); // 当激活应用时，显示窗口
    }
});

app.on('window-all-closed', () => {
    app.quit();
});
app.on('browser-window-created', () => {
    console.log('window-created');
});

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.removeAsDefaultProtocolClient('electron-vue-template');
        console.log('由于框架特殊性开发环境下无法使用');
    }
} else {
    app.setAsDefaultProtocolClient('electron-vue-template');
}
