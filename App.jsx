import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import Onboarding from "./pages/Onboarding";

const App =()=>{
  return (
    <View style={styles.container}>
      <Onboarding/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default App;
