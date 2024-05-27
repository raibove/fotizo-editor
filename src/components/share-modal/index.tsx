import { Button, Flex } from "@aws-amplify/ui-react";
import './style.css';

interface Props {
    show: boolean;
    hideModal: () => void;
    link: string
}

const ShareModal = ({ show, hideModal, link }: Props) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";


    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            // alert("Link copied to clipboard!");
            hideModal();
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <Flex justifyContent='flex-end'><Button  variation='warning'  size="small" onClick={hideModal}>&times;</Button></Flex>
                {/* <h2>Share Access</h2> */}
                <p>To give someone access to your document, share the following link:</p>
                <div className="md-button-container">
                    <Button variation="primary" onClick={() => copyToClipboard(link)}>
                        Copy Link
                    </Button>
                    {/* <Button variation="primary" onClick={() => copyToClipboard("http://example.com/preview-access")}>
                        Copy Preview Access Link
                    </Button> */}
                </div>
                {/* <p className="info-text">The edit access link allows others to make changes to your document, while the preview access link lets them view it without making any changes.</p> */}

            </div>
        </div>
    )
}

export default ShareModal;