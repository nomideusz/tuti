import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

export const analytics = Analytics({
  app: 'tutitutu',

  plugins: [
    googleAnalytics({
      measurementIds: ['G-8R12WG9TGW']
    })
  ]
});
