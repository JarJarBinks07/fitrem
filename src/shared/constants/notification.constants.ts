import { LocalNotifications } from "@capacitor/local-notifications";

export const setTimerLocalNotification = async (workInterval: number) => {
  try {
    if ((await LocalNotifications.requestPermissions()).display !== "granted") {
      throw new Error("Permissions haven't been granted");
    }
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Friendly Reminder",
          body: "Get up and workout",
          id: 1,
          schedule: { at: new Date(Date.now() + workInterval) },
          extra: {
            data: "Pass data to your handler",
          },
          iconColor: "#FF7F50",
          sound: "birds.wav",
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

export const unsetTimerLocalNotifications = async () => {
  LocalNotifications.cancel({
    notifications: [{ id: 1 }],
  });
};
