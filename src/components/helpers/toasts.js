import { toast } from "react-toastify";

export const MESSAGE_SUCCESS = {
    register : (subject) =>  { toast.success(`${subject} cadastrado(a) com Sucesso!`)},
    delete : (subject) => { toast.success(`${subject} deletado com Sucesso!`)},
    update : (subject) => { toast.success(`${subject} editado com Sucesso!`)}
}

export const MESSAGE_ERROR = {
    default : (err) => { toast.error(`${err.response.data} - Erro: ${err.response.status}`)},
    bdError : () => { toast.warning('A Conexão com o Servidor Falhou. Tente Novamente Mais Tarde')},
    onlyAdults : () => { toast.warning('Apenas maiores de idade podem se Cadastrar! Redirecionando...')},
    tagsRequired : () => { toast.warning('É obrigatório selecionar uma tag!')},
    login : () => { toast.error("Email e/ou Senha Incorretos")}
}