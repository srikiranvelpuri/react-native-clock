import moment from 'moment-timezone';
import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';

var image = require('../assets/clockBG.png');

const AnalogClock = (props) => {
  const date = moment(new Date()).tz(props.timeZone);

  const getClockData = (sec, min, hour) => ({
    sec: sec * 6,
    min: min * 6 + (sec * 6) / 60,
    hour: ((hour % 12) / 12) * 360 + 90 + (min * 6 + (sec * 6) / 60) / 12,
  });

  const [state, setState] = useState({
    ...getClockData(date.seconds(), date.minutes(), date.hours()),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const date = moment(new Date()).tz(props.timeZone);
      setState({
        ...getClockData(date.seconds(), date.minutes(), date.hours()),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [props.timeZone]);

  const styles = StyleSheet.create({
    clockFrame: {
      width: props.clockSize,
      height: props.clockSize,
      position: 'relative',
      borderColor: 'lightblue',
      borderWidth: props.clockBorderWidth,
      borderRadius: props.clockSize / 2,
    },

    clockHolder: {
      width: props.clockSize,
      height: props.clockSize,
      position: 'absolute',
      right: -props.clockBorderWidth,
      bottom: -props.clockBorderWidth,
    },

    clockFace: {
      width: props.clockCentreSize,
      height: props.clockCentreSize,
      backgroundColor: props.clockCentreColor,
      borderRadius: props.clockCentreSize / 2,
      top: (props.clockSize - props.clockCentreSize) / 2,
      left: (props.clockSize - props.clockCentreSize) / 2,
    },

    hourHandStyles: {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: props.hourHandColor,
      top: props.clockSize / 2,
      left: props.clockSize / 2,
      marginVertical: -props.hourHandWidth,
      marginLeft: -props.hourHandLength / 2,
      paddingVertical: props.hourHandWidth,
      paddingLeft: props.hourHandLength,
      borderTopLeftRadius: props.hourHandCurved ? props.hourHandWidth : 0,
      borderBottomLeftRadius: props.hourHandCurved ? props.hourHandWidth : 0,
    },

    minuteHandStyles: {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: props.minuteHandColor,
      top: props.clockSize / 2,
      left: props.clockSize / 2,
      marginTop: -(props.minuteHandLength / 2),
      marginHorizontal: -props.minuteHandWidth,
      paddingTop: props.minuteHandLength,
      paddingHorizontal: props.minuteHandWidth,
      borderTopLeftRadius: props.minuteHandCurved ? props.minuteHandWidth : 0,
      borderTopRightRadius: props.minuteHandCurved ? props.minuteHandWidth : 0,
    },

    secondHandStyles: {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: 'orange',
      top: props.clockSize / 2,
      left: props.clockSize / 2,
      marginTop: -(props.secondHandLength / 2),
      marginHorizontal: -props.secondHandWidth,
      paddingTop: props.secondHandLength,
      paddingHorizontal: props.secondHandWidth,
      borderTopLeftRadius: props.secondHandCurved ? props.secondHandWidth : 0,
      borderTopRightRadius: props.secondHandCurved ? props.secondHandWidth : 0,
    },
  });

  return (
    <View style={styles.clockFrame}>
      {props?.showNumbers && (
        <Image
          style={{
            width: props.clockSize - props.clockBorderWidth * 2,
            height: props.clockSize - props.clockBorderWidth * 2,
          }}
          resizeMode='stretch'
          source={image}
        />
      )}
      <View style={styles.clockHolder}>
        <View
          style={[
            styles.hourHandStyles,
            {
              transform: [
                { rotate: state.hour + 'deg' },
                {
                  translateX: -(props.hourHandOffset + props.hourHandLength / 2),
                },
              ],
            },
          ]}
        />

        <View
          style={[
            styles.minuteHandStyles,
            {
              transform: [
                { rotate: state.min + 'deg' },
                {
                  translateY: -(props.minuteHandOffset + props.minuteHandLength / 2),
                },
              ],
            },
          ]}
        />

        <View
          style={[
            styles.secondHandStyles,
            {
              transform: [
                { rotate: state.sec + 'deg' },
                {
                  translateY: -(props.secondHandOffset + props.secondHandLength / 2),
                },
              ],
            },
          ]}
        />

        <View style={styles.clockFace} />
      </View>
    </View>
  );
};

AnalogClock.defaultProps = {
  timeZone: moment.tz.guess(),
  showNumbers: false,
  clockSize: 270,
  clockBorderWidth: 7,
  clockCentreSize: 15,
  clockCentreColor: 'lightblue',
  hourHandColor: 'yellow',
  hourHandCurved: true,
  hourHandLength: 70,
  hourHandWidth: 5.5,
  hourHandOffset: 0,
  minuteHandColor: 'yellow',
  minuteHandCurved: true,
  minuteHandLength: 100,
  minuteHandWidth: 5,
  minuteHandOffset: 0,
  secondHandColor: 'yellow',
  secondHandCurved: false,
  secondHandLength: 120,
  secondHandWidth: 2,
  secondHandOffset: 0,
};

export default AnalogClock;
