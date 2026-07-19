# 🚀 GitHub Pages Deploy — 1-minute setup

Because the automation bot can't create workflow files, please copy this file yourself (one time only).

### Steps

1. Move the workflow into the correct location:
   ```bash
   mkdir -p .github/workflows
   mv portfolio/deploy-workflow-template/deploy-portfolio.yml .github/workflows/
   git add .github/workflows/deploy-portfolio.yml
   git commit -m "ci: add portfolio deploy workflow"
   git push
   ```

2. On GitHub, go to **Settings → Pages** and set **Source = GitHub Actions**.

3. Done! Every push to `main` that touches `portfolio/**` will auto-deploy to:
   ```
   https://<your-username>.github.io/youtube-automation-command-center/
   ```

You can also trigger it manually from the **Actions** tab (workflow_dispatch).
