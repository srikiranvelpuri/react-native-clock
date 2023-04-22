import { StyleSheet, Text, View, TouchableOpacity, Keyboard, FlatList } from 'react-native';

import React, { useState, useEffect } from 'react';

import { Colors, alternateBgRowStyle } from '../utils';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DropDown = (props) => {
  const getSelected = (code = '') => {
    const val = code || props.selectedValue;
    let sObj = {};
    val && (sObj[val] = true);
    return sObj;
  };

  const [selected, setSelected] = useState(getSelected());

  const resetState = () => {
    setSearchQuery('');
    setSearchResult([]);
  };

  const handleSave = (code, description) => {
    if (selected[code]) {
      setSelected({});
      props?.handleOnSelect(undefined, undefined);
    } else {
      setSelected(getSelected(code));
      props?.handleOnSelect(code, description);
    }
  };

  const clear = () => {
    setSelected({});
    handleSave('', '');
  };

  const Header = (headerProps) => {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={[styles.label]}>{headerProps?.label}</Text>
      </View>
    );
  };

  const FlatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.mainContainer}>
      <Header label={props?.label} />
      <View style={{ borderWidth: 1, borderRadius: 5, borderColor: 'lightgrey' }}>
        <TextInput
          placeholder={props?.placeholder}
          value={props?.searchValue}
          onChangeText={(text) => props?.handleTextChange(text)}
        />
      </View>
      {props?.data?.length > 0 ? (
        <FlatList
          data={props?.data}
          renderItem={({ item, index, separator }) => {
            const isSelected = selected[item.code] || false;
            return (
              <TouchableOpacity onPress={() => handleSave(item.code, item.description || '')}>
                <View
                  style={[
                    styles.descriptionSubContainer,
                    alternateBgRowStyle(index),
                    isSelected && { borderColor: Colors.BLU_BLUE, borderWidth: 2 },
                  ]}>
                  <Text style={descriptionTextStyle(isSelected)}>{item.description}</Text>
                  {isSelected && <Icon name='clock-check-outline' size={25} color={Colors.BLU_BLUE} />}
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListHeaderComponent={FlatListItemSeparator}
          ListFooterComponent={FlatListItemSeparator}
          keyExtractor={(item) => `${item.code}`}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 30, alignItems: 'center' }}>
          <Icon name='heart-broken' size={100} />
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>No data found</Text>
        </View>
      )}
    </View>
  );
};

const descriptionTextStyle = (isSelected) => [
  styles.txtStyle,
  isSelected && { color: Colors.BLU_BLUE, fontWeight: 'bold' },
];

export default DropDown;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
  },
  descriptionSubContainer: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  txtStyle: {
    color: Colors.GRAY_DARK,
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: '#ffffff11',
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  label: {
    color: Colors.GRAY_DARK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    height: 0.5,
    width: '100%',
    color: 'black',
  },
});
