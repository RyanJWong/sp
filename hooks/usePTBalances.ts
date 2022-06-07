import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
// import { TokenWithBalance, Token } from "../interfaces/tokens";
import { getSpaceBalance } from "../utils/balances";
// import main from "../utils/uniswap-checker"

const usePTBalances = (): [any, () => Promise<void>] => {
    const user = useUser();
    const [POOL, setPOOL] = useState<any>(0);

    const fetchUserPT = async () => {
        if (!user) { 
            setPOOL(0);
            return;
        }
        try {
            const tokensBalance = await getSpaceBalance(user.provider);
            setPOOL(tokensBalance);
        } catch (err) {
            setPOOL(0);
        }
    };
    // console.log(`uniswap-checker`, main)

    useEffect(() => {
        fetchUserPT();
    }, [user?.provider]);
    return [POOL, fetchUserPT];
};

export default usePTBalances;
