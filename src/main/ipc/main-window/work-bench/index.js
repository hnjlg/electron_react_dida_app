import { getMenuSql, getLinkSql, addMenuSql, addLinkSql, updateMenuSql, updateLinkSql, deleteMenuSql, deleteLinkSql } from '../../../sqlite/sql/work-bench';

export default (ipc) => {
    ipc.on('get-menus', async (event) => {
        const menus = await getMenuSql();
        event.reply('get-menus-callback', menus);
    });

    ipc.on('get-links', async (event, menuKey) => {
        const links = await getLinkSql(menuKey);
        event.reply('get-links-callback', links);
    });

    ipc.on('add-menu', async (event, menu) => {
        await addMenuSql(menu);
        const menus = await getMenuSql();
        event.reply('get-menus-callback', menus);
    });

    ipc.on('add-link', async (event, link) => {
        await addLinkSql(link);
        const links = await getLinkSql(link.menu_key);
        event.reply('get-links-callback', links);
    });

    ipc.on('edit-menu', async (event, menu) => {
        await updateMenuSql(menu.id, menu);
        const menus = await getMenuSql();
        event.reply('get-menus-callback', menus);
    });

    ipc.on('edit-link', async (event, link) => {
        await updateLinkSql(link.id, link);
        const links = await getLinkSql(link.menu_key);
        event.reply('get-links-callback', links);
    });

    ipc.on('delete-menu', async (event, id) => {
        await deleteMenuSql(id);
        const menus = await getMenuSql();
        event.reply('get-menus-callback', menus);
    });

    ipc.on('delete-link', async (event, id) => {
        await deleteLinkSql(id);
    });

}
