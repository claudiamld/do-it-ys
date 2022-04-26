import { AnimationContainer, Background, Container, Content } from "./styles"
import Button from './../../components/Button'
import { Link } from "react-router-dom"
import Input from './../../components/Input'
import {AiOutlineUser, AiOutlineMail, AiFillLock} from "react-icons/ai";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import api from './../../services/api'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";

const Signup = ({authenticated}) => {

    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório!"),
        email: yup.string().email("Email inválido!").required("Campo obrigatório!"),
        password: yup.string().min(8, "Mínimo de 8 dígitos").required("Campo obrigatório!"),
        passwordConfirm: yup.string().oneOf([yup.ref("password")], "Senhas diferentes!").required("Campo obrigatório!"),
    })

    const {
        register, 
        handleSubmit, 
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema)
    });

    const history = useHistory()

    const onSubmitFunction = ({name, email, password}) => {
        const user = {name, email, password}
        api
        .post("/user/register", user)
        .then((_) => {
            toast.success('Conta criada com sucesso!')
            return history.push('/login')
        })
        .catch((err) => toast.error("Erro ao criar a conta, tente outro email!"))
    }

    if(authenticated){
        return <Redirect to="/dashboard" />
    }

    return(
        <Container>
            <Background />
                <Content>
                    <AnimationContainer>
                        <form onSubmit={handleSubmit(onSubmitFunction)}>
                            <h1>Cadastro</h1>
                            <Input 
                                register={register}
                                name="name"
                                icon={AiOutlineUser} 
                                label="Nome" 
                                placeholder="Seu nome" 
                                error={errors.name?.message}
                            />
                            {/* <span>{errors.name?.message}</span> */}
                            <Input 
                                register={register}
                                name="email"
                                icon={AiOutlineMail} 
                                label="Email" 
                                placeholder="Seu melhor email" 
                                error={errors.email?.message}
                            />
                            {/* <span>{errors.email?.message}</span> */}
                            <Input 
                                register={register}
                                name="password"
                                icon={AiFillLock}
                                label="Senha" 
                                placeholder="Uma senha bem segura" 
                                type="password" 
                                error={errors.password?.message}
                            />
                            {/* <span>{errors.password?.message}</span> */}
                            <Input 
                                register={register}
                                name="passwordConfirm"
                                icon={AiFillLock}
                                label="Confirme sua senha" 
                                placeholder="Confirme sua senha" 
                                type="password" 
                                error={errors.passwordConfirm?.message}
                            />
                            {/* <span>{errors.passwordConfirm?.message}</span> */}
                        <Button type="submit">Enviar</Button>
                        <p>Já tem uma conta? Faça seu <Link to="/login">login</Link></p>
                        </form>
                    </AnimationContainer>
                </Content>
        </Container>
    )
}
export default Signup