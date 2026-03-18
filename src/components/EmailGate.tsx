import { useState, type FormEvent } from 'react';
import { BlueprintGrid } from './BlueprintGrid';

interface EmailGateProps {
  onAccess: (userData: { name: string; email: string; company: string }) => void;
}

export function EmailGate({ onAccess }: EmailGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Enter a valid email.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const userData = { name: name.trim(), email: email.trim(), company: company.trim() };

    // POST to LeadConnector via serverless function (fire and forget)
    fetch('/api/capture-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }).catch((err) => console.warn('Lead capture failed:', err));

    // Grant access immediately (don't block on API response)
    setTimeout(() => {
      onAccess(userData);
    }, 400);
  }

  return (
    <div className="ob1-gate-overlay">
      <BlueprintGrid />

      <div
        className="relative z-10 w-full max-w-md animate-fade-in-up"
        style={{ animationDelay: '0ms' }}
      >
        {/* Brand stamp */}
        <div className="mb-8 text-center">
          <p
            className="mb-2 text-base font-extrabold tracking-[0.18em] text-orange uppercase"
            style={{ fontFamily: 'var(--ob1-font-body)' }}
          >
            OB.1 AI SOLUTIONS
          </p>
          <h1
            className="text-3xl font-bold leading-tight text-parchment sm:text-4xl"
            style={{ fontFamily: 'var(--ob1-font-heading)' }}
          >
            Skill Builder
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            Turn your workflows into reusable AI expertise.
            <br />
            Enter your info to get free access.
          </p>
        </div>

        {/* Gate card */}
        <div
          className="rounded-md bg-parchment p-6 sm:p-8"
          style={{
            borderLeft: '4px solid var(--ob1-orange)',
            boxShadow: '0 8px 32px rgba(13, 27, 42, 0.5)',
          }}
        >
          <p
            className="section-label mb-6"
            style={{ fontFamily: 'var(--ob1-font-body)' }}
          >
            Get Free Access
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="gate-name"
                  className="mb-1.5 block text-sm font-semibold text-charcoal"
                >
                  Full Name <span className="text-[#e74c3c]">*</span>
                </label>
                <input
                  id="gate-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="Chris McCarthy"
                  className={`ob1-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-[#e74c3c]">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="gate-email"
                  className="mb-1.5 block text-sm font-semibold text-charcoal"
                >
                  Work Email <span className="text-[#e74c3c]">*</span>
                </label>
                <input
                  id="gate-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="you@company.com"
                  className={`ob1-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[#e74c3c]">{errors.email}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="gate-company"
                  className="mb-1.5 block text-sm font-semibold text-charcoal"
                >
                  Company{' '}
                  <span className="font-normal text-stone">(optional)</span>
                </label>
                <input
                  id="gate-company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Corp"
                  className="ob1-input"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="ob1-btn-primary w-full py-3.5 text-base"
                style={{ opacity: loading ? 0.75 : 1 }}
              >
                {loading ? (
                  <>
                    <span
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Getting access...
                  </>
                ) : (
                  'Get Free Access →'
                )}
              </button>
            </div>
          </form>

          {/* Privacy note */}
          <p className="mt-5 text-center text-xs leading-relaxed text-stone">
            No spam. No sharing. Used to improve the tool and occasionally share
            what we're building at OB.1.{' '}
            <a
              href="https://ob1ai.co/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors duration-150 hover:text-orange"
              style={{ color: 'var(--ob1-charcoal)' }}
            >
              Privacy policy
            </a>
            .
          </p>
        </div>

        {/* Footer attribution */}
        <p className="mt-6 text-center text-xs text-stone">
          ob1ai.co &middot; chris@ob1ai.co &middot; 234.602.0500
        </p>
      </div>
    </div>
  );
}
