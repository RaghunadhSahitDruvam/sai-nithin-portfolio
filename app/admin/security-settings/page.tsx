"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Loader2,
    Shield,
    Lock,
    Clock,
    AlertTriangle,
    Key,
    ArrowLeft,
    Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { toast } from "sonner";
import {
    getSecuritySettings,
    updateSecuritySettings,
    toggleTwoFactor,
    type SecuritySettingsData,
} from "@/lib/actions/admin/security";

export default function SecuritySettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [settings, setSettings] = useState<SecuritySettingsData>({
        twoFactorEnabled: true,
        sessionTimeout: 3600,
        maxLoginAttempts: 5,
        lockoutDuration: 900,
        passwordExpiryDays: 90,
        requireStrongPassword: true,
    });

    useEffect(() => {
        if (status === "loading") return;

        if (!session || session.user?.role !== "admin") {
            router.push("/admin/auth");
            return;
        }

        fetchSettings();
    }, [session, status, router]);

    const fetchSettings = async () => {
        try {
            const result = await getSecuritySettings();
            if (result.success && result.settings) {
                setSettings({
                    twoFactorEnabled: result.settings.twoFactorEnabled,
                    sessionTimeout: result.settings.sessionTimeout,
                    maxLoginAttempts: result.settings.maxLoginAttempts,
                    lockoutDuration: result.settings.lockoutDuration,
                    passwordExpiryDays: result.settings.passwordExpiryDays,
                    requireStrongPassword: result.settings.requireStrongPassword,
                });
            } else {
                toast.error(result.error || "Failed to fetch security settings");
            }
        } catch (error) {
            console.error("Error fetching security settings:", error);
            toast.error("Failed to fetch security settings");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleTwoFactor = async (enabled: boolean) => {
        try {
            const result = await toggleTwoFactor(enabled);
            if (result.success) {
                setSettings({ ...settings, twoFactorEnabled: enabled });
                toast.success(
                    enabled
                        ? "Two-factor authentication enabled"
                        : "Two-factor authentication disabled"
                );
            } else {
                toast.error(result.error || "Failed to update two-factor authentication");
            }
        } catch (error) {
            console.error("Error toggling two-factor:", error);
            toast.error("Failed to update two-factor authentication");
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const result = await updateSecuritySettings(settings);
            if (result.success) {
                toast.success("Security settings saved successfully!");
            } else {
                toast.error(result.error || "Failed to save security settings");
            }
        } catch (error) {
            console.error("Error saving security settings:", error);
            toast.error("Failed to save security settings");
        } finally {
            setIsSaving(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session || session.user?.role !== "admin") {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/admin/dashboard">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold text-foreground">
                            Security Settings
                        </h1>
                    </div>
                    <p className="text-muted-foreground">
                        Configure security settings for admin authentication and access control.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Two-Factor Authentication */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lock className="h-5 w-5" />
                                        Two-Factor Authentication
                                    </CardTitle>
                                    <CardDescription className="mt-2">
                                        Require a verification code sent to email during admin login
                                    </CardDescription>
                                </div>
                                <Switch
                                    checked={settings.twoFactorEnabled}
                                    onCheckedChange={handleToggleTwoFactor}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg bg-muted p-4">
                                <p className="text-sm text-muted-foreground">
                                    {settings.twoFactorEnabled ? (
                                        <>
                                            <span className="font-semibold text-foreground">Enabled:</span>{" "}
                                            Admin users will receive a 6-digit verification code via email
                                            during login. This code must be entered to complete authentication.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-semibold text-foreground">Disabled:</span>{" "}
                                            Admin users can login with just email and password. Two-factor
                                            authentication is not required.
                                        </>
                                    )}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Session Management */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Session Management
                            </CardTitle>
                            <CardDescription>
                                Control session timeout and user activity
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="sessionTimeout">
                                    Session Timeout (seconds)
                                </Label>
                                <Input
                                    id="sessionTimeout"
                                    type="number"
                                    value={settings.sessionTimeout}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            sessionTimeout: parseInt(e.target.value) || 3600,
                                        })
                                    }
                                    min={300}
                                    max={86400}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Time before inactive sessions expire (300-86400 seconds, default: 3600)
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Login Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                Login Security
                            </CardTitle>
                            <CardDescription>
                                Protect against brute force attacks
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="maxLoginAttempts">
                                    Maximum Login Attempts
                                </Label>
                                <Input
                                    id="maxLoginAttempts"
                                    type="number"
                                    value={settings.maxLoginAttempts}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            maxLoginAttempts: parseInt(e.target.value) || 5,
                                        })
                                    }
                                    min={3}
                                    max={10}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Number of failed login attempts before account lockout (3-10, default: 5)
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="lockoutDuration">
                                    Lockout Duration (seconds)
                                </Label>
                                <Input
                                    id="lockoutDuration"
                                    type="number"
                                    value={settings.lockoutDuration}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            lockoutDuration: parseInt(e.target.value) || 900,
                                        })
                                    }
                                    min={300}
                                    max={3600}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Time account remains locked after max attempts (300-3600 seconds, default: 900)
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Password Policy */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Key className="h-5 w-5" />
                                Password Policy
                            </CardTitle>
                            <CardDescription>
                                Configure password requirements and expiration
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <Label htmlFor="requireStrongPassword">
                                        Require Strong Passwords
                                    </Label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Enforce minimum 8 characters with uppercase, lowercase, numbers, and symbols
                                    </p>
                                </div>
                                <Switch
                                    id="requireStrongPassword"
                                    checked={settings.requireStrongPassword}
                                    onCheckedChange={(checked: boolean) =>
                                        setSettings({ ...settings, requireStrongPassword: checked })
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="passwordExpiryDays">
                                    Password Expiry (days)
                                </Label>
                                <Input
                                    id="passwordExpiryDays"
                                    type="number"
                                    value={settings.passwordExpiryDays}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            passwordExpiryDays: parseInt(e.target.value) || 90,
                                        })
                                    }
                                    min={30}
                                    max={365}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Number of days before password must be changed (30-365, default: 90)
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            size="lg"
                            className="min-w-[200px]"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Settings
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
