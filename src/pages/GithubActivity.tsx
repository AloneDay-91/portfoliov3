import React, { useEffect, useState } from "react";
import {
  GitCommit,
  GitPullRequest,
  UploadCloud,
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
  CalendarDays,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  TooltipProps,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: unknown;
  actor?: { avatar_url?: string; login?: string };
}

interface PushEventPayload {
  commits: { message: string; url: string }[];
  ref: string;
  head: string;
  before: string;
}

interface PullRequestEventPayload {
  action: string;
  number: number;
  pull_request: {
    html_url: string;
    title: string;
    merged: boolean;
  };
}

interface IssuesEventPayload {
  action: string;
  number: number;
  issue: {
    html_url: string;
    title: string;
  };
}

const GITHUB_USERNAME = "AloneDay-91";

const eventTypeToIcon: Record<string, React.ReactNode> = {
  PushEvent: <UploadCloud className="w-5 h-5 text-blue-500" />, // Commit pushé
  PullRequestEvent: <GitPullRequest className="w-5 h-5 text-green-500" />,
  PullRequestReviewEvent: <ThumbsUp className="w-5 h-5 text-green-400" />,
  PullRequestReviewCommentEvent: (
    <MessageCircle className="w-5 h-5 text-green-400" />
  ),
  IssuesEvent: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  IssueCommentEvent: <MessageCircle className="w-5 h-5 text-yellow-400" />,
  CreateEvent: <GitBranch className="w-5 h-5 text-purple-500" />,
  DeleteEvent: <ArchiveRestore className="w-5 h-5 text-gray-500" />,
  ForkEvent: <GitFork className="w-5 h-5 text-pink-500" />,
  WatchEvent: <Star className="w-5 h-5 text-yellow-400" />,
  MemberEvent: <UserPlus className="w-5 h-5 text-cyan-500" />,
  ReleaseEvent: <Tag className="w-5 h-5 text-orange-500" />,
  PublicEvent: <BookOpen className="w-5 h-5 text-indigo-500" />,
  GollumEvent: <FileText className="w-5 h-5 text-gray-400" />,
  CommitCommentEvent: <GitCommit className="w-5 h-5 text-blue-400" />,
  PullRequestReviewThreadEvent: (
    <ArrowRightLeft className="w-5 h-5 text-green-400" />
  ),
  SponsorshipEvent: <Users className="w-5 h-5 text-pink-400" />,
};

function getIconForEvent(type: string) {
  return (
    eventTypeToIcon[type] || <GitCommit className="w-5 h-5 text-gray-400" />
  );
}

function groupEventsByDay(events: GithubEvent[]) {
  const counts: Record<string, number> = {};
  events.forEach((event) => {
    const day = event.created_at.slice(0, 10); // YYYY-MM-DD
    counts[day] = (counts[day] || 0) + 1;
  });
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}

function getEventTitle(event: GithubEvent) {
  const { type, payload } = event;
  if (type === "PushEvent") {
    const p = payload as PushEventPayload;
    return `Push (${p.commits?.length || 1} commit${
      p.commits?.length > 1 ? "s" : ""
    })`;
  }
  if (type === "PullRequestEvent") {
    const p = payload as PullRequestEventPayload;
    return `${
      p.action === "closed" && p.pull_request?.merged
        ? "Merge"
        : p.action === "opened"
        ? "Ouverture"
        : p.action || "PR"
    }`;
  }
  if (type === "IssuesEvent") {
    const p = payload as IssuesEventPayload;
    return `${
      p.action === "opened"
        ? "Nouvelle issue"
        : p.action === "closed"
        ? "Fermeture issue"
        : "Issue"
    }`;
  }
  if (type === "ForkEvent") return "Fork du repo";
  if (type === "WatchEvent") return "A mis une étoile";
  if (type === "CreateEvent")
    return `Création de ${(payload as any)?.ref_type || "élément"}`;
  if (type === "DeleteEvent")
    return `Suppression de ${(payload as any)?.ref_type || "élément"}`;
  return type.replace("Event", "");
}

// Tooltip custom pour recharts avec style Tailwind
const CustomTooltip = (props: TooltipProps<any, string>) => {
  const active = props.active;
  const payload = (props as any)["payload"] as any[];
  const label = (props as any)["label"] as string;
  if (!active || !payload || !payload.length) return null;
  // On s'assure que label est bien une date au format YYYY-MM-DD
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
    <div className="rounded-lg border bg-popover px-4 py-3 text-sm text-popover-foreground shadow-xl min-w-[180px]">
      <div className="flex items-center gap-2 mb-1">
        <CalendarDays className="w-4 h-4 text-primary" />
        <span className="font-semibold text-primary">
          {payload[0].value} événement(s)
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{dateStr}</span>
      </div>
    </div>
  );
};

export default function GithubActivity() {
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canFetch, setCanFetch] = useState(false);
  const [now, setNow] = useState<Date>(new Date());

  // Met à jour l'heure actuelle chaque seconde
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Déclenche le fetch après 400ms (transition de page)
  useEffect(() => {
    const timeout = setTimeout(() => setCanFetch(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!canFetch) return;
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`)
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des données GitHub");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [canFetch]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (loading)
    return (
      <div className="border-grid flex flex-1 flex-col items-center">
        <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative max-w-screen-2xl mx-auto border-1 border w-full py-12 px-12 gap-8">
            {/* ...en-tête ou titre si besoin... */}
          </div>
          <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 min-h-screen">
            <div className="absolute inset-0 -z-10 h-auto min-h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]" />
            <Card variant="plus" className="bg-background mt-6">
              <CardContent className="p-6">
                <div className="h-8 bg-muted rounded w-1/3 mb-6" />
                <div className="h-48 bg-muted rounded mb-8" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-6 bg-muted rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    );
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const grouped = groupEventsByDay(events).slice(-15);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="border-grid flex flex-1 flex-col items-center">
        <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 min-h-screen">
            <div className="absolute inset-0 -z-10 h-auto min-h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="flex flex-col gap-2 text-left">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Activité GitHub
                </h1>
                <p className="text-sm text-muted-foreground">
                  Visualisez mes derniers événements publics et l'évolution de
                  mon activité sur GitHub.
                </p>
              </div>
            </div>
            <Card variant="plus" className="bg-background mt-6">
              <CardContent className="p-0 md:p-6">
                <div className="mb-8 relative">
                  {/* Date/heure actuelle en overlay en haut à droite */}
                  <div className="text-center md:absolute right-0 top-0 z-10 bg-background/80 px-3 py-1 rounded-md shadow text-xs text-muted-foreground font-mono">
                    {now.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {" à "}
                    {now.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </div>
                  <h3 className="font-semibold mb-2 text-center md:text-left">
                    Activité sur les 15 derniers jours
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart
                      data={grouped}
                      margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
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
                      {/* Axe X invisible mais présent pour le tooltip */}
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
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <ul className="divide-y divide-border rounded-lg overflow-hidden bg-background/80 shadow mt-6">
                  {events.slice(0, 15).map((event) => {
                    const { type, payload } = event;
                    let p:
                      | PushEventPayload
                      | PullRequestEventPayload
                      | IssuesEventPayload
                      | Record<string, unknown> = payload as any;
                    if (type === "PushEvent") {
                      p = payload as PushEventPayload;
                    } else if (type === "PullRequestEvent") {
                      p = payload as PullRequestEventPayload;
                    } else if (type === "IssuesEvent") {
                      p = payload as IssuesEventPayload;
                    }
                    const actor = event.actor;
                    // Lien vers le repo
                    const repoUrl = `https://github.com/${event.repo.name}`;
                    // Lien vers l'event (PR, issue, commit, etc.) si possible
                    let eventUrl = repoUrl;
                    if (
                      type === "PullRequestEvent" &&
                      (p as PullRequestEventPayload)?.pull_request?.html_url
                    ) {
                      eventUrl = (p as PullRequestEventPayload).pull_request
                        .html_url;
                    } else if (
                      type === "IssuesEvent" &&
                      (p as IssuesEventPayload)?.issue?.html_url
                    ) {
                      eventUrl = (p as IssuesEventPayload).issue.html_url;
                    } else if (
                      type === "PushEvent" &&
                      (p as PushEventPayload)?.commits?.[0]?.url
                    ) {
                      eventUrl = (p as PushEventPayload).commits[0].url
                        .replace("api.github.com/repos", "github.com")
                        .replace("/commits/", "/commit/");
                    }
                    // Lien vers le profil GitHub
                    const userUrl = actor?.login
                      ? `https://github.com/${actor.login}`
                      : undefined;
                    return (
                      <li
                        key={event.id}
                        className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/60"
                      >
                        <a
                          href={userUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden md:block"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={actor?.avatar_url}
                              alt={actor?.login}
                            />
                            <AvatarFallback>
                              {actor?.login?.[0]?.toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                        </a>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="flex-shrink-0">
                              {getIconForEvent(type)}
                            </span>
                            <span className="font-medium text-foreground text-sm">
                              {getEventTitle(event)}
                            </span>
                            <a
                              href={repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground text-xs hover:underline"
                            >
                              {event.repo.name}
                            </a>
                            {type === "PullRequestEvent" &&
                              (p as PullRequestEventPayload).number &&
                              eventUrl && (
                                <a
                                  href={eventUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary font-mono hover:underline"
                                >
                                  #{(p as PullRequestEventPayload).number}
                                </a>
                              )}
                            {type === "IssuesEvent" &&
                              (p as IssuesEventPayload).number &&
                              eventUrl && (
                                <a
                                  href={eventUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary font-mono hover:underline"
                                >
                                  #{(p as IssuesEventPayload).number}
                                </a>
                              )}
                          </div>
                          {/* Affiche le détail pertinent selon le type d'événement */}
                          {type === "PushEvent" &&
                            (p as PushEventPayload)?.commits?.length > 0 && (
                              <div className="text-xs text-muted-foreground mt-1 truncate max-w-full">
                                <span className="font-mono">
                                  {(p as PushEventPayload).commits[0].message}
                                </span>
                              </div>
                            )}
                          {type === "PullRequestEvent" &&
                            (p as PullRequestEventPayload)?.pull_request
                              ?.title && (
                              <div className="text-xs text-muted-foreground mt-1 truncate max-w-full">
                                <span className="font-mono">
                                  {
                                    (p as PullRequestEventPayload).pull_request
                                      .title
                                  }
                                </span>
                              </div>
                            )}
                          {type === "IssuesEvent" &&
                            (p as IssuesEventPayload)?.issue?.title && (
                              <div className="text-xs text-muted-foreground mt-1 truncate max-w-full">
                                <span className="font-mono">
                                  {(p as IssuesEventPayload).issue.title}
                                </span>
                              </div>
                            )}
                        </div>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatDistanceToNow(new Date(event.created_at), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
