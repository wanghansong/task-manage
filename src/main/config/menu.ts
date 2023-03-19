// 这里是定义菜单的地方，详情请查看 https://electronjs.org/docs/api/menu
import { dialog } from 'electron';
import { type, arch, release } from 'os';
import packageInfo from '../../../package.json';

const menu = [
    {
        label: '设置',
        submenu: [
            {
                label: '快速重启',
                accelerator: 'F5',
                role: 'reload',
            }, 
            {
                label: '退出',
                accelerator: 'CmdOrCtrl+F4',
                role: 'close',
            },
        ],
    }, 
    {
        label: '编辑',
        submenu: [
            { role: 'undo', label: '撤销' },
            { role: 'redo', label: '重做' },
            { type: 'separator' },
            { role: 'cut', label: '剪切' },
            { role: 'copy', label: '复制' },
            { role: 'paste', label: '粘贴' },
            { role: 'pasteAndMatchStyle', label: '粘贴并匹配样式' },
            { role: 'delete', label: '删除' },
            { role: 'selectAll', label: '全选' },
        ],
    },
    {
        label: '帮助',
        submenu: [{
            label: '关于',
            click: function () {
                info();
            },
        }],
    },
];
function info() {
    dialog.showMessageBox({
        title: '关于',
        type: 'info',
        message: '日程管理',
        detail: `版本信息：${packageInfo.version}\n引擎版本：${process.versions.v8}\n当前系统：${type()} ${arch()} ${release()}`,
        noLink: true,
        buttons: ['查看开源github', '确定'],
    });
}

export default menu;
