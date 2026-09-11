'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowRight, LayoutDashboard, ShieldCheck, Stethoscope, UserRound } from 'lucide-react'

import { useAuth } from '@/components/auth/auth-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminPage() {
  const { isReady, user } = useAuth()

  useEffect(() => {
    if (isReady && user?.role !== 'ADMIN') {
      window.location.replace('/')
    }
  }, [isReady, user?.role])

  if (!isReady || user?.role !== 'ADMIN') {
    return <main className="min-h-screen bg-background" aria-busy="true" />
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6 border-b border-border/70 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Badge variant="outline" className="gap-2 border-primary/40 bg-primary/10 text-primary">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Administrator workspace
            </Badge>
            <div className="space-y-2">
              <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Choose the care experience you want to review.
              </h1>
              <p className="max-w-2xl text-pretty leading-6 text-muted-foreground">
                Welcome back, {user.name}. Use a dedicated dashboard view without changing the permissions or data ownership rules for doctors and patients.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <LayoutDashboard className="h-4 w-4 text-primary" aria-hidden="true" />
            Secure dashboard access
          </div>
        </header>

        <section aria-labelledby="dashboard-options" className="space-y-5">
          <div>
            <h2 id="dashboard-options" className="text-xl font-semibold tracking-tight">Dashboard views</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">Open the operational surface you need to inspect.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="group border-border/70 bg-card/80 transition-colors hover:border-primary/60">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Stethoscope className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <CardTitle>Doctor dashboard</CardTitle>
                  <CardDescription className="leading-6">Review connected patients, requests, reports, alerts, and clinical workflows.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full justify-between">
                  <Link href="/">
                    Open doctor view
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group border-border/70 bg-card/80 transition-colors hover:border-primary/60">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
                  <UserRound className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <CardTitle>Patient dashboard</CardTitle>
                  <CardDescription className="leading-6">Review report uploads, doctor connections, predictions, and personal health activity.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full justify-between">
                  <Link href="/patient-dashboard">
                    Open patient view
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <p className="text-sm leading-6 text-muted-foreground">
          Admin access is provisioned server-side and is not available through public registration.
        </p>
      </div>
    </main>
  )
}
