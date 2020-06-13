import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.filter((t)=> { 
      return t.type === 'income';
    }).reduce((sum, t) => { return sum + t.value;}, 0);
    const sumOutcome = this.transactions.filter((t)=> { 
      return t.type === 'outcome';
    }).reduce((sum, t) => { return sum + t.value;}, 0);
    return { income: sumIncome, outcome: sumOutcome, total: sumIncome - sumOutcome }
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
