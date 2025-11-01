// components/Footer.tsx
import Container from "./Container";
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white">
      <Container className="py-8 text-sm text-zinc-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} JSPOT</p>
        <div className="flex gap-4">
          <a href="#">利用規約</a><a href="#">プライバシー</a>
        </div>
      </Container>
    </footer>
  );
}
