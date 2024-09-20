const { Storage } = require("@google-cloud/storage")

const storage = new Storage({keyFilename: '/etc/secrets/key.json'});

const uploadBackup = async (filepath, storagepath) => {
  try {
      const gcs = storage.bucket("gs://dwk-project-backup")

      const result = await gcs.upload(filepath, {
          destination: storagepath,
          public: true,
          metadata: {
              contentType: "application/plain", //application/csv for excel or csv file upload
          }
      })
      return result[0].metadata.mediaLink

  } catch (error) {
      console.log(error)
      throw new Error(error.message)
  }
}

uploadBackup()