import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useUpdateProfile } from '../hooks/useProfile';
import type { User } from '@/types/auth.types';

const profileSchema = z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    locale: z.enum(['es', 'en']),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileTabProps {
    user: User;
}

// Avatar component — generates colored circle with user initials
const UserAvatar = ({ user }: { user: User }) => {
    const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

    // Deterministic color from user id
    const colors = [
        'bg-violet-500',
        'bg-blue-500',
        'bg-emerald-500',
        'bg-amber-500',
        'bg-rose-500',
        'bg-cyan-500',
        'bg-pink-500',
        'bg-indigo-500',
    ];
    const colorIndex =
        user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    const bgColor = colors[colorIndex];

    return (
        <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${bgColor} text-2xl font-bold text-white shadow-lg ring-4 ring-background`}
        >
            {initials}
        </div>
    );
};

export const ProfileTab = ({ user }: ProfileTabProps) => {
    const { t } = useTranslation();
    const updateProfile = useUpdateProfile();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            locale: user.locale,
        },
    });

    useEffect(() => {
        form.reset({
            firstName: user.firstName,
            lastName: user.lastName,
            locale: user.locale,
        });
    }, [user, form]);

    const onSubmit = (values: ProfileFormValues) => {
        updateProfile.mutate(values);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('settings.profile.title')}</CardTitle>
                <CardDescription>{t('settings.profile.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                    <UserAvatar user={user} />
                    <div>
                        <p className="text-lg font-semibold">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* First + Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('settings.profile.firstName')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('settings.profile.lastName')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Email (read-only) */}
                        <FormItem>
                            <FormLabel>{t('settings.profile.email')}</FormLabel>
                            <Input value={user.email} disabled className="cursor-not-allowed opacity-60" />
                            <p className="text-xs text-muted-foreground">{t('settings.profile.emailHint')}</p>
                        </FormItem>

                        {/* Locale */}
                        <FormField
                            control={form.control}
                            name="locale"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('settings.profile.locale')}</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="es">
                                                {t('settings.profile.locales.es')}
                                            </SelectItem>
                                            <SelectItem value="en">
                                                {t('settings.profile.locales.en')}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={updateProfile.isPending || !form.formState.isDirty}
                            className="ring-1 ring-white/20"
                        >
                            {updateProfile.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('common.saving')}
                                </>
                            ) : (
                                t('settings.profile.saveChanges')
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
