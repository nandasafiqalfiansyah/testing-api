const { generateQRCode, getQRCodeData } = require("./handler");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  auth: new LocalAuth(),
});

client.on("qr", async (qr) => {
  try {
    await generateQRCode(qr);
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
});
const routes =[
  {
    method: `GET`,
    path: `/`,
    handler: (request, h) => {
     return h.response({ status: 'server running status 200' }).code(200);
  }
  },
  {
    method: `GET`,
    path: `/qr`,
    handler: (request, h) => {
      const qrCodeData = getQRCodeData();
      if (qrCodeData) {
        return h.response({ qrCode: qrCodeData }).code(200);
      } else {
        return h.response({ error: "QR code not available yet" }).code(404);
      }
  }
},

{
  method: `POST`,
  path: `/send-message`,
  handler:(req, res) => {
    sendMessage(client, req, res);
  }
},
]

module.exports = routes;
client.initialize();