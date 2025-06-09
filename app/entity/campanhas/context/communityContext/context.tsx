import { createContext } from "react";

export const CommunityContext = createContext<any>({
    queryCommunity: {
        data: null,
    } as any,
    queryInstances: {
        data: null,
    } as any,
})

export const CommunityProvider = ({children, queryCommunity, queryInstances}:any) => {
    return(
        <CommunityContext.Provider
            value={{
                queryCommunity,
                queryInstances
            }}
        >
            {children}
        </CommunityContext.Provider>
    )

}