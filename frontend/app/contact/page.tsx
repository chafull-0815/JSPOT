// app/contact/page.tsx
import ContactForm from "@/components/contact/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-semibold">Contact</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        お問い合わせ内容を入力してください。* は必須項目です。
      </p>
      <ContactForm action="/api/contact" />
    </main>
  );
}
