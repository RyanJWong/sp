import React, {  useLayoutEffect } from "react";
import { useSetAgreement, useUser } from "../../context/UserContext";
declare global {
  interface Window {
    docuSignClick?: any;
  }
}



// this is an example taken from this URL: 
// https://stackblitz.com/edit/react-ts-docusign-clickwrap?file=DocuSign.tsx







export const DocuSignModalLoader = (props:any): any => {
    const user = useUser();
    const setAgreement = useSetAgreement();
  useLayoutEffect(() => {
    window?.docuSignClick?.Clickwrap.render(
      {
        environment: 'https://na4.docusign.net',
        accountId: '84208d3c-64a8-4415-85f0-cd64f1a5c178',
        clickwrapId: 'a834bd5a-20f9-410f-8b98-0a53d2d58370',
        clientUserId: user?.email,
        
        onMustAgree(agreement: any) {
          console.log('onMustAgree with:', agreement);
          // Called when no users have previously agreed by the above client user ID for the most recent required Clickwrap version
        },

        onAgreed(agreement: any) {
          console.log('onAgreed with:', agreement);
          setAgreement();
          props.triggerVotes();
          props.saveDocuSignDone();
          // Called when either 1) the clientUserId has previously agreed 2) the clientUserId has clicked agree and completed successfully
        },

        onDeclined(agreement: any) {
          console.log('onDeclined with:', agreement);
          // Called when the clientUserId has declined successfully
        },
      },
      '#ds-clickwrap'
    );
  }, []);
  return <div id="ds-clickwrap" ></div>;
};