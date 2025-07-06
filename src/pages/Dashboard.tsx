import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { BarChart3 } from "lucide-react";
import { useState } from "react";

import {
  GridPatternCard,
  GridPatternCardBody,
} from "@/components/ui/card-with-grid-ellipsis-pattern";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { renderOverviewTab } from "@/components/OverviewRenderDashboard";
import { SettingsRenderDashboard } from "@/components/SettingsRenderDashboard";
import OverviewSiteStatus from "../components/OverviewSiteStatus";
import NavigationManager from "../components/NavigationManager";
import OverviewResources from "../components/OverviewResources";
import OverviewCards from "../components/OverviewCards";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="border-grid flex flex-1 flex-col items-center">
      <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative max-w-screen-2xl mx-auto border-1 border w-full py-12 px-12 gap-8">
          <GridPatternCard>
            <GridPatternCardBody>
              <Badge variant="outline" className="mb-1 text-[9px]">
                <span
                  className="size-1.5 rounded-full bg-blue-500 mr-2"
                  aria-hidden="true"
                ></span>
                Dashboard
              </Badge>
              <h3 className="text-lg font-bold mb-1 text-foreground">
                Tableau de bord administrateur
              </h3>
              <p className="text-wrap text-sm text-foreground/60">
                Bienvenue, {user?.name} ! Voici un aperçu de votre système et
                des statistiques importantes.
              </p>
            </GridPatternCardBody>
          </GridPatternCard>
        </div>
        <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 min-h-screen">
          <div className="absolute inset-0 -z-10 h-auto min-h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]" />
          <Card variant="plus" className="bg-background mt-6">
            <CardContent className="p-0">
              <div className="md:hidden mb-4">
                <Select value={activeTab} onValueChange={setActiveTab}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Vue d'ensemble
                      </div>
                    </SelectItem>
                    <SelectItem value="settings">
                      <div className="flex items-center gap-2">
                        <Pencil2Icon className="w-4 h-4" />
                        Paramètres
                      </div>
                    </SelectItem>
                    <SelectItem value="site-status">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Statuts des sites
                      </div>
                    </SelectItem>
                    <SelectItem value="navigation">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Navigation
                      </div>
                    </SelectItem>
                    <SelectItem value="resources">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Ressources
                      </div>
                    </SelectItem>
                    <SelectItem value="cards">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Cartes
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden md:block">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="items-center"
                >
                  <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Vue d'ensemble
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2"
                    >
                      <Pencil2Icon className="w-4 h-4" />
                      Paramètres
                    </TabsTrigger>
                    <TabsTrigger
                      value="site-status"
                      className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Statuts des sites
                    </TabsTrigger>
                    <TabsTrigger
                      value="navigation"
                      className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Navigation
                    </TabsTrigger>
                    <TabsTrigger
                      value="resources"
                      className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Ressources
                    </TabsTrigger>
                    <TabsTrigger
                      value="cards"
                      className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Cartes
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="mt-6">
                {activeTab === "overview" && renderOverviewTab()}
                {activeTab === "projects" && (
                  <div className="mt-6 text-center text-muted-foreground">
                    Gestion des projets désactivée.
                  </div>
                )}
                {activeTab === "settings" && <SettingsRenderDashboard />}
                {activeTab === "site-status" && <OverviewSiteStatus />}
                {activeTab === "navigation" && <NavigationManager />}
                {activeTab === "resources" && <OverviewResources />}
                {activeTab === "cards" && <OverviewCards />}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
