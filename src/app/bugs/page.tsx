"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaBug, FaCheckCircle } from "react-icons/fa";
import { TbAlertTriangle } from "react-icons/tb";
import Link from "next/link";

interface Bug {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  reportedBy: string;
  dateReported: string;
  affected: string[];
  fixedBy?: string[];
  fixedIn?: string;
  dateFixed?: string;
  commits?: string[];
  status?: string;
  assignedTo?: string[];
}

interface BugStats {
  total: number;
  fixed: number;
  open: number;
  criticalOpen: number;
  averageFixTime: number;
}

const getSeverityColors = (severity: Bug["severity"]) => {
  switch (severity) {
    case "critical":
      return "border-miku-pink bg-miku-pink/10 text-miku-pink";
    case "high":
      return "border-miku-deep bg-miku-deep/10 text-miku-deep";
    case "medium":
      return "border-miku-teal bg-miku-teal/10 text-miku-teal";
    case "low":
      return "border-miku-waterleaf bg-miku-waterleaf/10 text-miku-waterleaf";
    default:
      return "border-miku-light bg-miku-light/10 text-miku-light";
  }
};

const BugCard = ({
  bug,
  isPatched = false,
}: {
  bug: Bug;
  isPatched?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-xl border ${getSeverityColors(
      bug.severity,
    )} p-6 backdrop-blur-sm`}
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-mono">{bug.id}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${getSeverityColors(bug.severity)}`}
          >
            {bug.severity}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-miku-waterleaf mb-2">
          {bug.title}
        </h3>
        <p className="text-miku-light/70">{bug.description}</p>
      </div>
      {isPatched ? (
        <FaCheckCircle className="text-miku-teal" size={24} />
      ) : (
        <TbAlertTriangle className="text-miku-pink" size={24} />
      )}
    </div>

    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {bug.affected.map((area) => (
          <span
            key={area}
            className="px-3 py-1 text-sm bg-miku-deep/20 text-miku-teal rounded-full"
          >
            {area}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-miku-light/70">
        <div>Reported by: {bug.reportedBy}</div>
        <div>Date: {new Date(bug.dateReported).toLocaleDateString()}</div>
        {isPatched && bug.fixedIn && (
          <div className="text-miku-teal">Fixed in v{bug.fixedIn}</div>
        )}
      </div>

      {bug.fixedBy && (
        <div className="flex flex-wrap gap-2">
          {bug.fixedBy.map((fixer) => (
            <Link
              key={fixer}
              href={`https://github.com/${fixer}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1 text-sm bg-miku-deep/20 text-miku-teal rounded-full hover:bg-miku-deep/30 transition-all duration-200"
            >
              <FaGithub size={16} />
              {fixer}
            </Link>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const StatsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="bg-miku-gray/50 backdrop-blur-sm rounded-xl border border-miku-deep/20 p-6">
    <div className="flex items-center gap-4">
      <div className="text-miku-teal">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-miku-waterleaf">{value}</div>
        <div className="text-sm text-miku-light/70">{title}</div>
      </div>
    </div>
  </div>
);

export default function BugsPage() {
  const [patchedBugs, setPatchedBugs] = useState<Bug[]>([]);
  const [knownBugs, setKnownBugs] = useState<Bug[]>([]);
  const [stats, setStats] = useState<BugStats>({
    total: 0,
    fixed: 0,
    open: 0,
    criticalOpen: 0,
    averageFixTime: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const [patchedResponse, knownResponse] = await Promise.all([
          fetch(
            "https://raw.githubusercontent.com/dskt-cc/bugs/main/patched.json",
          ),
          fetch(
            "https://raw.githubusercontent.com/dskt-cc/bugs/main/known.json",
          ),
        ]);

        const patchedData = await patchedResponse.json();
        const knownData = await knownResponse.json();

        setPatchedBugs(patchedData.bugs);
        setKnownBugs(knownData.bugs);

        // Calculate stats
        const totalBugs = patchedData.bugs.length + knownData.bugs.length;
        const fixedBugs = patchedData.bugs.length;
        const openBugs = knownData.bugs.length;
        const criticalOpenBugs = knownData.bugs.filter(
          (bug: Bug) => bug.severity === "critical",
        ).length;

        // Calculate average fix time
        const fixTimes = patchedData.bugs.map((bug: Bug) => {
          const reported = new Date(bug.dateReported);
          const fixed = new Date(bug.dateFixed!);
          return fixed.getTime() - reported.getTime();
        });
        const averageFixTime =
          fixTimes.length > 0
            ? Math.round(
                fixTimes.reduce((a, b) => a + b, 0) /
                  (fixTimes.length * 1000 * 60 * 60 * 24),
              )
            : 0;

        setStats({
          total: totalBugs,
          fixed: fixedBugs,
          open: openBugs,
          criticalOpen: criticalOpenBugs,
          averageFixTime,
        });
      } catch (error) {
        console.error("Error fetching bugs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-miku-gray/50 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-miku-deep/20 rounded-xl border border-miku-deep/30"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray/50 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-miku-teal via-miku-waterleaf to-miku-aquamarine text-transparent bg-clip-text">
            Bug Tracker
          </h1>
          <p className="text-miku-light/70">
            Monitor bugs in dskt.cc and it&apos;s services
          </p>
        </div>

        {/* Bug Reporting Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-miku-gray/50 backdrop-blur-sm rounded-xl border border-miku-deep/20 p-6">
            <h2 className="text-xl font-semibold text-miku-waterleaf mb-4">
              How to Report a Bug
            </h2>
            <div className="space-y-4 text-miku-light/70">
              <p>To report a bug, please follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Visit our{" "}
                  <a
                    href="https://github.com/dskt-cc/bugs/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-miku-teal hover:text-miku-waterleaf transition-colors duration-200"
                  >
                    GitHub Issues
                  </a>{" "}
                  page
                </li>
                <li>Use the bug report template</li>
                <li>Include steps to reproduce</li>
                <li>Add relevant system information</li>
                <li>Attach screenshots if applicable</li>
              </ol>
            </div>
          </div>

          <div className="bg-miku-gray/50 backdrop-blur-sm rounded-xl border border-miku-deep/20 p-6">
            <h2 className="text-xl font-semibold text-miku-waterleaf mb-4">
              Bug Severity Levels
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-miku-pink"></span>
                <span className="text-miku-pink">Critical</span>
                <span className="text-miku-light/70">
                  - Application crashes, data loss
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-miku-deep"></span>
                <span className="text-miku-deep">High</span>
                <span className="text-miku-light/70">
                  - Major feature broken
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-miku-teal"></span>
                <span className="text-miku-teal">Medium</span>
                <span className="text-miku-light/70">
                  - Feature partially broken
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-miku-waterleaf"></span>
                <span className="text-miku-waterleaf">Low</span>
                <span className="text-miku-light/70">
                  - Minor issues, visual bugs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-miku-deep/10 backdrop-blur-sm rounded-xl border border-miku-deep/20 p-6 mb-12">
          <h2 className="text-xl font-semibold text-miku-waterleaf mb-4">
            Security Vulnerabilities
          </h2>
          <div className="text-miku-light/70">
            <p className="mb-4">
              For security-related issues, please do not create a public issue.
              Instead:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Email us at{" "}
                <span className="text-miku-teal">security@dskt.cc</span>
              </li>
              <li>Include &quot;SECURITY&quot; in the subject line</li>
              <li>Provide detailed information about the vulnerability</li>
              <li>Wait for confirmation before public disclosure</li>
            </ul>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Bugs"
            value={stats.total}
            icon={<FaBug size={24} />}
          />
          <StatsCard
            title="Fixed Bugs"
            value={stats.fixed}
            icon={<FaCheckCircle size={24} />}
          />
          <StatsCard
            title="Open Bugs"
            value={stats.open}
            icon={<TbAlertTriangle size={24} />}
          />
          <StatsCard
            title="Avg. Fix Time"
            value={`${stats.averageFixTime} days`}
            icon={<FaCheckCircle size={24} />}
          />
        </div>

        {/* Known Bugs Section */}
        {knownBugs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-miku-waterleaf">
              Known Bugs
            </h2>
            <div className="space-y-6">
              {knownBugs.map((bug) => (
                <BugCard key={bug.id} bug={bug} />
              ))}
            </div>
          </div>
        )}

        {/* Patched Bugs Section */}
        {patchedBugs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-miku-waterleaf">
              Recently Patched
            </h2>
            <div className="space-y-6">
              {patchedBugs.map((bug) => (
                <BugCard key={bug.id} bug={bug} isPatched />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
