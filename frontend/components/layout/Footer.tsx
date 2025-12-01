export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-500">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <p>© {new Date().getFullYear()} JSPOT</p>
          <p className="text-gray-400">シンプル &amp; ミニマルなグルメ検索メディア</p>
        </div>
      </div>
    </footer>
  );
}
