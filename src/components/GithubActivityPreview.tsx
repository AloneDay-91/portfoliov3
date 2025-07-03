import React, { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Star,
  GitFork,
  MessageCircle,
  BookOpen,
  UserPlus,
  Tag,
  ArchiveRestore,
  ArrowRightLeft,
  FileText,
  ThumbsUp,
  Users,
  GitBranch,
  ArrowRightIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

const GITHUB_USERNAME = "AloneDay-91";

const eventTypeToIcon: Record<string, React.ReactNode> = {
  PushEvent: <GitCommit className="w-4 h-4 text-blue-500" />, // Commit pushé
  PullRequestEvent: <GitPullRequest className="w-4 h-4 text-green-500" />,
  IssuesEvent: <AlertCircle className="w-4 h-4 text-yellow-500" />,
  ForkEvent: <GitFork className="w-4 h-4 text-pink-500" />,
  WatchEvent: <Star className="w-4 h-4 text-yellow-400" />,
  IssueCommentEvent: <MessageCircle className="w-4 h-4 text-yellow-400" />,
  CreateEvent: <GitBranch className="w-4 h-4 text-purple-500" />,
  DeleteEvent: <ArchiveRestore className="w-4 h-4 text-gray-500" />,
  MemberEvent: <UserPlus className="w-4 h-4 text-cyan-500" />,
  ReleaseEvent: <Tag className="w-4 h-4 text-orange-500" />,
  PublicEvent: <BookOpen className="w-4 h-4 text-indigo-500" />,
  GollumEvent: <FileText className="w-4 h-4 text-gray-400" />,
  CommitCommentEvent: <GitCommit className="w-4 h-4 text-blue-400" />,
  PullRequestReviewThreadEvent: (
    <ArrowRightLeft className="w-4 h-4 text-green-400" />
  ),
  PullRequestReviewEvent: <ThumbsUp className="w-4 h-4 text-green-400" />,
  SponsorshipEvent: <Users className="w-4 h-4 text-pink-400" />,
};

function getIconForEvent(type: string) {
  return (
    eventTypeToIcon[type] || <GitCommit className="w-4 h-4 text-gray-400" />
  );
}

function groupEventsByDay(events: any[]) {
  const counts: Record<string, number> = {};
  events.forEach((event) => {
    const day = event.created_at.slice(0, 10); // YYYY-MM-DD
    counts[day] = (counts[day] || 0) + 1;
  });
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  let dateStr = label;
  if (typeof label === "string" && /^\d{4}-\d{2}-\d{2}$/.test(label)) {
    const [year, month, day] = label.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    dateStr = date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-xl min-w-[120px]">
      <div className="font-semibold text-primary">
        {payload[0].value} événement(s)
      </div>
      <div className="text-muted-foreground">{dateStr}</div>
    </div>
  );
};

export default function GithubActivityPreview() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center text-xs py-4">
        Chargement activité GitHub...
      </div>
    );
  if (error)
    return <div className="text-center text-xs text-red-500 py-4">{error}</div>;

  const grouped = groupEventsByDay(events).slice(-7);

  return (
    <div className="">
      <div className="border-grid flex flex-1 flex-col items-center">
        <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8">
            <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Liste à gauche */}
              <div className="flex-1 min-w-0 w-full">
                <Card variant="default" className="bg-background">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-primary">
                      Mon activité GitHub
                    </span>
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs dark:text-emerald-400 text-emerald-500 hover:underline"
                    >
                      Voir mon profil
                    </a>
                  </div>
                  <ul className="divide-y divide-border">
                    {events.slice(0, 3).map((event) => {
                      return (
                        <li
                          key={event.id}
                          className="flex items-center gap-2 py-2 text-xs"
                        >
                          <span>{getIconForEvent(event.type)}</span>
                          <span className="font-medium text-foreground truncate max-w-[120px]">
                            {event.type.replace("Event", "")}
                          </span>
                          <a
                            href={`https://github.com/${event.repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:underline truncate max-w-[100px]"
                          >
                            {event.repo.name}
                          </a>
                          <span className="text-muted-foreground ml-auto">
                            {formatDistanceToNow(new Date(event.created_at), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex justify-start mt-4">
                    <Link
                      to="/activity"
                      className="inline-flex items-center text-muted-foreground text-xs hover:underline hover:text-emeral-500 dark:hover:text-emerald-400 group transition-colors"
                    >
                      Voir plus d'activité
                      <ArrowRightIcon className="w-4 h-4 inline-block ml-1 transition-transform transition-colors duration-200 group-hover:translate-x-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400" />
                    </Link>
                  </div>
                </Card>
              </div>
              {/* Graphique à droite */}
              <div className="w-full bg-background border rounded-lg p-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={grouped}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorActivity"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#22d47b"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#22d47b"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={false}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#22d47b"
                      fillOpacity={1}
                      fill="url(#colorActivity)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
