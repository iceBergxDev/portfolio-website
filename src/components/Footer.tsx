export default function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">© {new Date().getFullYear()} Pirun Kongsaeng</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/pirunkongsaeng" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-accent transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/pirun-kongsaeng-417b2a1b0/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-accent transition-colors">LinkedIn</a>
          <a href="mailto:pirun.ks@gmail.com" className="text-sm text-text-muted hover:text-accent transition-colors">Email</a>
          <a href="/Resume-Pirun-Kongsaeng.pdf" download className="text-sm text-accent hover:text-accent-hover transition-colors font-medium">Resume (PDF) ↓</a>
        </div>
      </div>
    </footer>
  )
}
