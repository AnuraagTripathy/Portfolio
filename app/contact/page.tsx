import Image from "next/image";
import { ContactForm } from "../_components/ContactForm";

export default function Contact() {
  return (
    <main className="grid h-full min-h-[100dvh] grid-cols-12 items-center justify-center">
      <div className="col-span-12 flex flex-col items-center justify-center px-6 py-12 lg:col-span-5 lg:px-12">
        <h1 className="bg-gradient-to-t from-[#1c0913] to-[#da0ea4] bg-clip-text pb-2 text-center text-4xl font-extrabold tracking-tight text-transparent xl:text-5xl/none">
          Contact Me
        </h1>
        <p className="max-w-xl text-center font-light text-muted-foreground lg:text-lg">
          Wanna connect with me? Feel free to leave a message!
        </p>
        <ContactForm />
      </div>
      <aside className="relative order-last col-span-7 hidden h-full w-full lg:block">
        <Image
          alt="contact"
          src={"/contact.jpg"}
          width={1080}
          height={1080}
          quality={100}
          className="absolute right-2 top-1/2 h-[99%] w-full -translate-y-1/2 rounded-3xl bg-muted object-cover"
        />
      </aside>
    </main>
  );
}
