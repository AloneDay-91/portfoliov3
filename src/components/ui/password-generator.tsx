import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { RefreshCcwIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const lower = "abcdefghijklmnopqrstuvwxyz".split("");
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const digits = "0123456789".split("");
const specials = "!@#$%^&*()-_=+[]{};:,.<>/?".split("");

function getRandom(arr: string[], n: number) {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return res;
}

// Fonction pour calculer la force du mot de passe
function getPasswordStrength(password: string, opts: { useLower: boolean, useUpper: boolean, useDigits: boolean, useSpecial: boolean }) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  const types = [opts.useLower, opts.useUpper, opts.useDigits, opts.useSpecial].filter(Boolean).length;
  if (types >= 2) score++;
  if (types >= 3) score++;
  if (types === 4) score++;
  if (password.length >= 20 && types === 4) score++;
  // max score: 6
  if (score <= 2) return { label: "Faible", barColor: "bg-red-500", textColor: "text-red-500", width: "w-1/4" };
  if (score === 3) return { label: "Moyen", barColor: "bg-yellow-500", textColor: "text-yellow-500", width: "w-2/4" };
  if (score === 4 || score === 5) return { label: "Fort", barColor: "bg-green-500", textColor: "text-green-500", width: "w-3/4" };
  return { label: "Très fort", barColor: "bg-emerald-500", textColor: "text-emerald-500", width: "w-full" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSpecial, setUseSpecial] = useState(true);
  const [password, setPassword] = useState("");
  const [regen, setRegen] = useState(0);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let pool: string[] = [];
    if (useLower) pool = pool.concat(lower);
    if (useUpper) pool = pool.concat(upper);
    if (useDigits) pool = pool.concat(digits);
    if (useSpecial) pool = pool.concat(specials);
    if (pool.length === 0) {
      setPassword("");
      return;
    }
    const chars: string[] = [];
    if (useLower) chars.push(getRandom(lower, 1)[0]);
    if (useUpper) chars.push(getRandom(upper, 1)[0]);
    if (useDigits) chars.push(getRandom(digits, 1)[0]);
    if (useSpecial) chars.push(getRandom(specials, 1)[0]);
    while (chars.length < length) {
      chars.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    setPassword(chars.slice(0, length).join(""));
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line
  }, [length, useLower, useUpper, useDigits, useSpecial, regen]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const strength = getPasswordStrength(password, { useLower, useUpper, useDigits, useSpecial });

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Affichage du mot de passe */}
      <Card className="bg-background rounded-xl shadow-md p-6 w-full max-w-xl flex flex-col items-center gap-4">
        <CardContent>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="flex items-center w-full gap-2">
            <Input
              type="text"
              className="w-full text-center font-mono text-2xl bg-background outline-none select-all"
              value={password}
              readOnly
              style={{ letterSpacing: "0.1em" }}
            />
            <Button variant="outline" size="icon" onClick={handleCopy} title="Copier">
              {copied ? (
                <span role="img" aria-label="copié">
                  <CheckIcon className="w-4 h-4" />
                </span>
              ) : (
                <span role="img" aria-label="copier">
                  <CopyIcon className="w-4 h-4" />
                </span>
              )}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setRegen(r => r + 1)} title="Régénérer">
              <span role="img" aria-label="refresh">
                <RefreshCcwIcon className="w-4 h-4" />
              </span>
            </Button>
          </div>
          <div className="h-2 w-full bg-muted rounded mt-2">
            <div className={`h-2 rounded transition-all duration-300 ${strength.barColor} ${strength.width}`}></div>
          </div>
          <div className={`w-full text-right text-xs mt-1 font-semibold ${strength.textColor}`}>
            Force : {strength.label}
          </div>
        </div>
        {/* Section personnalisation */}
        <div className="w-full flex flex-col gap-4 mt-4">
          <h2 className="text-md font-light text-left">Personnalisez votre mot de passe</h2>
          <div className="flex items-center gap-4 w-full">
            <Input
              type="number"
              min={8}
              max={64}
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="w-16 border rounded p-1 text-center"
            />
            <Slider
              min={8}
              max={64}
              value={[length]}
              onValueChange={([val]) => setLength(val)}
              className="flex-1"
            />
            <span className="text-sm ml-2">Longueur du mot de passe</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            <Label htmlFor="majuscule" className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={useUpper} onCheckedChange={v => setUseUpper(!!v)} id="majuscule" />
              <span>Majuscule</span>
            </Label>
            <Label htmlFor="minuscule" className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={useLower} onCheckedChange={v => setUseLower(!!v)} id="minuscule" />
              <span>Minuscule</span>
            </Label>
            <Label htmlFor="chiffres" className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={useDigits} onCheckedChange={v => setUseDigits(!!v)} id="chiffres" />
              <span>Chiffres</span>
            </Label>
            <Label htmlFor="symboles" className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={useSpecial} onCheckedChange={v => setUseSpecial(!!v)} id="symboles" />
              <span>Symboles</span>
            </Label>
          </div>
        </div>
        </CardContent>
      </Card>
      <Button variant="outline" onClick={handleCopy} disabled={!password}>
        Copier le mot de passe
      </Button>
    </div>
  );
} 