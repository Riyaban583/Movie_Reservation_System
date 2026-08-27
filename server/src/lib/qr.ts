import QRCode from "qrcode";

export async function generateQRCode(data: string) {
  const qrCode = await QRCode.toDataURL(data);

  return qrCode;
}