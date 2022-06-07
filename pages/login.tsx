import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "../context/UserContext";
import Signup from "../components/Signup";
import Wallet from "../components/Wallet";
// import NavBar from "../components/NavBar";

// const useStyles = makeStyles((theme) => ({
//     // here go styles
// }));

const Login = (): JSX.Element => {
    const user = useUser();
    const supabaseUrl = "https://qlljtrnaxtypbawzgwsx.supabase.co";
    const supabaseKey = `${process.env.NEXT_PUBLIC_SUPABASE_KEY}`;
    const supabase = createClient(supabaseUrl, supabaseKey as string);
    // const classes = useStyles();
    return (
        <div className="container">
            <Head>
                <title>DeVo DAO</title>
                <link rel="icon" href="/Favicon.svg" />
                <script
                    crossOrigin="true"
                    type="text/javascript"
                    src="https://cdn.withpersona.com/dist/persona-v4.2.0.js"
                />
            <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
        />
                <script src="https://na4.docusign.net/clickapi/sdk/latest/docusign-click.js/sdk/latest/docusign-click.js"></script>
            </Head>

            {!user && <Signup supabase={supabase} />}
            {user && <Wallet supabase={supabase} />}

        </div>
    );
};

export default Login;
