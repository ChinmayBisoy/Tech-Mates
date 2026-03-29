import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react'

export function Home() {
  const trustSignals = [
    {
      icon: ShieldCheck,
      title: 'Secure Escrow',
      description: 'Funds stay protected and are released only when milestones are approved.',
    },
    {
      icon: BadgeCheck,
      title: 'Verified Reviews',
      description: 'Ratings are tied to real project activity to keep feedback honest.',
    },
    {
      icon: Zap,
      title: 'Fast Resolution',
      description: 'Escalation and dispute tools are built in when things need a decision.',
    },
  ]

  const howItWorks = [
    {
      title: 'Service Exchange Market',
      accent: 'bg-primary-600',
      steps: [
        { title: 'Post requirements', description: 'Share goals, budget, and timeline in minutes.' },
        { title: 'Receive proposals', description: 'Compare skilled developers and clear bids.' },
        { title: 'Start with confidence', description: 'Use contracts, milestones, and escrow from day one.' },
      ],
    },
    {
      title: 'Project Market',
      accent: 'bg-accent-600',
      steps: [
        { title: 'Publish your build', description: 'List templates, SaaS kits, and production-ready code.' },
        { title: 'Get discovered', description: 'Buyers browse by category, quality, and relevance.' },
        { title: 'Deliver instantly', description: 'Complete purchases with smooth digital delivery.' },
      ],
    },
  ]

  const platformHighlights = [
    {
      icon: UserRound,
      title: 'Built for Clients',
      description: 'Post requirements, review proposals, and hire with transparent budgets and milestones.',
      linkLabel: 'Learn client flow',
      linkTo: '/help',
    },
    {
      icon: Rocket,
      title: 'Built for Developers',
      description: 'Pitch projects, showcase your strengths, and grow your income through trusted contracts.',
      linkLabel: 'Explore developer journey',
      linkTo: '/help',
    },
    {
      icon: Store,
      title: 'Two Powerful Markets',
      description: 'Offer custom services in SE Market or sell ready-made products in Project Market.',
      linkLabel: 'See marketplace',
      linkTo: '/se-market',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50 to-slate-100 text-gray-900 dark:bg-none dark:bg-base dark:text-white">
      <section className="relative overflow-hidden border-b border-indigo-200/70 bg-gradient-to-b from-indigo-100 via-sky-50 to-indigo-50 dark:border-gray-800 dark:from-primary-950/25 dark:via-base dark:to-base">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-[32rem] rounded-full bg-indigo-300/55 blur-3xl dark:bg-primary-500/20" />
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 translate-x-1/3 rounded-full bg-cyan-200/70 blur-3xl dark:bg-accent-500/20" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pb-16 pt-16 sm:px-6 md:pt-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pt-24">
          <div className="space-y-7 home-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/80 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-800 shadow-sm backdrop-blur-sm dark:border-primary-700/40 dark:bg-primary-800/25 dark:text-primary-200">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted by builders and buyers
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Find your tech mate.
                <span className="mt-1 block text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text dark:from-primary-300 dark:via-primary-200 dark:to-accent-300">
                  Build something worth sharing.
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-700 dark:text-gray-300">
                TechMates helps clients and developers ship better projects with escrow-backed trust,
                transparent collaboration, and discovery that feels effortless.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/register?role=user"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
              >
                Start as a client
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register?role=developer"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary-600 bg-gradient-to-r from-white to-indigo-50 px-6 py-3 font-semibold text-primary-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-md hover:shadow-indigo-200/70 dark:border-accent-500 dark:bg-none dark:bg-base dark:text-accent dark:hover:bg-primary-900/20"
              >
                Start as a developer
              </Link>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-indigo-200 bg-gradient-to-b from-white/90 to-indigo-100/70 p-3 shadow-sm shadow-indigo-200/60 dark:border-gray-800 dark:bg-none dark:bg-surface/80">
                <p className="text-2xl font-bold text-primary-600 dark:text-accent">2,400+</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Developers</p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-gradient-to-b from-white/90 to-indigo-100/70 p-3 shadow-sm shadow-indigo-200/60 dark:border-gray-800 dark:bg-none dark:bg-surface/80">
                <p className="text-2xl font-bold text-primary-600 dark:text-accent">1,800+</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Projects</p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-gradient-to-b from-white/90 to-indigo-100/70 p-3 shadow-sm shadow-indigo-200/60 dark:border-gray-800 dark:bg-none dark:bg-surface/80">
                <p className="text-2xl font-bold text-primary-600 dark:text-accent">₹2.4Cr+</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Paid out</p>
              </div>
            </div>
          </div>

          <div className="relative home-fade-up home-fade-up-delay">
            <div className="rounded-3xl border border-indigo-300/80 bg-gradient-to-b from-white/90 via-indigo-100 to-cyan-100/70 p-6 shadow-xl shadow-indigo-300/60 ring-1 ring-white/60 dark:border-gray-700 dark:bg-none dark:bg-surface dark:shadow-none">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400">
                    Platform at a glance
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-slate-100">What you can do in under 5 minutes</h2>
                </div>
                <div className="rounded-lg bg-primary-100 p-2 dark:bg-slate-700/80">
                  <Layers3 className="h-5 w-5 text-primary-700 dark:text-white" />
                </div>
              </div>

              <div className="mb-4 space-y-2.5">
                <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 dark:border-gray-700 dark:bg-base/70">
                  <div className="mt-0.5 rounded-md bg-primary-100 p-1.5 dark:bg-slate-700/75">
                    <Briefcase className="h-4 w-4 text-primary-700 dark:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">Post a requirement or publish your product</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Choose services, products, or both based on your goal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 dark:border-gray-700 dark:bg-base/70">
                  <div className="mt-0.5 rounded-md bg-accent-100 p-1.5 dark:bg-slate-700/75">
                    <Users className="h-4 w-4 text-accent-700 dark:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">Match with verified people</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Compare profiles, proposals, reviews, and delivery confidence.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 dark:border-gray-700 dark:bg-base/70">
                  <div className="mt-0.5 rounded-md bg-success/15 p-1.5 dark:bg-slate-700/75">
                    <WalletCards className="h-4 w-4 text-success dark:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">Secure contracts and payouts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Milestones, escrow protection, and dispute support are built in.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-3 dark:border-gray-700 dark:bg-base/70">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">For Clients</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-slate-100">Hire faster with less risk</p>
                </div>
                <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-3 dark:border-gray-700 dark:bg-base/70">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">For Developers</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-slate-100">Win quality work consistently</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-indigo-100/70 via-sky-50 to-slate-50 py-16 dark:bg-none dark:bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-300 bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-800 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-300">
              <Sparkles className="h-3.5 w-3.5" />
              Explore TechMates
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Everything you need to build and ship better</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              TechMates combines hiring, contracts, project sales, and protected payments in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {platformHighlights.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50 to-indigo-100/70 p-6 shadow-sm shadow-indigo-100/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-none dark:bg-base"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-2 dark:bg-slate-700/75">
                    <Icon className="h-5 w-5 text-primary-700 dark:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.description}</p>
                  <Link
                    to={item.linkTo}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-colors group-hover:text-primary-600 dark:text-accent"
                  >
                    {item.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50 to-indigo-100/45 py-16 dark:bg-none dark:bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Why teams feel safe building here</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Built-in trust systems keep collaboration clear from proposal to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustSignals.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50 to-indigo-100/70 p-6 shadow-sm shadow-indigo-100/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-none dark:bg-slate-800"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-2 dark:bg-slate-700/80">
                    <Icon className="h-5 w-5 text-primary-700 dark:text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-indigo-200 bg-gradient-to-b from-indigo-100/70 via-sky-50 to-slate-100/80 py-16 dark:border-gray-800 dark:bg-none dark:bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">How it works</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">Two clear paths to buy services or sell finished products.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {howItWorks.map((market) => (
              <div key={market.title} className="rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50 to-indigo-100/65 p-7 dark:border-gray-800 dark:bg-none dark:bg-base">
                <h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">{market.title}</h3>
                <ol className="space-y-4">
                  {market.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-3">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${market.accent}`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{step.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-indigo-50/70 to-sky-100/55 py-16 dark:bg-none dark:bg-base">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-indigo-300 bg-gradient-to-r from-indigo-100 via-white to-cyan-100 p-8 text-center shadow-xl shadow-indigo-200/60 dark:border-primary-800 dark:from-primary-950/30 dark:via-surface dark:to-accent-950/20 sm:p-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Ready to ship your next project?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
              Join TechMates and start with clarity, speed, and trust from day one.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register?role=user"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Start as a client
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register?role=developer"
                className="inline-flex items-center justify-center rounded-xl border border-primary-600 px-6 py-3 font-semibold text-primary-700 transition-colors hover:bg-primary-50 dark:text-accent dark:hover:bg-primary-900/20"
              >
                Start as a developer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
