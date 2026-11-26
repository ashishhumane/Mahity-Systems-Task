# SourceControl

A React and TypeScript site with Vite, React Router, and a Google Apps Script contact endpoint.

```sh
npm install
npm run dev
npm run build
```

- `src/app` contains routing.
- `src/pages` composes route-level screens.
- `src/components` contains shared layout, links, and form controls.
- `src/features` contains the evidence demo and contact submission.
- `apps-script/Code.gs` contains the Google Sheets handler.

## Contact setup

1. Create a private Google Sheet with a tab named `Submissions`. Add the headers Timestamp, Name, Work email, Company, and Message.
2. Create an Apps Script project, paste in `apps-script/Code.gs`, and add the advanced **Google Sheets API** under **Services**.
3. In Apps Script project settings, set the `CONTACT_SHEET_ID` script property to your spreadsheet ID.
4. Deploy as a web app that executes as you, with access set to **Anyone** if your account allows anonymous deployments.
5. Copy `.env.example` to `.env.local` and set `VITE_CONTACT_ENDPOINT` to the deployed `/exec` URL. This URL is public client configuration. Restart Vite after updating it.
6. For production, set the same variable at build time. Serve `dist` and configure the static host to serve `index.html` on direct visits to `/contact`.
7. Test from the deployed site in a signed-out browser. Check that the UI confirms the submission and that the sheet contains the new row.
