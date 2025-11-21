import './globals.css';
import NavigationServer from '../components/NavigationServer';

export const metadata = {
  title: '통합 주류 지식 허브',
  description: '위스키, 사케, 맥주, 와인의 심층적인 과학적 지식을 제공하는 플랫폼',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <NavigationServer />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}

