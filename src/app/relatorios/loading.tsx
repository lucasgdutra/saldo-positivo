export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}