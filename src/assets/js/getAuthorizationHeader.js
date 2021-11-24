import JsSHA from 'jssha';
/* ID 跟 金鑰 */
const AppID = 'e183b63973df4feeba93c18b3d768e58';
const AppKey = 'loO-sksi0M1j9heIVmB9NpwF9rI';

export default function () {
  /* HMAC的過程 */
  const GMTString = new Date().toGMTString();
  const ShaObj = new JsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update(`x-date: ${GMTString}`);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  // const Authorization = 'hmac username=\"' + AppID + '\",
  // algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return { Authorization, 'X-Date': GMTString };
}
