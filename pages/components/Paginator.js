import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions, TouchableOpacity, Image } from "react-native";


const Paginator = ({ data, scrollX, currentIndex, navigate }) => {
  const { width } = useWindowDimensions();

  return (
    <View>
      <View style={{ flexDirection: "row", alignSelf: "center", height: 64 }}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>

      {currentIndex === data.length - 1 &&
        <View style={[styles.getStarted, { height: 50 }]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={navigate}
            activeOpacity={.8}
          >
            <Image
              style={[{ width: 20, height: 20 ,tintColor:"#000000"}]}
              source={require("../../assets/images/right-arrow.png")}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000000",
    marginHorizontal: 8,
  },
  getStarted: {
    position: "absolute",
    right: 10,
    bottom: 35,
    zIndex:9
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Paginator;
