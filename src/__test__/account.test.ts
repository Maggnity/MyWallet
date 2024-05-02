import { Account } from "../Entity/Account"
import AccountRepository from "../repository/AccountRepository"
import { CardRepository } from "../repository/CardRepository"
import UserRepository from "../repository/UserRepository"
import { TransactionRepository } from "../repository/transactionRepository"
import { CreateAccountDTO } from "../types/Account"
import CreateAccountUseCase from "../useCase/Account/CreateAccount"
import { DeleteAccount } from "../useCase/Account/DeleteAccount"
import { GetAvailableAccountsByUserID } from "../useCase/Account/GetAvailableAccountsByUserID"
import { UpdateAcount } from "../useCase/Account/UpdateAccount"
import getUserUseCase from "../useCase/User/GetUserById"

const dn = Date.now()



const accountRepository = new AccountRepository()
const userRepository = new UserRepository()
const cardRepository = new CardRepository()
const transactionRepository = new TransactionRepository()
const accountService = new Account(accountRepository, cardRepository, transactionRepository)

const getUser = new getUserUseCase(userRepository)

const createAccount = new CreateAccountUseCase(accountRepository, getUser)
const getAccountsByUserID = new GetAvailableAccountsByUserID(accountRepository)
const updateAccount = new UpdateAcount(accountRepository)
const deleteAccount = new DeleteAccount(accountRepository)
let data: CreateAccountDTO = {
    id: null,
    agency: 1010,
    bank: Number((Math.random() * 1000).toFixed(0)),
    number: Number((Math.random() * 100).toFixed(0)),
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

test("Deve atualizar account", async () => {
    if (!data.id) throw Error("Erro ao gerar ID")
    data.agency = 1011
    const response = await updateAccount.execute("teste", data.id, data)
    expect(response).toHaveProperty("updated_at")

})

test("Deve depositar um valor corretamente", async () => {

    if (!data.id) throw Error("Erro ao gerar ID")
    const response = await accountService.deposit(data.id, 50)
    
    expect(response.id_transaction).toBeDefined()
    expect(response.type).toBe("deposit")
    expect(response.status).toBe("pending")
    expect(parseFloat(String(response.balance))).toBe(50)
})


test("Deve sacar um valor corretamente", async () => {
    if (!data.id) throw Error("Erro ao gerar ID")


    const response = await accountService.cashOut(data.id, 50)
    expect(response.id_transaction).toBeDefined()
    expect(response.type).toBe("cashout")
    expect(response.status).toBe("pending")
    expect(parseFloat(String(response.balance))).toBe(0)
})

/* test("Deve deletar uma conta com o ID", async () => {

    if (!data.id) return console.log("Id não foi criado corretamente!")

    const response = await deleteAccount.execute("teste", data.id)

    expect(response).toBe(undefined)

}) */

