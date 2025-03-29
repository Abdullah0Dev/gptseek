import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const Test = () => {
  // Shared value for animation
  const translateX = useSharedValue(0);

  // Animated style using shared value
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  // Gesture for pan handling
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX; // Update position
    })
    .onEnd(() => {
      translateX.value = withSpring(0); // Reset position with spring animation
    });

  return (
    <SafeAreaView>
      <GestureDetector gesture={panGesture}>
        <Animated.Text
          className="text-primary-100 text-xl p-9 font-Roboto-Black"
          style={[{}, animatedStyle]}>
          Test
        </Animated.Text>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default Test;
