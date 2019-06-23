import React, { createContext, useContext, useState, useEffect } from 'react'

import {
    getSetting,
    storeSetting,
    Settings,
    defaultSettings,
} from 'src/helpers/settings'

const gayStripes = ['#FF5D7D', '#FF764E', '#FFC144', '#88DF8E', '#00CCF2', '#B278D3']
const transStripes = ['hotpink', 'aliceblue', 'white', 'aliceblue', 'hotpink']
const catalanStripes = ['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow']

const useStoredSettings = (): SettingsFromContext => {
    const [state, setState] = useState(defaultSettings)
    const setSetting = (setting: keyof Settings, value: string | boolean) => {
        setState(settings => ({ ...settings, [setting]: value }))
        storeSetting(setting, value)
    }
    useEffect(() => {
        for (let setting of Object.keys(state)) {
            //@ts-ignore
            getSetting(setting).then(value => {
                setState(currentState => ({
                    ...currentState,
                    [setting]: value,
                }))
            })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return [state, setSetting]
}

const SettingsContext = createContext<SettingsFromContext>(
    {} as SettingsFromContext,
)

const SettingsProvider = ({ children }: { children: React.ReactNode }) => (
    <SettingsContext.Provider value={useStoredSettings()}>
        {children}
    </SettingsContext.Provider>
)
const useSettings = (): SettingsFromContext => useContext(SettingsContext)

export { SettingsProvider, useSettings }
