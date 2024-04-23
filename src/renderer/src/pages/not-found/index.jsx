import { useNavigate, useLocation } from 'react-router-dom'
import { goHome } from './test'

const NotFound = () => {

    const navigate = useNavigate()

    const location = useLocation()


    return (
        <>
            <div>404</div>
            <button onClick={() => navigate('/index')}>返回Index1</button>
            <button onClick={() => goHome()}>返回Index2</button>
            {location.pathname}
        </>
    )
}

export default NotFound;