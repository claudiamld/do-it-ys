import { AnimationContainer, Background, Container, Content } from "./styles"
import Button from './../../components/Button'
import { Link } from "react-router-dom"
import Input from './../../components/Input'
import {AiOutlineMail, AiFillLock} from "react-icons/ai";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import api from './../../services/api'
import { toast } from "react-toastify";
import { useHistory, Redirect } from "react-router-dom";

const Login = ({authenticated, setAuthenticated}) => {

    const schema = yup.object().shape({
        email: yup.string().email("Email inválido!").required("Campo obrigatório!"),
        password: yup.string().min(8, "Mínimo de 8 dígitos").required("Campo obrigatório!"),
    })

    const {
        register, 
        handleSubmit, 
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema)
    });

    const history = useHistory()

    const onSubmitFunction = (data) => {
        api.post("/user/login", data).then(response => {
            const {token, user} = response.data;     

            localStorage.setItem("@Doit:token", JSON.stringify(token));
            localStorage.setItem("@Doit:user", JSON.stringify(user));
            
            setAuthenticated(true)

            return history.push("/dashboard")
        })
        .catch((err) => toast.error("Email ou senha inválidos!"))
    };

    if(authenticated){
        return <Redirect to="/dashboard" />
    }

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                        <h1>Login</h1>
                        <Input 
                            register={register}
                            name="email"
                            icon={AiOutlineMail} 
                            label="Email" 
                            placeholder="Seu melhor email" 
                            error={errors.email?.message}
                        />
                        <Input 
                            register={register}
                            name="password"
                            icon={AiFillLock}
                            label="Senha" 
                            placeholder="Uma senha bem segura" 
                            type="password" 
                            error={errors.password?.message}
                        />
                    <Button type="submit">Enviar</Button>
                    <p>Ainda não tem conta? Faça seu <Link to="/signup">cadastro</Link></p>
                    </form>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}
export default Login