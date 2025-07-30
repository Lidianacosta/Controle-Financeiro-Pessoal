
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                    <CardDescription>
                        Atualize as informações da sua conta.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Gerenciamento de perfil em breve.</p>
                </CardContent>
            </Card>
        </div>
    )
}
