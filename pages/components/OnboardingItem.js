import React, {useEffect, useRef} from "react";
import {View, StyleSheet, Image, useWindowDimensions, Animated, Text} from "react-native";

const OnboardingItem = ({item, selectedIndex, currentIndex, existingSlides}) => {
    const {width,height} = useWindowDimensions();
    const slideAnim = useRef(new Animated.Value(400)).current;
    const slideTextAnim = useRef(new Animated.Value(200)).current;

    useEffect(() => {
        if (!existingSlides.includes(selectedIndex)) {
            slideAnim.setValue(400);
            slideTextAnim.setValue(200);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }).start();

            Animated.timing(slideTextAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [selectedIndex]);

    console.log(height)
    return (
        <View style={[styles.container, {width:width,height:height}]}>
            {selectedIndex === currentIndex || existingSlides.includes(selectedIndex) ?
                <Animated.View style={[{alignItems: "center", transform: [{translateX: slideAnim}]}]}>
                    <Image
                        source={item?.image}
                        style={{height: "75%", resizeMode: "contain"}}
                    />
                </Animated.View>
                :
                <View style={{height: "75%", resizeMode: "contain"}}>
                    <></>
                </View>
            }

            {selectedIndex === currentIndex || existingSlides.includes(selectedIndex) ?
                <Animated.View style={[{paddingHorizontal:15,
                    transform: [{translateX: slideTextAnim}]}]}>
                    <Text style={{fontSize:20}}>{item?.title}</Text>
                    <View style={[{marginTop:10}]}/>
                    <Text style={{fontSize:14}}>Lorem ipsum is derived from the Latin</Text>
                </Animated.View> :
                <View style={[{marginTop:15}]}>
                    <></>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 100,
    },

    verticalLogo: {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 0,
    },
    image: {
        flex: .5,
        justifyContent: "center",
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
        color: "#493d8a",
    },
    description: {
        fontWeight: "300",
        color: "#62656b",
    },
});

export default OnboardingItem;
