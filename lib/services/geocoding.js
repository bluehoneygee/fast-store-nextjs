import { geocodingApi } from "../axios";

export function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function getAddress({ latitude, longitude }) {
  const { data } = await geocodingApi.get("", {
    params: { latitude, longitude },
  });

  const address = `${data.locality || ""}, ${data.city || ""} ${
    data.postcode || ""
  }, ${data.countryName || ""}`.trim();

  return { address, position: { latitude, longitude } };
}
