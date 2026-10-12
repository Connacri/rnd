import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Configuration Capacitor — conteneur Android natif du site RND-ORAN.
 *
 * - appId  : applicationId Google Play (= variable GitHub ANDROID_PACKAGE_NAME).
 *            NE PAS MODIFIER : un changement d'applicationId = nouvelle app Play Console.
 * - appName: nom affiché sous l'icône (identique au nom web).
 * - webDir : build web de production (généré par `npm run build`) embarqué dans l'app.
 */
const config: CapacitorConfig = {
  appId: 'com.rnd.dz',
  appName: 'RND-ORAN',
  webDir: 'dist',
  // Couleur de fond du WebView = fond clair de l'app (évite un flash blanc au démarrage).
  backgroundColor: '#FAF7F2',
};

export default config;
