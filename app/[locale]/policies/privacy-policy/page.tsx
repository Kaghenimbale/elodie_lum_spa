import React from "react";

const page = () => {
  return (
    <>
      <section className="px-4 py-10 md:px-16 lg:px-32 bg-white text-gray-800 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[1.8rem] md:text-[2.25rem] font-bold mb-6 text-center">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Last updated: June 30, 2025
          </p>

          <div className="space-y-6 text-base md:text-lg leading-relaxed">
            <p>
              This Privacy Policy describes how Elodi@ beauty&spa ("we", "us",
              or "our") collects, uses, and discloses your personal information
              when you visit or use our services on elodibeautyspa.com. By
              accessing the Services, you agree to the terms of this Privacy
              Policy.
            </p>

            <h2 className="text-xl font-semibold">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will
              be posted on the site and will include a new "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold">
              How We Collect and Use Your Personal Information
            </h2>
            <p>
              We collect personal information to provide and improve our
              services, fulfill orders, ensure security, and communicate
              effectively with you.
            </p>

            <h3 className="font-semibold">Information We Collect Directly</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Contact details (name, address, phone number, email)</li>
              <li>Order and payment info</li>
              <li>Account credentials</li>
              <li>Customer support messages</li>
            </ul>

            <h3 className="font-semibold">Usage Data</h3>
            <p>
              We may automatically collect device/browser information, IP
              address, and site usage behavior through cookies or other tracking
              technologies.
            </p>

            <h3 className="font-semibold">Information from Third Parties</h3>
            <p>
              We may receive information from service providers (e.g., payment
              processors or IT support vendors) for operational purposes.
            </p>

            <h2 className="text-xl font-semibold">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>To process orders and provide services</li>
              <li>To improve our website and offerings</li>
              <li>For marketing and communication</li>
              <li>To detect and prevent fraud or misuse</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold">Cookies</h2>
            <p>
              We use cookies to improve your experience and monitor traffic. You
              may disable cookies in your browser, but this may affect the
              site’s functionality.
            </p>

            <h2 className="text-xl font-semibold">
              Disclosure of Personal Information
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                With vendors and service providers (e.g., shipping, analytics,
                support)
              </li>
              <li>With marketing partners (with your consent)</li>
              <li>
                In business transfers or legal situations (e.g., mergers,
                subpoenas)
              </li>
              <li>With affiliates for internal operations</li>
            </ul>

            <h2 className="text-xl font-semibold">Third Party Links</h2>
            <p>
              Our site may link to third-party websites. We are not responsible
              for the privacy practices or content of those sites.
            </p>

            <h2 className="text-xl font-semibold">Children’s Data</h2>
            <p>
              We do not knowingly collect information from children. If you
              believe we have, please contact us for removal.
            </p>

            <h2 className="text-xl font-semibold">Security and Retention</h2>
            <p>
              We use industry-standard methods to protect your data, but cannot
              guarantee complete security. Data is retained as long as needed
              for our purposes or as required by law.
            </p>

            <h2 className="text-xl font-semibold">Your Rights</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Access, correction, or deletion of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent where applicable</li>
              <li>Manage marketing communication preferences</li>
            </ul>
            <p>
              Contact us to exercise these rights. We may verify your identity
              before processing requests.
            </p>

            <h2 className="text-xl font-semibold">International Users</h2>
            <p>
              Your data may be processed outside your country. We ensure proper
              safeguards for international transfers where legally required.
            </p>

            <h2 className="text-xl font-semibold">Contact</h2>
            <p>
              If you have questions about this policy or would like to exercise
              your rights, please contact us at:
            </p>
            <ul className="list-none ml-0 mt-2">
              <li>
                Email:
                <a
                  href="mailto:Elodiabspa@gmail.com"
                  className="text-blue-600 underline"
                >
                  Elodiabspa@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
