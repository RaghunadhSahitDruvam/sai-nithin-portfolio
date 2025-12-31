"use server";

import { prisma } from "@/lib/prisma";

export interface SecuritySettingsData {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    lockoutDuration: number;
    passwordExpiryDays: number;
    requireStrongPassword: boolean;
}

export async function getSecuritySettings() {
    try {
        let settings = await prisma.securitySettings.findFirst();

        // If no settings exist, create default settings
        if (!settings) {
            settings = await prisma.securitySettings.create({
                data: {
                    twoFactorEnabled: true,
                    sessionTimeout: 3600,
                    maxLoginAttempts: 5,
                    lockoutDuration: 900,
                    passwordExpiryDays: 90,
                    requireStrongPassword: true,
                },
            });
        }

        return { success: true, settings };
    } catch (error) {
        console.error("Error fetching security settings:", error);
        return { success: false, error: "Failed to fetch security settings" };
    }
}

export async function updateSecuritySettings(data: SecuritySettingsData) {
    try {
        // Get the first (and only) security settings document
        const existingSettings = await prisma.securitySettings.findFirst();

        let settings;
        if (existingSettings) {
            settings = await prisma.securitySettings.update({
                where: { id: existingSettings.id },
                data: {
                    twoFactorEnabled: data.twoFactorEnabled,
                    sessionTimeout: data.sessionTimeout,
                    maxLoginAttempts: data.maxLoginAttempts,
                    lockoutDuration: data.lockoutDuration,
                    passwordExpiryDays: data.passwordExpiryDays,
                    requireStrongPassword: data.requireStrongPassword,
                },
            });
        } else {
            settings = await prisma.securitySettings.create({
                data,
            });
        }

        return { success: true, settings };
    } catch (error) {
        console.error("Error updating security settings:", error);
        return { success: false, error: "Failed to update security settings" };
    }
}

export async function toggleTwoFactor(enabled: boolean) {
    try {
        const existingSettings = await prisma.securitySettings.findFirst();

        let settings;
        if (existingSettings) {
            settings = await prisma.securitySettings.update({
                where: { id: existingSettings.id },
                data: { twoFactorEnabled: enabled },
            });
        } else {
            settings = await prisma.securitySettings.create({
                data: {
                    twoFactorEnabled: enabled,
                    sessionTimeout: 3600,
                    maxLoginAttempts: 5,
                    lockoutDuration: 900,
                    passwordExpiryDays: 90,
                    requireStrongPassword: true,
                },
            });
        }

        return { success: true, settings };
    } catch (error) {
        console.error("Error toggling two-factor:", error);
        return { success: false, error: "Failed to toggle two-factor authentication" };
    }
}
