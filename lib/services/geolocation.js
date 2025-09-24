export function getPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation tidak didukung di browser ini."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      (err) => {
        console.error(" Geolocation error:", err.code, err.message);
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}
