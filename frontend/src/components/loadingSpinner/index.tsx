export default function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center" data-testid="loading-spinner">
      <span className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-b-transparent" />
    </div>
  )
}
