import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  
  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-900/80 border border-gray-700 backdrop-blur-md">
          <h1 className="text-2xl font-extrabold text-center text-blue-400 mb-6 uppercase tracking-wide">
            Hii MetaMorpH! <br /> This is Currency Converter!
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
          >
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from} // ✅ Correct for FROM
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full flex justify-center my-3">
              <button
                type="button"
                className="border border-blue-400 text-blue-400 bg-gray-800 px-3 py-1 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white shadow-md"
                onClick={swap}
              >
                ⥯ Swap
              </button>
            </div>

            <div className="w-full mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to} // ✅ FIXED: Now correctly shows INR
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:bg-blue-700 shadow-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
