import { QueryClient, QueryClientProvider } from "react-query";

import { trpc } from "./trpc";

import "./App.css";
import { useState } from "react";

function AppContent() {
  const { data } = trpc.useQuery(["getList"]);

  return (
    <div className="App">
      <p>TODO APP</p>
      <ul>{data && data.map(({ id, text }) => <li key={id}>{text}</li>)}</ul>
    </div>
  );
}

function App() {
  const [trpcClient] = useState(() =>
    trpc.createClient({ url: "http://localhost:3001/trpc" })
  );
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
export default App;
