import { StyleSheet, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment-timezone';
import DropDown from './app/components/DropDown';
import AnalogClock from './app/components/AnalogClock';
import CustomBottomSheet from './app/components/custom/CustomBottomSheet';

const App = () => {
  const [options, setOptions] = useState(
    moment.tz.names().map((data) => ({
      code: data,
      description: data,
    }))
  );

  const defaultTimeZone = moment.tz.guess();
  const sortOptions = () => options.sort((a, b) => Number(b.code === selectedValue) - Number(a.code === selectedValue));

  const [selectedValue, setSelectedValue] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const [showBtmSheet, setShowBtmSheet] = useState(false);

  const [showBtnContainer, setShowBtnContainer] = useState(true);

  const bottomSheetRef = useRef(null);

  const [time, setTime] = useState(
    moment(new Date())
      .tz(selectedValue || defaultTimeZone)
      .format('hh:mm:ss')
  );

  const handleTextChange = (newText) => {
    setSearchValue(newText);
    setFilteredOptions(options.filter((data) => String(data.code).includes(newText)));
  };

  const handleOnSelect = (code, description) => {
    setSelectedValue(code);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const time = moment(new Date())
        .tz(selectedValue || defaultTimeZone)
        .format('hh:mm:ss A');
      setTime(time);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedValue]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowBtnContainer(false);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowBtnContainer(true);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.maincontainer}>
        <View style={styles.country}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{selectedValue || defaultTimeZone}</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{time}</Text>
        </View>

        <AnalogClock showNumbers timeZone={selectedValue || defaultTimeZone} />
        {showBtmSheet && (
          <CustomBottomSheet
            setShowBtmSheet={setShowBtmSheet}
            clearSearch={() => handleTextChange('')}
            // sort={() => setFilteredOptions(sortOptions())}
          >
            <DropDown
              data={filteredOptions}
              label='Available Timezones'
              placeholder='Search timezone'
              searchValue={searchValue}
              selectedValue={selectedValue}
              handleOnSelect={handleOnSelect}
              handleTextChange={handleTextChange}
            />
          </CustomBottomSheet>
        )}
        {!showBtmSheet && showBtnContainer && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.country, { backgroundColor: 'lightblue', borderColor: 'lightblue' }]}
            onPress={() => setShowBtmSheet(true)}>
            <Text style={{ fontWeight: 'bold' }}>Select Timezone</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  country: {
    backgroundColor: 'lightblue',
    width: 300,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
