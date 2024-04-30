import UserRepository from "../repository/UserRepository"
import CreateUser from "../useCase/User/CreateUser"
import getUserByEmail from "../useCase/User/GetUserByEmail"
import getUserUseCase from "../useCase/User/GetUserById"
import { UpdateUser } from "../useCase/User/UpdateUser"


const repo = new UserRepository()
const newUser = new CreateUser(repo)
const getUser = new getUserUseCase(repo)
const getUserEmail = new getUserByEmail(repo)
const updateUser = new UpdateUser(repo)

const dn = Date.now()
let data = {
    id: null,
    name: 'john',
    email: `john.doe${dn}@mail.com`,
    password: '123'
}

let createdId

test("Deve criar usuário", async () => {

    const response = await newUser.execute(data)

    expect(response.id).toBeDefined()
    expect(response.name).toBe(data.name)
    expect(response.email).toBe(data.email)

    data.id = response.id
})

test("O email deve ser único", async () => { 

    try {

        const response = await newUser.execute(data)

    } catch (error) {

        expect(error).toStrictEqual(Error("Email já registrado!"))

    }
})

test("Deve buscar usuário por id", async () => {

    const response = await getUser.execute(data.id)

    console.log({ response })
    expect(response?.id).toBeDefined()
    expect(response?.name).toBe(data.name)
    expect(response?.email).toBe(data.email)
})

test("Deve buscar usuário por email", async () => {

    const response = await getUserEmail.execute(data.email)

    console.log({ response })
    expect(response?.id).toBeDefined()
    expect(response?.name).toBe(data.name)
    expect(response?.email).toBe(data.email)
})
test("Deve atualizar usuário", async () => {

    data.name = `${data.name} updated`
    data.email = `${data.email} updated`
    
    const response = await updateUser.execute(data)

    expect(response.id).toBeDefined()
    expect(response.name).toBe(data.name)
    expect(response.email).toBe(data.email)

    data.id = response.id


})

