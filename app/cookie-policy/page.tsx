"use client";

import { motion } from "framer-motion";
import { Cookie, Settings, Shield, BarChart3, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function CookiePolicy() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastUpdated(currentDate);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const cookieTypes = [
    {
      type: "Essential Cookies",
      description: "Required for basic website functionality",
      purpose: "Session management, security, and core features",
      icon: <Shield className="w-5 h-5" />,
      examples: ["Login sessions", "Shopping cart", "Security tokens"],
    },
    {
      type: "Analytics Cookies",
      description: "Help us understand how visitors interact",
      purpose: "Performance tracking and improvements",
      icon: <BarChart3 className="w-5 h-5" />,
      examples: ["Page visits", "User behavior", "Feature usage"],
    },
    {
      type: "Preference Cookies",
      description: "Remember your settings and preferences",
      purpose: "Personalized experience",
      icon: <Settings className="w-5 h-5" />,
      examples: ["Language selection", "Theme preference", "Currency settings"],
    },
  ];

  const browserInstructions = [
    {
      browser: "Google Chrome",
      steps: ["Settings → Privacy and security → Cookies and other site data"],
    },
    {
      browser: "Mozilla Firefox",
      steps: ["Options → Privacy & Security → Cookies and Site Data"],
    },
    {
      browser: "Safari",
      steps: ["Preferences → Privacy → Cookies and website data"],
    },
    {
      browser: "Microsoft Edge",
      steps: [
        "Settings → Cookies and site permissions → Cookies and data stored",
      ],
    },
  ];

  const importantNotes = [
    "Essential cookies cannot be disabled without affecting website functionality",
    "Cookie preferences are stored in your browser, not on our servers",
    "Third-party cookies may be used by our analytics and advertising partners",
    "Cookie settings can be changed at any time through your browser",
    "By continuing to use our site, you consent to our use of cookies",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-background-tertiary border border-theme mb-6">
              <Cookie className="w-8 h-8 text-brand" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Cookie Policy
            </h1>

            <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-8">
              How we use cookies to enhance your browsing experience
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background-tertiary border border-theme">
              <span className="text-muted text-sm">Last updated:</span>
              <span className="text-secondary font-medium">{lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 p-6 rounded-2xl bg-background-secondary border border-theme"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-brand" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Understanding Cookies
              </h2>
              <p className="text-secondary">
                Shrix uses cookies to improve user experience, analyze website
                traffic, and personalize content. This policy explains what
                cookies are, how we use them, and how you can manage your
                preferences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 1: What Are Cookies */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="mb-8 group"
        >
          <div className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-theme flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-[#4B5563] transition-colors">
                  <Settings className="w-6 h-6 text-brand" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  1. What Are Cookies?
                </h2>
                <p className="text-muted mt-1">
                  Small files for better browsing
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-background-tertiary border border-theme">
                <p className="text-secondary">
                  Cookies are small text files that are stored on your device
                  (computer, tablet, or mobile) when you visit websites. They
                  help websites remember information about your visit, which can
                  make it easier to visit the site again and make the site more
                  useful to you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-background-tertiary border border-theme text-center">
                  <div className="w-10 h-10 rounded-full bg-[#38BDF8]/10 flex items-center justify-center mx-auto mb-3">
                    <div className="w-4 h-4 rounded-full bg-[#38BDF8]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-1">Temporary</h3>
                  <p className="text-sm text-secondary">
                    Session cookies expire when you close browser
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background-tertiary border border-theme text-center">
                  <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-3">
                    <div className="w-4 h-4 rounded-full bg-[#22C55E]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-1">
                    Persistent
                  </h3>
                  <p className="text-sm text-secondary">
                    Remain on device for set period of time
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background-tertiary border border-theme text-center">
                  <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-3">
                    <div className="w-4 h-4 rounded-full bg-[#F59E0B]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-1">Secure</h3>
                  <p className="text-sm text-secondary">
                    Encrypted for privacy and security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Types of Cookies */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="mb-8 group"
        >
          <div className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-theme flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-[#4B5563] transition-colors">
                  <BarChart3 className="w-6 h-6 text-brand" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  2. Types of Cookies We Use
                </h2>
                <p className="text-muted mt-1">Categories and purposes</p>
              </div>
            </div>

            <div className="space-y-4">
              {cookieTypes.map((cookie, index) => (
                <motion.div
                  key={cookie.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 rounded-lg bg-background-tertiary border border-theme"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                        <div className="text-[#38BDF8]">{cookie.icon}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        {cookie.type}
                      </h3>
                      <p className="text-secondary mb-2">
                        {cookie.description}
                      </p>
                      <p className="text-sm text-muted">
                        <strong>Purpose:</strong> {cookie.purpose}
                      </p>
                    </div>
                  </div>

                  <div className="pl-12">
                    <h4 className="text-sm font-medium text-primary mb-2">
                      Examples:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cookie.examples.map((example, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-background border border-theme text-xs text-secondary"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 3: Managing Cookies */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.7 }}
          className="mb-8 group"
        >
          <div className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-theme flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-[#4B5563] transition-colors">
                  <Shield className="w-6 h-6 text-brand" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  3. Managing Cookies
                </h2>
                <p className="text-muted mt-1">
                  Control your cookie preferences
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-background-tertiary border border-theme">
                <h3 className="font-semibold text-primary mb-3">
                  Browser Settings
                </h3>
                <p className="text-secondary mb-4">
                  You can disable cookies through your browser settings.
                  However, please note that disabling essential cookies may
                  affect website functionality and your browsing experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {browserInstructions.map((browser, index) => (
                    <div
                      key={browser.browser}
                      className="p-3 rounded-lg bg-background border border-theme"
                    >
                      <h4 className="font-medium text-primary mb-2">
                        {browser.browser}
                      </h4>
                      <ul className="space-y-1">
                        {browser.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-secondary flex items-start gap-2"
                          >
                            <span className="text-muted">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-[#F59E0B]/5 to-[#F97316]/5 border border-theme">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">
                      Important Notice
                    </h4>
                    <p className="text-secondary text-sm">
                      Disabling cookies may prevent certain features from
                      functioning properly, such as logging in, adding items to
                      cart, or personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Important Notes */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-background-tertiary to-background-secondary p-6 rounded-2xl border border-theme">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Important Notes
            </h3>
            <div className="space-y-3">
              {importantNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                    </div>
                  </div>
                  <p className="text-secondary">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.9 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-theme"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary mb-3">
              Questions About Cookies?
            </h3>
            <p className="text-secondary mb-6">
              Contact us for more information about our cookie policy
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.history.back()}
                className="px-6 py-3.5 rounded-lg border border-theme text-secondary hover:bg-background-tertiary hover:text-primary transition-all duration-200 font-medium h-[44px] flex items-center justify-center"
              >
                Go Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Navigate to privacy policy or contact page
                  window.location.href = "/privacy-policy";
                }}
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#F59E0B]/10 h-[44px] flex items-center justify-center"
              >
                View Privacy Policy
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Shrix. All rights reserved.
          </p>
          <p className="text-xs text-muted mt-2">
            This cookie policy is part of our comprehensive Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
