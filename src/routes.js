const { generateQRCode, getQRCodeData } = require("./handler");
const { Client, LocalAuth } = require("whatsapp-web.js");

// Create the client instance
const client = new Client({
  auth: new LocalAuth(),
});

// Manually trigger the QR code generation
const generateQROnDemand = async () => {
  try {
    const qrCode = await client.generateQR();
    await generateQRCode(qrCode);
    console.log("QR code generated successfully.");
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};

const routes = [
  {
    method: `GET`,
    path: `/`,
    handler: (request, h) => {
      console.log("Handling GET request to /");
      return h.response({ status: 'server running status 200' }).code(200);
    },
  },
  {
    method: `GET`,
    path: `/qr`,
    handler: async (request, h) => {
      console.log("Handling GET request to /qr");
      await generateQROnDemand();
      const qrCodeData = getQRCodeData();
      if (qrCodeData) {
        return h.response({ qrCode: qrCodeData }).code(200);
      } else {
        return h.response({ error: "QR code not available yet" }).code(404);
      }
    },
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
    },
  },
];

module.exports = routes;
