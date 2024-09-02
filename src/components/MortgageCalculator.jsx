import { useState } from 'react'
import './MortgageCalculator.css'

const initialState = {
  amount: '',
  downPayment: '',
  interestRate: '',
  loanTerm: '',
}

const MortgageCalculator = () => {
  const [formData, setFormData] = useState(initialState)
  const [payment, setPayment] = useState(null)
  const [total, setTotal] = useState(null)
  const [interest, setInterest] = useState(null)

  const handleChange = event => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(formData)
    calculateMonthlyPayment()
  }

  const calculateMonthlyPayment = () => {
    const { amount, downPayment, interestRate, loanTerm } = formData

    const loanAmount = parseFloat(amount) - (downPayment ? parseFloat(downPayment) : 0)

    const r = parseFloat(interestRate) / 100 / 12
    const n = parseFloat(loanTerm) * 12

    const numerator = loanAmount * r * Math.pow(1 + r, n)
    const denumerator = Math.pow(1 + r, n) - 1

    const monthlyPayment = (numerator / denumerator).toFixed(2)
    setPayment(monthlyPayment)
    const totalPayable = (monthlyPayment * n).toFixed(2)
    setTotal(totalPayable)
    const totalInterest = (totalPayable - loanAmount).toFixed(2)
    setInterest(totalInterest)
  }

  return (
    <div className='mortgage-container'>
      <h2>Калькулятор ипотеки</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Сумма кредита:</label>
          <input type='number' name='amount' value={formData.amount} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label>Первоначальный взнос:</label>
          <input type='number' name='downPayment' value={formData.downPayment} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label>Процентная ставка:</label>
          <input type='number' name='interestRate' value={formData.interestRate} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label>Срок кредита:</label>
          <input type='number' name='loanTerm' value={formData.loanTerm} onChange={handleChange} required />
        </div>
        <button type='submit'>Рассчитать</button>
      </form>
      {payment && (
        <div>
          <h3>Ежемесячный платёж: {payment}</h3>
          <h3>Общий долг: {total}</h3>
          <h3>Общий платёж по процентам: {interest}</h3>
        </div>
      )}
    </div>
  )
}

export default MortgageCalculator
