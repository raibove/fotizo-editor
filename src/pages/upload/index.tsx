// import { Navigate } from "react-router-dom";

import { DropZone, Flex, Button, VisuallyHidden, Text } from "@aws-amplify/ui-react";
import { uploadData } from "aws-amplify/storage";
import { useState, useRef, ChangeEvent, useEffect } from "react";

// interface Props {
//     isAuthenticated: boolean;
// }

const acceptedFileTypes = ['image/png', 'image/jpeg'];

const Upload = () => {
    const [files, setFiles] = useState<null | File>(null);
    const hiddenInput = useRef<HTMLInputElement | null>(null);

    const onFilePickerChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files || files.length === 0) {
            return;
        }
        setFiles(files[0]);
        uploadData({
            path: `text/${files[0].name}`,
            data: files[0]
        })
    };

    useEffect(()=>{
        console.log(files)
    }, [files])
    
    return (
        <div style={{ flexGrow: 1, margin: '5vw', marginTop:'15vh' }}>
            <DropZone
                acceptedFileTypes={acceptedFileTypes}
                onDropComplete={({ acceptedFiles, rejectedFiles }) => {
                    console.log(acceptedFiles, rejectedFiles)
                    const f0 = acceptedFiles[0];
                    setFiles(f0);
                }}
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
        </div>
    )
}

export default Upload;