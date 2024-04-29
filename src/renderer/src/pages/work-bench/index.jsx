import { Button, Flex } from 'antd';

const WorkBench = () => {
    return (
        <>
            <Flex gap={'10px'}>
                <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                    windowName: 'YulangUI',
                    url: 'http://101.132.70.183:10094'
                })}>YulangUI</Button>
                <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                    windowName: 'Baidu',
                    url: 'http://www.baidu.com'
                })}>Baidu</Button>
            </Flex>
        </>
    )
};

export default WorkBench;