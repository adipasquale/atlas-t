module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  "github-publish": {
    enabled: true,
    config: {
      owner: "adipasquale",
      repo: "atlas-t",
      workflow_id: "www-deploy-gh-pages.yml",
      token: env("GITHUB_TOKEN"),
      branch: "main"
    }
  },

});
