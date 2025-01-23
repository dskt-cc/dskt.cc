import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray/50 to-black py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-miku-waterleaf mb-8">
          Terms of Service
        </h1>
        <div className="text-base sm:text-lg text-miku-light/70 space-y-6">
          <p>
            Welcome to our mod hosting platform for Desktop Mate. By using our
            services, you agree to the following terms and conditions.
          </p>
          <h2 className="text-2xl font-semibold text-miku-teal">
            Use of Service
          </h2>
          <p>
            Our platform allows you to browse, download, and submit mods for
            Desktop Mate. You agree to use the service in compliance with all
            applicable laws and regulations.
          </p>
          <h2 className="text-2xl font-semibold text-miku-teal">
            Mod Submissions
          </h2>
          <p>
            By submitting mods, you grant us the right to host and distribute
            your content. You must ensure that your mods do not infringe on any
            third-party rights.
          </p>
          <h2 className="text-2xl font-semibold text-miku-teal">
            Changes to Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. We will
            notify you of any changes by posting the new terms on our website.
          </p>
          <h2 className="text-2xl font-semibold text-miku-teal">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <Link href="mailto:support@example.com">support@example.com</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
