import {Container} from './styles'

const Button = ({children, type, onclick, whiteSchema = false, ...rest}) => {
    return(
        <Container whiteSchema={whiteSchema} {...rest}>
            {children}
        </Container>
    )
}
export default Button