export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Intellibus Care</h3>
            <p className="text-sm opacity-75">Connecting healthcare professionals with communities in need.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  Doctors
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  Register
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Intellibus Care Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
