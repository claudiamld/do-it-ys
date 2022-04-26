import { Redirect } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Container, InputContainer, TasksContainer } from "./styles"
import Input from './../../components/Input'
import Button from './../../components/Button'
import Card from "../../components/Card"
import {FiEdit2} from 'react-icons/fi'
import { useState } from "react"
import api from './../../services/api'
import { useEffect } from "react"

const Dashboard = ({authenticated}) => {
    
    const [tasks, setTasks] = useState([])
    const [token] = useState(JSON.parse(localStorage.getItem("@Doit: token")) || "")
    const {register, handleSubmit} = useForm()

    const loadTasks = () => {
        api.get("/task", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                competed: false,
            },
        })
        .then((response) => {
            const apiTasks = response.data.data.map(task => ({
                ...task,
                createdAt: new Date(task)
            }))
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        loadTasks()
    }, [])

    if(!authenticated){
        return <Redirect to="/login" />
    }

    return(
        <Container>
            <InputContainer>
                <time>7 de maio de 2021</time>
                <section>
                    <Input 
                        icon={FiEdit2}
                        placeholder="Nova tarefa"
                        register={register}
                        name="task"
                    />
                    <Button type="submit">Adicionar</Button>
                </section>
            </InputContainer>
            <TasksContainer>
                {tasks.map((task) => (
                    <Card 
                        key={task._id} 
                        title={task.description} 
                        date={task.createdAt}
                        onClick={() => {}} 
                    />
                ))}
            </TasksContainer>
        </Container>
    ) 
}
export default Dashboard