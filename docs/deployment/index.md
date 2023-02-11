# Deployment

## How to migrate to prod db

Use script:

```json
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
```

[Source](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel#1-create-the-project-and-deploy-to-vercel)
