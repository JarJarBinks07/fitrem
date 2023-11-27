addEventListener("fetchTest", async (resolve, reject, args) => {
  try {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) {
      throw new Error("Could not fetch user");
    }
    const result = await res.json();
    resolve(result["results"][0]);
    console.log(result);
  } catch (err) {
    console.error(err);
    reject(err);
  }
});

addEventListener("notificationTest", async (resolve, reject, args) => {
  try {
    let scheduleDate = new Date();
    scheduleDate.setSeconds(scheduleDate.getSeconds() + 5);
    CapacitorNotifications.schedule([
      {
        id: 42,
        title: "Background Magic 🧙‍♂️",
        body: "This comes from the background runner",
        scheduleAt: scheduleDate,
      },
    ]);
    resolve();
    console.log("Notification DONE");
  } catch (err) {
    console.error(err);
    reject(err);
  }
});
