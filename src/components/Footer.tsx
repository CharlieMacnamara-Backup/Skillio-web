import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-32 flex-none bg-zinc-50 dark:bg-zinc-950">
      <div className="border-t border-zinc-100 pb-16 pt-16 dark:border-zinc-800/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-5 lg:col-span-4">
              <Link href="/" className="flex items-center gap-2 group mb-6">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white font-bold text-xl shadow-lg">
                  S
                </div>
                <span className="text-xl font-bold font-display text-zinc-900 dark:text-white">
                  Skillio
                </span>
              </Link>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                Empowering individuals through sensory-safe communication tools and meaningful social practice. Join us in building a more inclusive world.
              </p>
            </div>

            {/* Links Column */}
            <div className="md:col-span-3 lg:col-span-4">
               <h4 className="font-display font-bold text-zinc-900 dark:text-white mb-6">Product</h4>
               <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                 <li><Link href="/#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How it Works</Link></li>
                 <li><Link href="/#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Key Features</Link></li>
                 <li><Link href="/#get-started" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</Link></li>
               </ul>
            </div>

            {/* Legal Column */}
             <div className="md:col-span-4 lg:col-span-4 text-left">
               <h4 className="font-display font-bold text-zinc-900 dark:text-white mb-6">Support & Legal</h4>
               <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                 <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                 <li><Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                 <li><a href="mailto:support@skillio.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Support</a></li>
               </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              © 2026 Skillio App. All rights reserved.
            </p>
            <div className="flex gap-6">
              {/* Social Placeholders */}
              <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full cursor-not-allowed" />
              <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full cursor-not-allowed" />
              <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full cursor-not-allowed" />
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
