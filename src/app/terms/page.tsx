import Link from "next/link";
import { Container } from "@/components/Container";

export default function TermsPage() {
  return (
    <div className="relative isolate min-h-full">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[800px] w-[800px] -translate-x-[50%] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <Container className="mt-32 pb-24">
        <div className="max-w-3xl">
          <Link 
            href="/" 
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-indigo-600 transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold font-display tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl mb-4">
            Terms & Conditions
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-12">
            Last updated: March 30, 2026
          </p>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-indigo-600 dark:prose-h2:text-indigo-400">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Skillio, you agree to be bound by these Terms. If you do not agree to all the terms and conditions, you may not use the application.
            </p>
            
            <h2>2. Description of Service</h2>
            <p>
              Skillio provides tools for Augmentative and Alternative Communication (AAC), social skills training, and emotional regulation. We reserve the right to modify or discontinue features at our discretion to better serve the community.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. You agree to use the app in a way that respects the rights of others and complies with all applicable local and international laws.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              The Skillio name, logo, and all original content are the exclusive property of Skillio App. You are granted a limited, non-exclusive license to use the app for personal, non-commercial purposes.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              Skillio is provided on an &quot;as is&quot; and &quot;as available&quot; basis. While we strive for 100% uptime and accuracy, we cannot guarantee the service will be error-free or uninterrupted.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction in which the company is registered, without regard to its conflict of law provisions.
            </p>

            <h2>7. Contact Information</h2>
            <p>
              For support or legal inquiries, please contact us at <span className="text-indigo-600 dark:text-indigo-400 font-medium">support@skillio.com</span>.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
