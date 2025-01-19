import { DocsLayout } from "@containers/Docs/DocsLayout";
export default function DocLoading() {
    return (
      <DocsLayout>
        <div className="max-w-4xl animate-pulse space-y-8">
          <div className="h-10 bg-gray-800/50 rounded-lg w-2/3" />
  
          <div className="space-y-4">
            <div className="h-4 bg-gray-800/50 rounded w-full" />
            <div className="h-4 bg-gray-800/50 rounded w-5/6" />
            <div className="h-4 bg-gray-800/50 rounded w-4/6" />
          </div>
  
          <div className="p-6 bg-gray-800/50 rounded-lg">
            <div className="space-y-2">
              <div className="h-4 bg-gray-700/50 rounded w-3/4" />
              <div className="h-4 bg-gray-700/50 rounded w-2/3" />
              <div className="h-4 bg-gray-700/50 rounded w-1/2" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-4 bg-gray-800/50 rounded w-5/6" />
            <div className="h-4 bg-gray-800/50 rounded w-full" />
            <div className="h-4 bg-gray-800/50 rounded w-4/6" />
          </div>
        </div>
      </DocsLayout>
    );
  }
  