import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "fitrem",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    LocalNotifications: {
      // smallIcon: "ic_stat_icon_config_sample",
      smallIcon: "ic_stat_default",
      iconColor: "#FF0000",
      sound: "birds.wav",
    },
  },
};

export default config;
