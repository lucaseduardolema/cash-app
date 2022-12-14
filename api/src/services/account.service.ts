import Account from '../database/models/Account.model'

export default class AccountService {
  async createAccount() {
    const { id } = await Account.create({ balance: 100.00 })
    return id
  }

  async getBalanceById(id: number | undefined) {
    const balance = await Account.findByPk(id)
    return balance
  }
}
