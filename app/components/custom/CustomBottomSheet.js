import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from '@gorhom/bottom-sheet';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CustomBottomSheet = (props) => {
  // variables
  const snapPoints = useMemo(() => [0, '50%', '70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === 0) {
      props?.setShowBtmSheet(false);
      props?.clearSearch();
    }
  }, []);

  const handleSnap = useCallback((index) => {
    props?.bottomSheetRef.current?.snapTo(index);
  }, []);

  const handleClosePress = () => {
    props?.bottomSheetRef.current?.close();
    props?.setShowBtmSheet(false);
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheet
          ref={props?.bottomSheetRef}
          enableContentPanningGesture={false}
          index={2}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          {props?.children}
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  contentContainer: {
    flex: 1,
  },
});

export default CustomBottomSheet;
