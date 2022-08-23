import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Identicon from 'identicon.js';

export default function IdenticonAvatar({text, size = 18}) {
  const [img, setImg] = useState('');

  useEffect(() => {
    if (text) {
      const _text = text + 'fshd3782hdje872jsahdwq';
      let textHexValue = '';
      for (let i = 0; i < _text.length; i++) {
        textHexValue += _text.charCodeAt(i).toString(16);
      }
      const identicon = new Identicon(textHexValue, 30).toString();
      setImg(`data:image/png;base64,${identicon}`);
    }
  }, [text]);

  if (!img) {
    return null;
  }

  return (
    <View style={{marginRight: 5}}>
      <Image
        source={[{uri: img}]}
        style={{
          height: size,
          width: size,
          borderRadius: size,
        }}
      />
    </View>
  );
}
