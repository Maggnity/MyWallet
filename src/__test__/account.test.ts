import AccountRepository from "../repository/AccountRepository"
import UserRepository from "../repository/UserRepository"
import { CreateAccountDTO } from "../types/Account"
import CreateAccountUseCase from "../useCase/Account/CreateAccount"
import { DeleteAccount } from "../useCase/Account/DeleteAccount"
import { GetAvailableAccountsByUserID } from "../useCase/Account/GetAvailableAccountsByUserID"
import getUserUseCase from "../useCase/User/GetUserById"

const dn = Date.now()

const accountRepository = new AccountRepository()
const userRepository = new UserRepository()

const getUser = new getUserUseCase(userRepository)


const createAccount = new CreateAccountUseCase(accountRepository, getUser)
const getAccountsByUserID = new GetAvailableAccountsByUserID(accountRepository)
const deleteAccount = new DeleteAccount(accountRepository)
let data: CreateAccountDTO = {
    id: null,
    agency: 1010,
    bank: Number((Math.random() * 1000).toFixed(0)),
    number: 5465465,
    type: "current"
}

test("Deve criar uma account", async () => {

    const account = await createAccount.execute("teste", data)

    data.id = account.id

    expect(account.agency).toBe(data.agency)
    expect(account.bank).toBe(data.bank)
    expect(account.account).toBe(data.number)
    expect(account.type).toBe(data.type)

})

test("O número da conta deve ser único por agência e banco", async () => {



    const account = await createAccount.execute("teste", data)
    expect(account).toStrictEqual(Error("Esta conta já está cadastrada nesta agência"))
})

test("Deve consultar accounts por userID", async () => {

    const response = await getAccountsByUserID.execute("teste")
    expect(response).toHaveProperty("data")
    expect(response).toHaveProperty("results")

    for (const account of response.data) {
        expect(account.user_id).toBe("teste")
    }
})

test("Deve verificar se conta exite pelo ID", async () => {
    if (!data.id) throw Error("Id do não foi criado!")
    const account = await accountRepository.getAvailableAccountById(data.id)
    expect(account?.account).toBe(data.number)

})

test("Se conta não existir deve retornar null!", async () => {
    const account = await accountRepository.getAvailableAccountById(`${Math.random()}`)
    expect(account).toBeNull()
})


test("Deve deletar uma conta com o ID", async () => {

    if (!data.id) return console.log("Id não foi criado corretamente!")

    const response = await deleteAccount.execute("teste", data.id)

    expect(response).toBe(undefined)

})

