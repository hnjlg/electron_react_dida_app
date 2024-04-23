import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

/* 
  判断是否启用了上下文隔离
*/
if (process.contextIsolated) {
  try {
    /* 
      通过 contextBridge.exposeInMainWorld 方法将 electronAPI 和 api 对象暴露给渲染进程的全局上下文，
      以便在渲染进程中安全地访问 Electron 主进程提供的 API。
    */
    contextBridge.exposeInMainWorld('electron', electronAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
}
