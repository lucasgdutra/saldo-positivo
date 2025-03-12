import { AuthGuard } from "@/components/auth/auth-guard";
import { AppLayout } from "@/components/layout/app-layout";

const LOADING_ITEMS = ["item-1", "item-2", "item-3"] as const;

export default function Loading() {
  return (
    <AuthGuard requireAuth>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
              <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-gray-200" />
            </div>
            <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200" />
          </div>

          <div className="rounded-lg border">
            <div className="p-4">
              <div className="grid gap-4">
                {LOADING_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-16 animate-pulse rounded-md bg-gray-200" />
                      <div className="h-8 w-16 animate-pulse rounded-md bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
}