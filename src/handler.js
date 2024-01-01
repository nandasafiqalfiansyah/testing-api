const qrcode = require("qrcode");

let qrCodeData = null;

const generateQRCode = (qr) => {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(qr, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        reject(err);
      } else {
        qrCodeData = url;
        console.log(qrCodeData)
        resolve(url);
      }
    });
  });
};

const getQRCodeData = () => {
  return qrCodeData;
};

const sendMessage = (client, req, res) => {
  const { number, message } = req.body;
  client.getNumberId(number)
    .then((contact) => {
      let formattedNumber = contact._serialized;
      client.sendMessage(formattedNumber, message)
        .then((response) => {
          let messageId = response.id._serialized;
          res.send({
            success: true,
            message: "Message sent successfully",
            data: {
              messageId,
            },
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: "Failed to send message",
            error: err.toString(),
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Failed to find contact",
        error: err.toString(),
      });
    });
};

module.exports = { generateQRCode, getQRCodeData, sendMessage };
