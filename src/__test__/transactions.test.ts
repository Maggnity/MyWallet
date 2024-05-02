import AccountRepository from "../repository/AccountRepository"
import UserRepository from "../repository/UserRepository"
import { CreateAccountDTO } from "../types/Account"
import CreateAccountUseCase from "../useCase/Account/CreateAccount"
import { DeleteAccount } from "../useCase/Account/DeleteAccount"
import getUserUseCase from "../useCase/User/GetUserById"


let data: CreateAccountDTO = {
    id: null,
    agency: 1010,
    bank: Number((Math.random() * 1000).toFixed(0)),
    number: Number((Math.random() * 100).toFixed(0)),
    type: "current"
}

const userRepository = new UserRepository()
const accountRepository = new AccountRepository()

const getUser = new getUserUseCase(userRepository)
const createAccount = new CreateAccountUseCase(accountRepository, getUser)
const deleteAccount = new DeleteAccount(accountRepository)





test("Deve criar uma conta", async () => {

    const account = await createAccount.execute("teste", data)

    data.id = account.id

    expect(account.agency).toBe(data.agency)
    expect(account.bank).toBe(data.bank)
    expect(account.account).toBe(data.number)
    expect(account.type).toBe(data.type)


})




test("Deve deletar uma conta com o ID", async () => {

    if (!data.id) return console.log("Id não foi criado corretamente!")

    const response = await deleteAccount.execute("teste", data.id)

    expect(response).toBe(undefined)

})