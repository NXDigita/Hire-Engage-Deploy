import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    define: {
      "process.env.SUPABASE_URL": JSON.stringify(
        env.SUPABASE_URL ?? process.env.SUPABASE_URL
      ),
      "process.env.SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY
      ),
    },
  },
});