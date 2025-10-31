export const metadata = { title: 'VPS Fetch/Write Demo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Optional Umami — paste your script and ID when ready
        <script async src="https://us.umami.is/script.js" data-website-id="YOUR-ID"></script>
        */}
      </head>
      <body style={{fontFamily:'system-ui,Arial', padding:'2rem', maxWidth:760, margin:'auto', lineHeight:1.5}}>
        {children}
      </body>
    </html>
  );
}
