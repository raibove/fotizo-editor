// import { Navigate } from "react-router-dom";

import { DropZone, Flex, Button, VisuallyHidden, Text } from "@aws-amplify/ui-react";
import { uploadData } from "aws-amplify/storage";
import { useState, useRef, ChangeEvent } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from "react-router-dom";

const client = generateClient<Schema>();
// interface Props {
//     isAuthenticated: boolean;
// }

const acceptedFileTypes = ['image/png', 'image/jpeg'];

const Upload = () => {
    const navigate = useNavigate();

    // const [files, setFiles] = useState<null | File>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const hiddenInput = useRef<HTMLInputElement | null>(null);

    const onFilePickerChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files || files.length === 0) {
            return;
        }
        
        try {
            setLoading(true);
            const res = await uploadData({
                path: `text/${files[0].name}`,
                data: files[0]
            }).result;
            const r = await client.models.Edits.create({eTag: res.eTag, path: res.path});
            if(r.data){
                console.log(r.data);
                navigate(`/edit/${r.data.id}`)
            } else {
                throw new Error('failed to load data')
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ flexGrow: 1, margin: '5vw', marginTop: '15vh' }}>
            {
                loading ?
                    <div></div>
                    :
                    <DropZone
                        acceptedFileTypes={acceptedFileTypes}
                    >
                        <Flex direction="column" alignItems="center" height='40vh' justifyContent='center' maxHeight='400px' borderRadius='10px'>
                            <Text style={{ color: 'white' }}>Drag image here or</Text>
                            <Button size="small" onClick={() => hiddenInput.current!.click()}>
                                Browse
                            </Button>
                        </Flex>
                        <VisuallyHidden>
                            <input
                                type="file"
                                tabIndex={-1}
                                ref={hiddenInput}
                                onChange={onFilePickerChange}
                                multiple={false}
                                accept={acceptedFileTypes.join(',')}
                            />
                        </VisuallyHidden>
                    </DropZone>
            }
        </div>
    )
}

export default Upload;