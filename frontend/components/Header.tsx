// components/Header.tsx
import Container from "./Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/70 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <div className="font-bold text-xl">JSPOT</div>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#" className="hover:text-zinc-600">HOT</a>
          <a href="#" className="hover:text-zinc-600">新着</a>
          <a href="#" className="hover:text-zinc-600">地域</a>
        </nav>
      </Container>
    </header>
  );
}
