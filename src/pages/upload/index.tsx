// import { Navigate } from "react-router-dom";

import { DropZone, Flex, Button, VisuallyHidden, Text } from "@aws-amplify/ui-react";
import { getUrl, uploadData } from "aws-amplify/storage";
import { useState, useRef, ChangeEvent, useEffect } from "react";

// interface Props {
//     isAuthenticated: boolean;
// }

const acceptedFileTypes = ['image/png', 'image/jpeg'];

const Upload = () => {
    const [files, setFiles] = useState<null | File>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [img, setImg] = useState<string | null>(null);

    const hiddenInput = useRef<HTMLInputElement | null>(null);

    const onFilePickerChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files || files.length === 0) {
            return;
        }
        setFiles(files[0]);
        try {
            setLoading(true);
            const res = await uploadData({
                path: `text/${files[0].name}`,
                data: files[0]
            }).result;
            // const url =  await getUrl({path: res.path});
            console.log(res.path, res.metadata, res.eTag, res);
            // setImg(url.url.href)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(files)
    }, [files])

    return (
        <div style={{ flexGrow: 1, margin: '5vw', marginTop: '15vh' }}>
            {
                loading ?
                    <div></div>
                    :
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
            }
            {img && <img src={img} />}
        </div>
    )
}

export default Upload;