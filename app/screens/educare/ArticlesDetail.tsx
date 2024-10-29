// screens/Educare/ArticlesDetail.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'ArticlesDetail'>;

const ArticlesDetail: React.FC = () => {
  const route = useRoute<NewsDetailRouteProp>();
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        // Memblokir URL dari domain iklan
        onShouldStartLoadWithRequest={(request) => {
          const blockedDomains = [
            'ads.cnn.com',
            'doubleclick.net',
            'googleads.g.doubleclick.net',
            'adservice.google.com',
            'youtube.com', 
            'mgid.com',  
            'video.ads',
            'videoplaza.tv'
          ];
          const requestUrl = request.url;

          // Cek apakah URL mengandung domain yang terblokir
          if (blockedDomains.some(domain => requestUrl.includes(domain))) {
            return false;
          }

          return true;
        }}
        setSupportMultipleWindows={false}

        mediaPlaybackRequiresUserAction={true}
        injectedJavaScript={`
          (function() {
            var adElements = document.querySelectorAll('[id^="ad-"], [class*="ads"], [class*="advertisement"], [class*="sponsored"], iframe, video');
            adElements.forEach(function(ad) {
              ad.style.display = 'none';
            });

            var body = document.querySelector('body');
            if (body) {
              body.addEventListener('click', function(event) {
                var target = event.target;
                if (target && (target.classList.contains('popup') || target.classList.contains('modal'))) {
                  event.preventDefault();
                }
              }, true);
            }
          })();
        `}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ArticlesDetail;
