import ContactForm from '@/components/ContactForm'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">Contact</p>
        <h2 className="text-3xl font-bold tracking-tight mb-4">Get In Touch</h2>
        <p className="text-text-muted mb-12 max-w-md">
          Available for freelance projects and full-time roles. Based in Bangkok — working remotely worldwide.
        </p>
        <ContactForm />
      </div>
    </section>
  )
}
