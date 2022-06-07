import { useState, useCallback, useEffect } from "react";
// import useETHBalance from "../../hooks/useETHBalance";
// import useERC20Balances from "../../hooks/useERC20Balances";
// import usePTBalances from "../../hooks/usePTBalances";
import { useLogout, useUser } from "../../context/UserContext";
// import { formatETH, formatERC20 } from "../../utils/format";
// import { formatERC20 } from "../../utils/format";
import { DocuSignModalLoader } from "../DocuSign/DocuSign";
import { SupabaseClient } from '@supabase/supabase-js';

import Send from "../Send";
import Receive from "../Receive";
// import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
// import CopyUserAddress from "../CopyUserAddress/CopyUserAddress";
import useGetSnapshotProposals from "../../queries/useGetSnapshotProposals";
import Modal from "../Modal";
import BlockModal from "../BlockModal";
import styles from "./Wallet.module.scss";
import axios from "axios";

type Props = {
    supabase: SupabaseClient;
};

const Wallet = ({ supabase }: Props): JSX.Element | null => {
    const snapshotProposals = useGetSnapshotProposals().data;
    const [docuSignDone, setDocuSignDone] = useState(false);
    const [send, setSend] = useState(false);
    const [sendToDS, setSendToDS] = useState(false);
    const [receive, setReceive] = useState(false);
    const [hasToken, setHasToken] = useState(0);
    // const [proposalId, setProposalId] = useState('');
    const user = useUser();
    const logout = useLogout();

    // const [ethBalance, reloadEth] = useETHBalance();
    // const [balances, fetchUserErc20] = useERC20Balances();
    // const [POOL, fetchUserPT] = usePTBalances();
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalResponse, setModalResponse] = useState([]);
    const [rateLimitLock, setRateLimitLock] = useState(false);
    const [modalBody, setModalBody] = useState(Object);

    /** Reloader function  */
    // const reloader = useCallback(() => {
    //     reloadEth();
    //     fetchUserErc20();
    //     fetchUserPT();
    // }, [reloadEth, fetchUserErc20, fetchUserPT]);

    const reloader = useCallback(() => {
    }, []);

    /** Reload these every 15 sec */
    useEffect(() => {
        if (hasToken == 0 && !rateLimitLock) {
            setRateLimitLock(true);
            // Keep checking to see if the user has a token
            axios.get('https://us-central1-devo-protocol.cloudfunctions.net/hasToken?address=' + user?.address)
              .then(response => {
                if (response.status == 200) {
                    setHasToken(1);
                    // console.log("Had a token");
                } else if (response.status == 201) {
                    setHasToken(1);
                    // console.log("Did NOT have a token");
                }
              })
              .catch(error => {
                console.error(error);
              })
              .then(() => {
                setRateLimitLock(false);
                const timeout = setTimeout(() => {}, 15000);
                // always executed
                return () => { clearTimeout(timeout)};
              });
        } else {
            const timeout = setTimeout(() => reloader(), 15000);
            return () => { clearTimeout(timeout)};
        }
    }, [reloader]);

    useEffect(() => {
        setSendToDS(true);
    }, []);

    const loadProposals = (snapshotProposals: any) => {
        setModalResponse([]);
        setModalTitle("Proposals");
        let modalContentRaw = snapshotProposals == null ? [] : snapshotProposals[0].body.split('\n\n');
        let modalContent: any[] = [];
        for (var i = 0; i < modalContentRaw.length; i++) {
            modalContent.push({title: snapshotProposals == null ? "Declaration" : snapshotProposals[0].title, body: modalContentRaw[i]});
        }
        // console.log(modalContent);
        setModalBody(modalContent);
        // setProposalId(snapshotProposals == null ? '' : snapshotProposals[0].id);
    };

    const checkIfVoted = useCallback(async () => {
        let { data: votes, error } = await supabase
        .from('votes')
        .select('email')
        .eq('email', user?.email);
        if (!error) {
            // If the user has not voted, show the voting modal
            if (!votes || votes.length == 0) {
                setShowModal(true);
            }
        } else {
            console.error(error);
        }
    }, []);

    const checkIfDocuSignDone = useCallback(async () => {
        if (docuSignDone) {
            return;
        }
        let { data: kycData, error } = await supabase
        .from('kycDone')
        .select('docusign')
        .eq('email', user?.email);
        if (!error) {
            if (kycData != undefined && kycData?.length > 0 && kycData[0].docusign) {
                signDocumentComplete();
            }
        } else {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (!docuSignDone) {
            checkIfDocuSignDone();
        }
        if (snapshotProposals && snapshotProposals.length > 0 && docuSignDone && hasToken == 1) {
            loadProposals(snapshotProposals);
            checkIfVoted();
        }
    }, [snapshotProposals, docuSignDone, hasToken]);

    const signDocumentComplete = () => {
        setDocuSignDone(true);
    };

    const goToCrowdSale = () => {
        window.location.href = "https://devo-token-sale.vercel.app";
    };

    const onDocuSignSigned = async () => {
        const { data, error } = await supabase
        .from('kycDone')
        .update({ docusign: true })
        .match({ email: user?.email });
        if (!error) {
            console.log(data);
        } else {
            console.error(error);
        }
    }

    const onComplete = async () => {
        const { error } = await supabase
        .from('votes')
        .insert([
            {
                email: user?.email,
                address: user?.address,
                vote: modalResponse.join()
            }
        ]);
        if (error) {
            console.error(error);
        } else {
            console.log("votes cast");
        }
    };
 
    if (!user) {
        return null;
    }

    if (send) {
        return <Send goBackToWallet={() => setSend(false)} />;
    }

    if (receive) {
        return <Receive goBackToWallet={() => setReceive(false)} />;
    }

    // const Ramp = () => {

    //     const rampDiv = document.getElementById('ramp-container')
        
    //     new RampInstantSDK({
    //         hostAppName: 'POOL Simple',
    //         hostLogoUrl: 'https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png',
    //         swapAmount: '100000000',
    //         swapAsset: 'USDC',
    //         userAddress: user.address,
    //         userEmailAddress: user.email,
    //         containerNode: rampDiv!,
    //         url: 'https://ri-widget-staging.firebaseapp.com/', // only specify the url if you want to use testnet widget versions,
    //         // use variant: 'auto' for automatic mobile / desktop handling,
    //         // 'hosted-auto' for automatic mobile / desktop handling in new window,
    //         // 'mobile' to force mobile version
    //         // 'desktop' to force desktop version (default)
    //         variant: 'auto', 
    //     })
    //     .on('*', console.log)
    //     .show();
    
    // }

    return (
        <section className={styles.wallet}>
            <div id="modal-root">
                <Modal title={modalTitle} onClose={() => setShowModal(false)} content={modalBody} show={showModal && hasToken == 1} children={null} closeable={false} onComplete={onComplete} modalResponse={modalResponse} ></Modal>
                <BlockModal content={"Please wait while your information is being procured."} show={hasToken == 0}></BlockModal>
                <div className={styles.balance}>
                    {/* <span>Your Address</span>
                    <CopyUserAddress address={user.address} color="blue" 
                    />
                    <span>(Click to Copy)</span> 

                    <span>Balances</span>
                    <p className={styles.totalBalance}>
                        {formatETH(ethBalance)} ETH
                    <span>(ETH is required to send Tokens to another address)</span>
                    </p>

                    <span>Governance Tokens</span>
                    <p className={styles.totalBalance}>
                        {formatERC20(POOL, 9)} DEVO
                    <span>(If you have these, you can vote on DEVO Changes)</span>
                    </p> */}
                    <div>{sendToDS && ( <DocuSignModalLoader name={name} triggerVotes={signDocumentComplete} saveDocuSignDone={onDocuSignSigned} /> )}</div> 
                </div>

                <div id="ramp-container"></div>

                <div className={styles.main}>
                    <button className={styles.reloadBtn}>
                        Thanks for verifying! You can now proceed to the token sale using the button below.
                    </button>
                </div>
                <div className={styles.buttons}>
                    {/* <button onClick={() => setSend(true)}>Send</button> */}
                    {/* <button onClick={() => setReceive(true)}>Receive</button> */}
                    {/* <button onClick={Ramp}>Get ETH</button> */}
                    <button onClick={() => goToCrowdSale()}>Go to Crowd Sale</button>
                </div>
                <div className={styles.logoutContainer}>
                    <button className={styles.logout} onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Wallet;
