export async function getIftarFromAladhan(
  date: Date,
  latitude = 41.0082,
  longitude = 28.9784,
  method = 13 // default to Turkey (Diyanet) method
): Promise<Date | null> {
  try {
    const timestamp = Math.floor(date.getTime() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const maghrib: string | undefined = json?.data?.timings?.Maghrib;
    if (!maghrib) return null;
    const [hh, mm] = maghrib.split(":").map((s: string) => parseInt(s, 10));
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    const d = new Date(date);
    d.setHours(hh, mm, 0, 0);
    return d;
  } catch (err) {
    return null;
  }
}
