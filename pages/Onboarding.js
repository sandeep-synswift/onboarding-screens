import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated, Text,
} from 'react-native';
import OnboardingItem from './components/OnboardingItem';
import slides from './components/slides';
import Paginator from './components/Paginator';

const Onboarding = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [existingSlides, setExistingSlides] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const slideAnim = useRef(
    new Animated.Value(slides[currentIndex].prevPos),
  ).current;
  const viewableItemsChanged = useRef(({viewableItems, changed}) => {
    setCurrentIndex(viewableItems[0].index);
    setSelectedIndex(changed[0].index);
    Animated.timing(slideAnim, {
      toValue: changed[0].item.top,
      duration: 500,
      useNativeDriver: true,
    }).start();
    if (!existingSlides.includes(changed[0].index)) {
      setTimeout(() => {
        existingSlides.push(changed[0].index);
        setExistingSlides(existingSlides);
      }, 1000);
    }
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.skip]}>
       <Text>Skip</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Animated.Image
          source={require('../assets/images/logo.png')}
          style={[styles.verticalLogo, {transform: [{translateY: slideAnim}]}]}
        />
        <FlatList
          data={slides}
          extraData={currentIndex}
          renderItem={({item, index}) => (
            <OnboardingItem
              existingSlides={existingSlides}
              selectedIndex={selectedIndex}
              currentIndex={index}
              item={item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View style={{flex: 0, width: '100%'}}>
        <Paginator
          data={slides}
          scrollX={scrollX}
          currentIndex={currentIndex}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLogo: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 0,
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 40,
    zIndex: 99,
    padding: 20,
  },
});

export default Onboarding;
