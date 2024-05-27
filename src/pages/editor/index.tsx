import { Grid, SliderField, View, useTheme } from '@aws-amplify/ui-react';
import './style.css'

const Editor = () => {
    const { tokens } = useTheme();
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
            >
                <p>image</p>
            </View>
        </Grid>
    )
}

export default Editor;