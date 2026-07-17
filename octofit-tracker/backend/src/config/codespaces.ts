const codespaceName = process.env.CODESPACE_NAME;
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const localApiUrl = `http://localhost:${port}`;
const codespacesApiUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : localApiUrl;

export const apiUrl = codespaceName ? codespacesApiUrl : localApiUrl;
