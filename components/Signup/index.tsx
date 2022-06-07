import { useState, FormEvent } from "react";
import { useLogin } from "../../context/UserContext";
import { SupabaseClient } from '@supabase/supabase-js';
import styles from "./Signup.module.scss";

type Props = {
    supabase: SupabaseClient;
};

const Signup = ({ supabase }: Props): JSX.Element => {
    const hasKycParam = (query: any) => {
        var vars = query.split("?");
        if (vars.length > 1) {
            if (vars[1].includes('kyc')) {
                return true;
            }
        }
        return false;
    }

    const kycTestActive = () => {
        const parsedParams = hasKycParam(window.location.toString());
        // @ts-ignore
        if (parsedParams) {
            console.log("kyc active");
            return true;
        }
        console.log("kyc not active");
        return false;
    }

    const [email, setEmail] = useState("");
    const login = useLogin();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (typeof window !== "undefined") {
            if (email == undefined || email == null || email == "") return;
            let { data: kycDone, error } = await supabase
            .from('kycDone')
            .select('email')
            .eq('email', email);
            if (!error) {
                // Check to see if user already completed KYC
                if (kycDone != undefined && kycDone?.length > 0) {
                    login(email);
                } else {
                    if (kycTestActive()) {
                        const Persona = (window as any).Persona;
                        const client = new Persona.Client({
                            templateId: "itmpl_CSnNc46mbJe7DZyvmiza4G12",
                            environment: "production",
                            referenceId: email,
                            onReady: () => client.open(),
                            onEvent: (name: any, meta: any) => {
                                switch (name) {
                                    case 'start': console.log(`Received event: start with inquiry ID ${meta.inquiryId}`);
                                    break;
                                    case 'selfie-camera-capture': {
                                        // await supabase.auth.signUp({ email: email, password: 'password' });
                                        // const { error } = await supabase
                                        // .from('kycDone')
                                        // .insert([
                                        //     { email: email }
                                        // ]);
                                        // if (error) {
                                        //     console.error(error);
                                        // }
                                        
                                    }
                                    break;
                                    default: console.log(`Received event: ${name} with meta: ${JSON.stringify(meta)}`);
                                }
                            },
                            onComplete: async () => {
                                await supabase.auth.signUp({ email: email, password: 'password' });
                                const { error } = await supabase
                                .from('kycDone')
                                .insert([
                                    { email: email }
                                ]);
                                if (error) {
                                    console.error(error);
                                }
                                console.log("KYC complete");
                                login(email);
                            }
                        });
                    } else {
                        await supabase.auth.signUp({ email: email, password: 'password' });
                        const { error } = await supabase
                        .from('kycDone')
                        .insert([
                            { email: email }
                        ]);
                        if (error) {
                            console.error(error);
                        }
                        login(email);
                    }
                }
            } else {
                console.error(error);
            }
        }
    };

    return (
        <section className={styles.signup}>
            <h1>DAO Founders Portal</h1>
            {/* <img src="images/spacelogo.png" alt="Space Protocol" /> */}
            <span></span>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    placeholder="hello@example.com"
                />

                <button type="submit">Sign Up</button>
            </form>
        </section>
    );
};

export default Signup;
