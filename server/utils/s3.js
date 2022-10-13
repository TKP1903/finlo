const AWS = require("aws-sdk");

// AWS s3 bucket config
const s3Bucket = new AWS.S3({
  accessKeyId: "AKIA2F63XO46OZSEP7G4",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3Upload = (options) => {
  return new Promise((resolve, reject) =>
    s3Bucket.upload(options, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    })
  );
};
module.exports = s3Upload;
