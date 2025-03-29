import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const ProfileTab = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const slideInY = useSharedValue(-300); // Starting position for the slide-in effect

  // Slide-in and fade effect on mount
  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
    slideInY.value = withSpring(0, {damping: 12, stiffness: 120});
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value + slideInY.value}, // Combine slide-in with drag
      ],
      opacity: opacity.value,
    };
  });

  const panGesture = Gesture.Pan()
    .onChange(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      // Snap back to original position
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView className="flex-1 flex items-center justify-center">
        <Text className="text-3xl text-[#22c55e] font-Roboto-Black mb-8 ">
          Welcome to ProfileTab 🚀
        </Text>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Feather name="user" size={58} color="#FFFFFF" />
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },

  card: {
    width: 200,
    height: 200,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default ProfileTab;
