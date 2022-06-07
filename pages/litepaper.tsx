import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";

const useStyles = makeStyles({
    section: {
        height: "100vh",
        paddingRight: "0%",
        paddingBottom: "0px",
        paddingLeft: "0%",
        alignItems: "center",
        border: "1px none #000",
        backgroundColor: "rgb(0, 0, 0)",
        backgroundPosition: "0px 0px",
        backgroundSize: "1920px",
    },
});

const Litepaper = (): JSX.Element => {
    const classes = useStyles();

    useEffect(() => {
        const { AdobeDC } = window as any;
        const adobeDCView = new AdobeDC.View({
            clientId: "14bca4ad22894fd3bea97e0a2dda4d91",
            divId: "adobe-dc-view",
        });
        adobeDCView.previewFile(
            {
                content: {
                    location: { url: "https://sp-rouge.vercel.app/wpv0-5.pdf" },
                },
                metaData: { fileName: "Spacewhitepaper.pdf" },
            },
            {},
        );
    }, []);

    return (
        <Layout>
            <script src="https://documentcloud.adobe.com/view-sdk/main.js" />
            <div className={classes.section}>
                <div id="adobe-dc-view" />
            </div>
        </Layout>
    );
};

export default Litepaper;
