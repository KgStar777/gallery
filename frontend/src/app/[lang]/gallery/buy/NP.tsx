import React from 'react'
import NowPaymentsApi from '@nowpaymentsio/nowpayments-api-js'

const npApi: NowPaymentsApi = new NowPaymentsApi({ apiKey: process.env.NOWPAYMENTS_API_KEY as string })

export const NP = ({
    // npApi
}: {
    // npApi: NowPaymentsApi
}) => {
  const [currenciesArr, setCurrenciesArr] = React.useState<string[]>([])
  React.useEffect(() => {
    async function fetchCurrencies() {
      const result = await npApi.getCurrencies()
      if (result && 'currencies' in result) {
        setCurrenciesArr(result.currencies)
      } else {
        // Можно обработать ошибку, если нужно
        setCurrenciesArr([])
        // Например, вывести ошибку в консоль:
        console.error('Ошибка получения валют:', result)
      }
    }
    fetchCurrencies()
  }, [])

  return (
    <div>
      <h2>Available currencies</h2>
      <br />
      {currenciesArr.map((currency) => (
        <p>{currency}</p>
      ))}
    </div>
  )
}