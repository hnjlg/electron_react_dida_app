
const About = () => {

    const ipcHandle = () => window.electron.ipcRenderer.send('ping')

    ipcHandle();

    return (
        <>about</>
    )
}

export default About;