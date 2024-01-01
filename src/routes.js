const { generateQRCode, getQRCodeData } = require("./handler");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  auth: new LocalAuth(),
});

client.on("qr", async (qr) => {
  try {
    console.log("QR code event received. Generating QR code...");
    await generateQRCode(qr);
    console.log("QR code generated successfully.");
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
});

const routes = [
  {
    method: `GET`,
    path: `/`,
    handler: (request, h) => {
      console.log("Handling GET request to /");
      return h.response({ status: 'server running status 200' }).code(200);
    }
  },
  {
    method: `GET`,
    path: `/qr`,
    handler: (request, h) => {
      console.log("Handling GET request to /qr");
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
    handler: async (req, res) => {
      try {
        console.log("Handling POST request to /send-message");
        // Assume sendMessage is an asynchronous function that handles sending messages
        await sendMessage(client, req, res);
        console.log("Message sent successfully.");
      } catch (error) {
        console.error("Error sending message:", error);
        res.response({ error: "Internal Server Error" }).code(500);
      }
    }
  },
];

module.exports = routes;

// Initialize the WhatsApp client after defining routes
client.initialize();
