import { autoUpdater } from 'electron-updater';

export default (ipc) => {
	ipc.on('check-new-version', (event) => {
		//自动下载更新
		autoUpdater.autoDownload = false;
		//退出时自动安装更新
		autoUpdater.autoInstallOnAppQuit = false;
		ipc.on('download-new-version', () => {
			autoUpdater.downloadUpdate();
		});
		ipc.on('check-new-version', (_event, url) => {
			// 设置更新源url
			autoUpdater.setFeedURL(url);
			//检查是否有更新
			autoUpdater.checkForUpdates();
		});
		//有新版本时
		autoUpdater.on('update-available', (_info) => {
			event.sender.send('has-new-version');
		});
		//没有新版本时
		autoUpdater.on('update-not-available', (_info) => {
			event.sender.send('no-new-version');
		});
		//更新下载完毕
		autoUpdater.on('update-downloaded', (_info) => {
			//退出并安装更新
			autoUpdater.quitAndInstall();
		});
		//更新发生错误
		autoUpdater.on('error', (_info) => {
			event.sender.send('update-new-version-error');
		});
		// 监听下载进度
		autoUpdater.on('download-progress', (progress) => {
			event.sender.send('update-new-version-progress', progress);
		});
	});
};
