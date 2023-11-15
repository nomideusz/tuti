import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

const analytics = Analytics({
  app: 'app-name',

  plugins: [
    googleAnalytics({
      trackingId: 'G-8R12WG9TGW'
    })
  ]
});

export default analytics;
