import { Button, Flex, Grid, Heading, SliderField, View, useTheme } from '@aws-amplify/ui-react';
import './style.css'
import { useEffect, useRef, useState } from 'react';
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useParams } from "react-router-dom";
import { getUrl } from 'aws-amplify/storage';
import ShareModal from '../../components/share-modal';

const enum Filter {
    BRIGHTNESS = 'brightness',
    BLUR = 'blur',
    SATURATION = 'saturation',
    CONTRAST = 'contrast',
    GRAYSCALE = 'grayscale'
}

const client = generateClient<Schema>();
const Editor = () => {
    const { tokens } = useTheme();
    const { id } = useParams();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [err, setErr] = useState('');
    const [img, setImg] = useState('');
    // const [rotate, setRotate] = useState(0);
    // const [flipHorizontal, setFlipHorizontal] = useState(false);
    // const [flipVertical, setFlipVertical] = useState(false);
    // const [zoom, setZoom] = useState(1);


    // const [isDragging, setIsDragging] = useState(false);

    // const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
    // const [offsetX, setOffsetX] = useState(0);
    // const [offsetY, setOffsetY] = useState(0);

    const [editData, setEditData] = useState<null | Schema['Edits']['type']>(null);
    const [show, setShow] = useState(false);

    const showModal = () => {
      setShow(true);
    };
  
    const hideModal = () => {
      setShow(false);
    };

    const assignDefaultValues = (data: Schema['Edits']['type']): Schema['Edits']['type'] => {
        return {
            ...data,
            saturation: data.saturation === null ? '100' : data.saturation,
            blur: data.blur === null ? '0' : data.blur,
            contrast: data.contrast === null ? '100' : data.contrast,
            brightness: data.brightness === null ? '100' : data.brightness,
            grayscale: data.grayscale === null ? '0' : data.grayscale
        };
    }

    const getData = async () => {
        try {
            if (id) {
                const { data, errors } = await client.models.Edits.get({
                    id: id,
                });
                if (errors || !data || !data.path) {
                    throw new Error('failed to load data.')
                }
                const processedEditData = assignDefaultValues(data);
                setEditData(processedEditData);

                const url = await getUrl({ path: data.path });
                if (!url.url) {
                    throw new Error('image not found');
                }
                setImg(url.url.href);

            } else {
                throw new Error('Image details does not exist.')
            }
        } catch (e) {
            console.log(e)
            setErr('failed to load image')
        }


    }
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        applyFilter();
    }, [
        img,
        // rotate,
        // flipHorizontal,
        // flipVertical,
        // zoom,
        editData,
        // offsetX,
        // offsetY,
    ]);

    const applyFilter = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = img;
        image.onload = () => {
            if (canvas && context) {
                const zoom = 1;
                const zoomedWidth = image.width * zoom;
                const zoomedHeight = image.height * zoom;
                const translateX = (image.width - zoomedWidth) / 2;
                const translateY = (image.height - zoomedHeight) / 2;

                const aspectRatio = image.width / image.height;

                // Calculate the maximum width and height that fits the container
                const maxWidth = canvas.parentElement!.clientWidth - 80;
                const maxHeight = canvas.parentElement!.clientHeight - 80;
                let scaledWidth = maxWidth;
                let scaledHeight = maxHeight;

                if (maxWidth / aspectRatio > maxHeight) {
                    scaledWidth = maxHeight * aspectRatio;
                } else {
                    scaledHeight = maxWidth / aspectRatio;
                }

                // Set canvas dimensions to maintain aspect ratio
                canvas.width = scaledWidth;
                canvas.height = scaledHeight;
                context.filter = getFilterString();
                context.save();
                const rotate = false;
                const flipHorizontal = false;
                const flipVertical = false;
                if (rotate) {
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    context.translate(centerX, centerY);
                    context.rotate((rotate * Math.PI) / 180);
                    context.translate(-centerX, -centerY);
                }
                if (flipHorizontal) {
                    context.translate(canvas.width, 0);
                    context.scale(-1, 1);
                }
                if (flipVertical) {
                    context.translate(0, canvas.height);
                    context.scale(1, -1);
                }
                context.translate(translateX, translateY);

                // context.translate(offsetX, offsetY);

                context.scale(zoom, zoom);
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                context.restore();
            }
        };
    };

    const getFilterString = () => {
        if (!editData) return '';
        return `brightness(${editData.brightness}%) contrast(${editData.contrast}%) grayscale(${editData.grayscale}%) saturate(${editData.saturation}%) blur(${editData.blur}px)`;
    };

    if (err) {
        return (
            <Flex
                justifyContent='center'
                alignItems='center'
                height='100%'
            >
                <Heading
                    level={2}
                    color='white'
                >
                    {err}
                </Heading>
            </Flex>
        )
    }

    const handleFilterValue = (filter: Filter, value: number) => {
        const edt: Schema['Edits']['type'] = editData!;
        edt[filter] = value.toString();
        setEditData({ ...edt });
        client.models.Edits.update(edt)
    }

    const downloadImage = ()=> {
        const canvas = canvasRef.current;
		if (canvas) {
			canvas.toBlob((blob) => {
				if (blob) {
					// const editedFile = new File([blob], editData!.path!, { type: blob.type });
						const objectUrl = URL.createObjectURL(blob);
						const linkElement = document.createElement('a');
						linkElement.download = `${editData!.path!}`;
						linkElement.href = objectUrl;
						linkElement.click();
						URL.revokeObjectURL(objectUrl);
					// onSaveImage(editedFile);
					// if (onClose) {
					// 	onClose();
					// }
				}
				// resetImage();
			});
		}
    }
    return (
        <>
        <Grid
            templateColumns={{ base: '1fr', large: '1fr 2fr' }}
            templateRows={{ base: 'repeat(2, 10rem)', large: 'auto' }}
            gap={10}
            height='100%'
        >
            <View
                backgroundColor={tokens.colors.neutral[100]}
                padding='40px 20px'
                overflow='auto'
            >
                {editData && (
                    <Flex style={{ flexDirection: 'column', height: '100%'}}>
                        <div style={{flexGrow: '1',}}>
                            <div>
                                <SliderField
                                    label="Blur"
                                    max={100}
                                    color='red'
                                    onChange={(e) => handleFilterValue(Filter.BLUR, e)}
                                    defaultValue={parseInt(editData.blur!)}
                                />
                            </div>
                            <div>
                                <SliderField
                                    label="Saturation"
                                    max={100}
                                    color='red'
                                    onChange={(e) => handleFilterValue(Filter.SATURATION, e)}
                                    defaultValue={parseInt(editData.saturation!)}
                                />
                            </div>
                            <div>
                                <SliderField
                                    label="Contrast"
                                    max={100}
                                    color='red'
                                    onChange={(e) => handleFilterValue(Filter.CONTRAST, e)}
                                    defaultValue={parseInt(editData.contrast!)}
                                />
                            </div>
                            <div>
                                <SliderField
                                    label="Brightness"
                                    max={100}
                                    color='red'
                                    onChange={(e) => handleFilterValue(Filter.BRIGHTNESS, e)}
                                    defaultValue={parseInt(editData.brightness!)}
                                />
                            </div>
                            <div>
                                <SliderField
                                    label="Grayscale"
                                    max={100}
                                    color='red'
                                    onChange={(e) => handleFilterValue(Filter.GRAYSCALE, e)}
                                    defaultValue={parseInt(editData.grayscale!)}
                                />
                            </div>
                        </div>
                        <div>
                            <Flex justifyContent='space-around'>
                                <Button size="small" isFullWidth={false} onClick={downloadImage}>Download</Button>
                                <Button variation="primary" size="small" isFullWidth={false} onClick={showModal}>Share</Button>
                            </Flex>
                        </div>
                    </Flex>
                )}
            </View>
            <View
                backgroundColor={tokens.colors.neutral[90]}
                borderRadius='8px'
                padding='40px'
            >
                <canvas id='canvas' ref={canvasRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }} />
            </View>
        </Grid>
        <ShareModal show={show} hideModal={hideModal} link={window.location.href}/>
        </>
    )
}

export default Editor;