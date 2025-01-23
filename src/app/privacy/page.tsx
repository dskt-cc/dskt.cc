import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray/50 to-black py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-miku-waterleaf mb-8">
          Privacy Policy
        </h1>
        <div className="text-base sm:text-lg text-miku-light/70 space-y-6">
          <p>
            We value your privacy and are committed to protecting your personal
            information. This Privacy Policy outlines how we collect, use, and
            safeguard your data.
          </p>
          <h2 className="text-2xl font-semibold text-miku-teal">
            Information We Collect
          </h2>
          <p>
            We store IP addresses for the purpose of tracking views and
            downloads. This information is not tied to any personal
            identification.
          </p>
          <h2 className="text-2xl font-semibold text-miku-teal">
            Mod Information
          </h2>
          <p>
            We query GitHub for all mod information, which we store to provide
            you with the latest updates and features.
          </p>
          <h2 className="text-2xl font-semibold text-miku-teal">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <Link href="mailto:support@example.com">support@example.com</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
