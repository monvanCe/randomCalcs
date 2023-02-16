import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';

import Data from './Data';

const App = () => {
  const [value1, setvalue1] = useState(0);
  const [value2, setvalue2] = useState(0);
  const [op, setop] = useState('+');
  const [value, setvalue] = useState('');
  const [state, setstate] = useState(false);
  const [comp, setcomp] = useState(0);

  const {height, width} = Dimensions.get('window');

  const click = key => {
    value.length < 2 && setvalue(value + key);

    let checkvalue = value + key;

    if (op === '+' && checkvalue == value1 + value2) {
      setstate(true);
      setcomp(comp + 1);
      setTimeout(() => {
        setstate(false);
        grandoms();
      }, 500);
    } else if (op === '-' && checkvalue == value1 - value2) {
      setstate(true);
      setcomp(comp + 1);
      setTimeout(() => {
        setstate(false);
        grandoms();
      }, 500);
    } else if (op === 'x' && checkvalue == value1 * value2) {
      setstate(true);
      setcomp(comp + 1);
      setTimeout(() => {
        setstate(false);
        grandoms();
      }, 500);
    }
  };

  useEffect(() => {
    grandoms();
  }, []);

  async function grandoms() {
    setvalue1(Math.floor(Math.random() * 10));

    setvalue2(Math.floor(Math.random() * 10));

    switch (Math.floor(Math.random() * 3)) {
      case 0:
        setop('+');
        break;
      case 1:
        setop('-');
        break;
      case 2:
        setop('x');
        break;
    }
    setvalue('');
  }

  const dlt = () => {
    setvalue(value.substring(0, value.length - 1));
  };

  return (
    <View style={[styles.container, {flex: 1, backgroundColor: 'white'}]}>
      {/* soru kısmının görüntülendiği view */}
      <View
        style={[
          styles.question,
          {flex: 5, backgroundColor: state ? '#8bd6c2' : '#d0c9e7'},
        ]}>
        <View style={styles.questionhr} />
        <View
          style={[
            styles.questionblank,
            {
              height: height / 7,
              width: height / 7,
              borderRadius: height / 14,
            },
          ]}
        />
        <Text
          style={[
            styles.questiontext,
            {color: 'white', top: 0, fontSize: height / 11.5},
          ]}>
          {value1}
        </Text>
        <Text
          style={[
            styles.questiontext,
            {color: state ? '#8bd6c2' : '#9182c5', fontSize: height / 10},
          ]}>
          {op}
        </Text>
        <Text
          style={[
            styles.questiontext,
            {color: 'white', bottom: 0, fontSize: height / 11.5},
          ]}>
          {value2}
        </Text>
      </View>

      {/* kullanıcının girdisinin görüntülendiği view */}
      <View style={[styles.input, {flex: 1}]}>
        <View style={styles.inputhr} />
        <View style={styles.inputblock} />
        <View style={styles.inputblockinner} />
        <Text style={[styles.inputtext, {fontSize: height / 20}]}>{value}</Text>
        <Text style={[styles.progress, {fontSize: height / 32}]}>{comp} </Text>
      </View>

      {/* kullanıcı girdisi için konulan numpad view'ı */}
      <View style={{flex: 5}}>
        <FlatList
          style={{}}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            marginRight: 10,
            marginLeft: 10,
          }}
          numColumns={3}
          data={Data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  item.onp == 'click' ? click(item.value) : dlt();
                }}
                activeOpacity={0.7}
                style={{
                  height: height / 12,
                  width: width / 5.2,
                  borderRadius: 15,
                  backgroundColor: '#f6c2c3',
                  marginHorizontal: '5%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: height / 20, color: '#e7696b'}}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: '6.5%',
    paddingBottom: '5%',
  },
  question: {
    borderRadius: 40,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionhr: {
    position: 'absolute',
    height: '10%',
    width: '100%',
    backgroundColor: 'white',
  },
  questionblank: {
    position: 'absolute',
    backgroundColor: 'white',
  },
  questiontext: {
    position: 'absolute',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputhr: {
    height: '9%',
    width: '100%',
    backgroundColor: '#8c8c8c',
    borderRadius: 40,
  },
  inputblock: {
    height: '81%',
    width: '23%',
    backgroundColor: '#8c8c8c',
    position: 'absolute',
    borderRadius: 10,
  },
  inputblockinner: {
    height: '65%',
    width: '20%',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 5,
  },
  inputtext: {
    position: 'absolute',
    color: 'black',
    opacity: 0.65,
    letterSpacing: 2,
  },
  progress: {
    position: 'absolute',
    color: 'black',
    left: '62%',
    top: 0,
  },
});

export default App;
