import Container from 'react-bootstrap/Container';
import Menu from '../Components/Menu'

const Page = (props) => {
    return (
        <>
            <Menu />
            <Container className='main-container'>
                {props.children}
            </Container>
        </>
    )
}

export default Page;