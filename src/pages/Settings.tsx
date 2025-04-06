
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Bell, Moon, Sun, User, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import SettingsLayout from '@/components/layout/SettingsLayout';

interface DisplaySettings {
  theme: "light" | "dark" | "system";
  claimsPerPage: string;
}

interface NotificationSettings {
  newClaims: boolean;
  claimUpdates: boolean;
  fraudAlerts: boolean;
  dailyDigest: boolean;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState("display");
  const { toast } = useToast();
  
  const displayForm = useForm<DisplaySettings>({
    defaultValues: {
      theme: "system",
      claimsPerPage: "10"
    }
  });

  const notificationForm = useForm<NotificationSettings>({
    defaultValues: {
      newClaims: true,
      claimUpdates: true,
      fraudAlerts: true,
      dailyDigest: false
    }
  });

  const handleDisplaySubmit = (data: DisplaySettings) => {
    console.log('Display settings saved:', data);
    toast({
      title: "Settings saved",
      description: "Your display settings have been saved.",
    });
  };

  const handleNotificationSubmit = (data: NotificationSettings) => {
    console.log('Notification settings saved:', data);
    toast({
      title: "Settings saved",
      description: "Your notification settings have been saved.",
    });
  };

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="display" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <span className="hidden sm:inline">Display</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="display" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>
                  Customize how Claims Pro looks and displays information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...displayForm}>
                  <form onSubmit={displayForm.handleSubmit(handleDisplaySubmit)} className="space-y-6">
                    <FormField
                      control={displayForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme Preference</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a theme" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">
                                <div className="flex items-center gap-2">
                                  <Sun className="h-4 w-4" />
                                  <span>Light</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="dark">
                                <div className="flex items-center gap-2">
                                  <Moon className="h-4 w-4" />
                                  <span>Dark</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="system">
                                <span>System</span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose between light, dark, or system theme.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={displayForm.control}
                      name="claimsPerPage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Claims Per Page</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number of claims per page" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="20">20</SelectItem>
                              <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Number of claims to display per page.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Display Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications from Claims Pro.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...notificationForm}>
                  <form onSubmit={notificationForm.handleSubmit(handleNotificationSubmit)} className="space-y-6">
                    <FormField
                      control={notificationForm.control}
                      name="newClaims"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">New Claims</FormLabel>
                            <FormDescription>
                              Receive notifications when new claims are submitted.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="claimUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Claim Updates</FormLabel>
                            <FormDescription>
                              Receive notifications when claims are updated.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="fraudAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Fraud Alerts</FormLabel>
                            <FormDescription>
                              Receive notifications for high-risk fraud detections.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="dailyDigest"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Daily Digest</FormLabel>
                            <FormDescription>
                              Receive a daily summary of all claim activity.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Notification Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">User Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your account information and profile settings.
                    </p>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Change your password and security settings.
                    </p>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account.
                    </p>
                    <Button variant="outline">Setup 2FA</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Manage your privacy and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Data Privacy</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Control how your data is used and stored.
                    </p>
                    <Button variant="outline">Manage Data Settings</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Activity Log</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      View a log of your recent account activity.
                    </p>
                    <Button variant="outline">View Activity</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Sessions</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage your active sessions and devices.
                    </p>
                    <Button variant="outline">Manage Sessions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SettingsLayout>
  );
};

export default Settings;
