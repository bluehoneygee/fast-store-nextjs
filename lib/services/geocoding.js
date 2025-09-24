import axios from "axios";

export async function reverseGeocode({ latitude, longitude }) {
  const { data } = await axios.get(
    "https://api.bigdatacloud.net/data/reverse-geocode-client",
    {
      params: { latitude, longitude },
    }
  );

  const address = `${data.locality || ""}, ${data.city || ""} ${
    data.postcode || ""
  }, ${data.countryName || ""}`.trim();

  return { address, raw: data };
}
