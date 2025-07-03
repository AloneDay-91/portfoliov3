import { Switch } from "@/components/ui/switch";
import { SettingsIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const SettingsRenderDashboard = () => {
  const [registerEnabled, setRegisterEnabled] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/config`)
      .then((res) => res.json())
      .then((data) => setRegisterEnabled(!!data.registerEnabled))
      .catch(() => setRegisterEnabled(null));
  }, []);

  const handleSwitch = async (checked: boolean) => {
    setSaving(true);
    const token = Cookies.get("token") || "";
    const res = await fetch(`${API_URL}/api/config/register`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ registerEnabled: checked }),
    });
    if (res.ok) setRegisterEnabled(checked);
    setSaving(false);
  };

  return (
    <div className="mt-6 text-left text-muted-foreground">
      <Card variant="default" className="bg-background">
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon className="w-4 h-4" />
            <h2 className="text-md font-md">Paramètres</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="text-left">
              <h3 className="font-normal text-foreground text-sm">
                Désactiver les Inscriptions
              </h3>
              <p className="text-xs text-muted-foreground">
                Permet aux utilisateurs de s'inscrire sur le site.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={!!registerEnabled}
                onCheckedChange={handleSwitch}
                disabled={saving || registerEnabled === null}
              />
              <span className="ml-2 text-xs flex items-center">
                <span className="text-muted-foreground">
                  {registerEnabled ? "Activée" : "Désactivée"}
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SettingsRenderDashboard };
