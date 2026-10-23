import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Terminal,
  Download,
  Shield,
  Zap,
  Globe,
  Github,
  BookOpen,
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  Star,
  GitFork,
  Users,
  Code2,
  Boxes,
  Lock,
  Rocket,
} from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">npm</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm">
              Features
            </a>
            <a href="#install" className="text-gray-300 hover:text-white transition-colors text-sm">
              Install
            </a>
            <a href="#commands" className="text-gray-300 hover:text-white transition-colors text-sm">
              Commands
            </a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors text-sm">
              Documentation
            </a>
            <a
              href="https://github.com/johansebastianbach444-lgtm/cli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <ChevronDown className={`w-6 h-6 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors text-sm">
              Features
            </a>
            <a href="#install" className="block text-gray-300 hover:text-white transition-colors text-sm">
              Install
            </a>
            <a href="#commands" className="block text-gray-300 hover:text-white transition-colors text-sm">
              Commands
            </a>
            <a href="#docs" className="block text-gray-300 hover:text-white transition-colors text-sm">
              Documentation
            </a>
            <a
              href="https://github.com/johansebastianbach444-lgtm/cli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm w-fit"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("curl -qL https://www.npmjs.com/install.sh | sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-gray-950 to-gray-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm">v11.10.0 — Latest Release</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            The Package Manager
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            for JavaScript
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Install, share, and manage code dependencies from the world's largest software registry.
          Trusted by over 50 million developers worldwide.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#install"
            className="group flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-red-600/20 hover:shadow-red-500/30"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#docs"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-gray-700"
          >
            <BookOpen className="w-4 h-4" />
            Documentation
          </a>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gray-900 border border-gray-700/50 rounded-2xl p-4 flex items-center gap-3">
              <Terminal className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <code className="flex-1 text-left text-sm sm:text-base text-gray-300 font-mono overflow-x-auto">
                curl -qL https://www.npmjs.com/install.sh | sh
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-8 mt-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span className="text-sm">13,125 commits</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4" />
            <span className="text-sm">1,534 releases</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">50M+ developers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Download,
      title: "Install Packages",
      description: "Install packages from the npm registry with a single command. Manage dependencies effortlessly.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Built-in security features including package provenance, signature verification, and audit capabilities.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized dependency resolution and parallel downloads for the fastest install experience.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Global Registry",
      description: "Access over 2 million packages from the world's largest software registry.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Boxes,
      title: "Workspaces",
      description: "Manage multiple packages in a single repository with built-in workspace support.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Lock,
      title: "npm Trust",
      description: "Per-command configuration and trust management for enhanced supply chain security.",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-gray-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              manage packages
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From installing dependencies to publishing your own packages, npm has all the tools you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstallSection() {
  const [activeTab, setActiveTab] = useState("direct");

  const tabs = [
    { id: "direct", label: "Direct Download" },
    { id: "bundled", label: "Bundled with Node" },
    { id: "nvm", label: "Node Version Manager" },
  ];

  const commands = {
    direct: "curl -qL https://www.npmjs.com/install.sh | sh",
    bundled: "# Download Node.js from nodejs.org\n# npm comes bundled by default\n# https://nodejs.org/en/download",
    nvm: "# Install nvm first, then:\nnvm install --lts\n# npm is included automatically",
  };

  return (
    <section id="install" className="relative py-24 bg-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-gray-950 to-gray-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Get up and running in{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              seconds
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose your preferred installation method and start managing packages right away.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-900 border border-gray-800/50 rounded-2xl overflow-hidden">
            <div className="flex border-b border-gray-800/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-white bg-gray-800/50 border-b-2 border-red-500"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              <div className="bg-gray-950 rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-gray-500">terminal</span>
                </div>
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap overflow-x-auto">
                  {commands[activeTab as keyof typeof commands]}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">2M+</div>
              <div className="text-sm text-gray-400">Packages</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">50M+</div>
              <div className="text-sm text-gray-400">Developers</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Commands() {
  const commands = [
    { cmd: "npm install <package>", desc: "Install a package and its dependencies" },
    { cmd: "npm init", desc: "Initialize a new package.json file" },
    { cmd: "npm run <script>", desc: "Run a script defined in package.json" },
    { cmd: "npm test", desc: "Run the test script for a package" },
    { cmd: "npm publish", desc: "Publish a package to the registry" },
    { cmd: "npm audit", desc: "Run a security audit on installed packages" },
    { cmd: "npm update", desc: "Update packages to their latest versions" },
    { cmd: "npm trust", desc: "Manage trust settings for packages" },
  ];

  return (
    <section id="commands" className="relative py-24 bg-gray-950">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Powerful{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              commands
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive set of CLI commands for every stage of your development workflow.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto grid gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {commands.map((item, index) => (
            <motion.div
              key={item.cmd}
              className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 hover:border-gray-700/50 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <code className="text-red-400 font-mono text-sm sm:text-base font-medium whitespace-nowrap">
                {item.cmd}
              </code>
              <span className="text-gray-500 text-sm sm:text-base">{item.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Docs() {
  const resources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Official docs & how-tos for all things npm",
      link: "https://docs.npmjs.com/",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Github,
      title: "Bug Tracker",
      description: "Search or submit bugs against the CLI",
      link: "https://github.com/npm/cli/issues",
      color: "from-gray-500 to-gray-600",
    },
    {
      icon: Code2,
      title: "RFCs",
      description: "Contribute ideas & specifications for the API/design",
      link: "https://github.com/npm/rfcs",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Rocket,
      title: "Project Status",
      description: "See the health of all our maintained OSS projects",
      link: "https://npm.github.io/statusboard/",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="docs" className="relative py-24 bg-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/5 via-gray-950 to-gray-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Resources &{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Documentation
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to learn, contribute, and stay informed about npm.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0`}>
                  <resource.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{resource.description}</p>
                </div>
              </div>
              <ArrowRight className="absolute top-6 right-6 w-4 h-4 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="relative py-24 bg-gray-950">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            FAQ on{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Branding
            </span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              Is it "npm" or "NPM" or "Npm"?
            </h3>
            <p className="text-gray-400">
              <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded text-sm">npm</code> should never be capitalized unless it is being displayed in a location that is customarily all-capitals (ex. titles on man pages).
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              Is "npm" an acronym for "Node Package Manager"?
            </h3>
            <p className="text-gray-400">
              Contrary to popular belief, <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded text-sm">npm</code> is <strong className="text-white">not</strong> an acronym for "Node Package Manager". It is a recursive bacronymic abbreviation for <strong className="text-white">"npm is not an acronym"</strong>. The precursor to npm was actually a bash utility named "pm", which was the shortform name of "pkgmakeinst".
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">npm</span>
            <span className="text-gray-500 text-sm ml-2">a JavaScript package manager</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/johansebastianbach444-lgtm/cli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://docs.npmjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Docs
            </a>
            <a
              href="https://status.npmjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Status
            </a>
            <a
              href="https://www.npmjs.com/support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Support
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            npm is configured to use the npm Public Registry at{" "}
            <a href="https://registry.npmjs.org" className="text-gray-400 hover:text-white transition-colors">
              registry.npmjs.org
            </a>
            . Usage subject to{" "}
            <a href="https://npmjs.com/policies/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Use
            </a>
            .
          </p>
          <p className="text-gray-600 text-xs mt-4">
            Licensed under the Artistic License 2.0
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <Features />
      <InstallSection />
      <Commands />
      <Docs />
      <FAQ />
      <Footer />
    </div>
  );
}
