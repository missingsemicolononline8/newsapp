import React, { createContext, useEffect, useState } from 'react'

export const countryContext = createContext()

const CountryContext = ({ children }) => {
    const [country, setCountry] = useState()

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://ipinfo.io/json?token=72f71620826fe0')
                const data = await response.json();
                const countryCode = data.country;
                setCountry(countryCode.toLowerCase())
            }

            catch (e) {
                console.error(e)
                setCountry("us")
            }
        })()
    }, [])

    return (
        <countryContext.Provider value={{ country, setCountry }}>
            {children}
        </countryContext.Provider>
    )
}

export default CountryContext