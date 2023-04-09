import './globals.scss';

export const metadata = {
  title: 'Expense Tracker2',
  description: '',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
