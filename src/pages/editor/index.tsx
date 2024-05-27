import { Flex, Grid, Heading, SliderField, View, useTheme, Image } from '@aws-amplify/ui-react';
import './style.css'
import { useEffect, useState } from 'react';
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate, useParams } from "react-router-dom";
import { getUrl } from 'aws-amplify/storage';

const client = generateClient<Schema>();
const Editor = () => {
    const { tokens } = useTheme();
    const { id } = useParams();

    const [err, setErr] = useState('');
    const [img, setImg] = useState('');

    const getData = async () => {
        try {
            if (id) {
                const { data: editData, errors } = await client.models.Edits.get({
                    id: id,
                });
                console.log(editData)
                if (errors || !editData || !editData.path) {
                    throw new Error('failed to load data.')
                }

                const url = await getUrl({ path: editData.path });
                if (!url.url) {
                    throw new Error('image not found');
                }
                setImg(url.url.href);

            } else {
                throw new Error('Image details does not exist.')
            }
        } catch (e) {
            setErr(e as string)
        }


    }
    useEffect(() => {
        getData();
    }, [])

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
    return (
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
                <div>
                    <SliderField
                        label="Blur"
                        max={100}
                        color='red'
                    />
                </div>
                <div>
                    <SliderField
                        label="Saturation"
                        max={100}
                        color='red'
                    />
                </div>
                <div>
                    <SliderField
                        label="Contrast"
                        max={100}
                        color='red'
                    />
                </div>
                <div>
                    <SliderField
                        label="Brightness"
                        max={100}
                        color='red'
                    />
                </div>
            </View>
            <View
                backgroundColor={tokens.colors.neutral[90]}
                borderRadius='8px'
                padding='40px'
            >
                <Image src={img} alt='image' width='100%'/>
            </View>
        </Grid>
    )
}

export default Editor;