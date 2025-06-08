import React, { useState, useRef } from "react";
import DecryptedText from "@/components/ui/TextAnimations/DecryptedText/DecryptedText.tsx";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";

export default function QRCodeGenerator() {
    const [qrValue, setQrValue] = useState("");
    const [qrSrc, setQrSrc] = useState("");
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const preValue = useRef<string>("");

    const placeholders = [
        "https://example.com",
        "https://google.com",
        "https://github.com",
        "https://linkedin.com",
        "https://twitter.com",
        "https://facebook.com",
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQrValue(value);

        if (!value.trim()) {
            setActive(false);
            preValue.current = "";
            setQrSrc("");
        }
    };

    // Cette fonction sera appelée par le bouton du composant PlaceholdersAndVanishInput
    const handleGenerate = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const trimmed = qrValue.trim();
        if (!trimmed || preValue.current === trimmed) return;
        preValue.current = trimmed;
        setLoading(true);
        setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(trimmed)}`);
        toast("Le QRCode a été généré", {
            description: "Vous pouvez le télécharger en cliquant sur le bouton ci-dessous.",
        });
    };


    const handleImgLoad = () => {
        setActive(true);
        setLoading(false);
    };

    const handleDownload = async () => {
        if (!qrSrc) return;
        const img = new window.Image();
        img.crossOrigin = "anonymous"; // Important pour éviter les soucis CORS si le serveur le permet
        img.src = qrSrc;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `qrcode-${new Date().toISOString()}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, "image/png");

            toast("Le QRCode à été générer", {
                description: "Vous pouvez le télécharger en cliquant sur le bouton ci-dessous.",
            })
        };
        img.onerror = () => {
            toast("Erreur", {
                description: "Une erreur est survenue lors du chargement de l'image.",
            })
        };
    };


    return (
        <div>
            <div className="border-grid flex flex-1 flex-col items-center">
                <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 h-screen">
                        <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                        <div className="flex flex-col items-center justify-center gap-8">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-4xl md:text-4xl font-medium flex flex-col items-center">
                                    <DecryptedText
                                        animateOn="view"
                                        revealDirection="start"
                                        speed={50}
                                        sequential={true}
                                        text="Générez votre QRCode"
                                    />
                                </h1>
                                <p className="text-md md:text-xl font-thin text-muted-foreground">
                                    <DecryptedText
                                        animateOn="view"
                                        revealDirection="start"
                                        speed={50}
                                        sequential={true}
                                        text="Collez une URL ou saisissez du texte pour créer un code QR"
                                    />
                                </p>
                            </div>
                            <div className={`wrapper${active ? " active" : ""} w-full text-center flex flex-col items-center justify-center gap-4`}>
                                <PlaceholdersAndVanishInput
                                    placeholders={placeholders}
                                    onChange={handleInputChange}
                                    onSubmit={handleGenerate}
                                />

                                <div className="qr-code">
                                    {qrSrc && (
                                        <img className="rounded-md" src={qrSrc} alt="qr-code" onLoad={handleImgLoad} />
                                    )}
                                    {loading && (
                                        <div className="text-muted-foreground mt-2">
                                            Génération en cours...
                                        </div>
                                    )}
                                </div>

                                {qrSrc && (
                                    <Button
                                        variant="outline"
                                        onClick={handleDownload}
                                        className="mt-4"
                                    >
                                        Télécharger le QR Code
                                    </Button>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
